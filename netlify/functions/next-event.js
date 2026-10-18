// Returns the next Nouvelle Machine event, read from the calendar's public
// Luma iCal feed. (Luma's JSON API rate-limits shared Netlify IPs and then
// returns nothing; the iCal feed is meant to be polled and stays reliable.)
// Netlify's CDN caches the response, so Luma is only hit a few times an hour.
const ICS = "https://api.lu.ma/ics/get?entity=calendar&id=cal-gwYMy5LI7QXBjQt";

exports.handler = async function () {
  try {
    const r = await fetch(ICS);
    if (!r.ok) throw new Error("ics " + r.status);
    const now = Date.now();
    const next = parseEvents(await r.text())
      .filter((e) => e.end > now && e.status !== "CANCELLED")
      .sort((a, b) => a.start - b.start)[0];
    if (!next) return json({ event: null }, 900);
    const loc = next.location.split(",").map((s) => s.trim());
    const url = (next.description.match(/https:\/\/(?:luma\.com|lu\.ma)\/[\w-]+/) || [])[0];
    return json(
      {
        event: {
          name: next.summary,
          url: url || "https://luma.com/nouvellemachine",
          start_at: new Date(next.start).toISOString(),
          timezone: "Europe/Paris",
          venue: loc[0] || null,
          city: "Paris",
        },
      },
      900
    );
  } catch (err) {
    return json({ event: null, error: String(err) }, 60);
  }
};

// Minimal iCal parser: unfold continuation lines, then read the few VEVENT
// fields we need.
function parseEvents(text) {
  const lines = text.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") cur = { summary: "", description: "", location: "", status: "" };
    else if (line === "END:VEVENT") {
      if (cur && cur.start) events.push(cur);
      cur = null;
    } else if (cur) {
      const i = line.indexOf(":");
      const key = line.slice(0, i).split(";")[0];
      const val = unescape(line.slice(i + 1));
      if (key === "DTSTART") cur.start = icsDate(val);
      else if (key === "DTEND") cur.end = icsDate(val);
      else if (key === "SUMMARY") cur.summary = val;
      else if (key === "DESCRIPTION") cur.description = val;
      else if (key === "LOCATION") cur.location = val;
      else if (key === "STATUS") cur.status = val;
    }
  }
  for (const e of events) if (!e.end) e.end = e.start + 2 * 3600e3;
  return events;
}

function icsDate(v) {
  const m = v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/);
  return m ? Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6]) : NaN;
}

function unescape(s) {
  return s.replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");
}

function json(obj, maxAge) {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=300",
      "netlify-cdn-cache-control": `public, s-maxage=${maxAge}, stale-while-revalidate=86400, durable`,
    },
    body: JSON.stringify(obj),
  };
}
