// Proxies Luma's calendar API (which sends no CORS header) so the site can
// fetch the next Nouvelle Machine event client-side.
const CAL = "cal-gwYMy5LI7QXBjQt";

exports.handler = async function () {
  try {
    const url =
      "https://api.lu.ma/calendar/get-items?calendar_api_id=" +
      CAL +
      "&period=future&pagination_limit=1";
    const r = await fetch(url, { headers: { accept: "application/json" } });
    const d = await r.json();
    const e = d && d.entries && d.entries[0] && d.entries[0].event;
    if (!e) return json({ event: null });
    const g = e.geo_address_info || {};
    return json({
      event: {
        name: e.name,
        url: e.url ? "https://lu.ma/" + e.url : "https://luma.com/nouvellemachine",
        start_at: e.start_at,
        timezone: e.timezone || "Europe/Paris",
        venue: g.address || null,
        city: String(g.city_state || g.city || "Paris").split(",")[0].trim(),
      },
    });
  } catch (err) {
    return json({ event: null, error: String(err) });
  }
};

function json(obj) {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=600",
    },
    body: JSON.stringify(obj),
  };
}
