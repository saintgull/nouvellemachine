// Carte de l'écosystème francophone de la sûreté de l'IA.
// Règle : n'entre ici que ce que la personne ou son organisation a rendu public.
// Chaque personne a une source (page équipe, profil public, presse). Vérifié le 2026-11-10.
// Hors carte en attendant confirmation : voir Obsidian, DATABASE PERSONNES-ORGA (revue publique).

var ECO_UPDATED = "10 novembre 2026";

var ECO_CATS = [
  { id: "mouvement", label: "Mouvement citoyen & plaidoyer" },
  { id: "policy", label: "Recherche & politiques publiques" },
  { id: "technique", label: "Recherche technique & évaluations" },
  { id: "labs", label: "Laboratoires d'IA" },
  { id: "formation", label: "Formation & communauté" },
  { id: "institutions", label: "Institutions publiques" },
  { id: "medias", label: "Médias, livres & vulgarisation" },
  { id: "critiques", label: "Voix sceptiques" }
];

var ECO_ORGS = [
  { id: "pauseia", name: "Pause IA", cat: "mouvement", url: "https://pauseia.fr",
    desc: "Mouvement citoyen français pour une pause dans le développement de l'IA la plus avancée. Branche française de PauseAI." },
  { id: "pauseai", name: "PauseAI Global", cat: "mouvement", url: "https://pauseai.info",
    desc: "Mouvement international pour une pause du développement de l'IA de frontière." },
  { id: "controlai", name: "ControlAI", cat: "mouvement", url: "https://controlai.org", country: "Royaume-Uni",
    desc: "Organisation britannique de plaidoyer contre les risques de la superintelligence." },
  { id: "cesia", name: "CeSIA", cat: "policy", url: "https://cesia.org",
    desc: "Centre pour la Sécurité de l'IA, à Paris : recherche, plaidoyer, formations et communauté francophone." },
  { id: "saferai", name: "SaferAI", cat: "policy", url: "https://www.safer-ai.org",
    desc: "Association parisienne qui évalue les pratiques de gestion des risques des entreprises d'IA, en s'inspirant des industries à haut risque." },
  { id: "gpai", name: "GPAI Policy Lab", cat: "policy", url: "https://www.gpaipolicylab.org",
    desc: "Rapports et analyses pour rendre lisibles les enjeux de gouvernance de l'IA à usage général, et proposer des solutions." },
  { id: "whitecircle", name: "White Circle", cat: "technique", url: "https://whitecircle.ai",
    desc: "Plateforme de contrôle et de surveillance des modèles d'IA, avec des évaluations de sûreté." },
  { id: "giskard", name: "Giskard", cat: "technique", url: "https://www.giskard.ai",
    desc: "Tests et évaluations de modèles d'IA pour les entreprises." },
  { id: "lawzero", name: "LawZero", cat: "technique", url: "https://lawzero.org", country: "Québec",
    desc: "Organisation à but non lucratif fondée par Yoshua Bengio, qui développe une « IA scientifique » non agentique." },
  { id: "mistral", name: "Mistral AI", cat: "labs", url: "https://mistral.ai",
    desc: "Laboratoire d'IA français qui développe des modèles de langage." },
  { id: "ml4good", name: "ML4Good", cat: "formation", url: "https://www.ml4good.org",
    desc: "Bootcamps intensifs de sûreté de l'IA (technique, gouvernance et stratégie)." },
  { id: "aef", name: "Altruisme Efficace France", cat: "formation", url: "https://www.altruismeefficacefrance.org",
    desc: "Association de l'altruisme efficace en France, qui compte la sûreté de l'IA parmi ses causes." },
  { id: "effisciences", name: "EffiSciences", cat: "formation", url: "https://www.effisciences.org",
    desc: "Association née à l'ENS, pour une « recherche impliquée » : IA, risques biologiques." },
  { id: "42ai", name: "42AI", cat: "formation", url: "https://42-ai.github.io",
    desc: "Association d'étudiants de l'école 42, avec un pôle sûreté de l'IA et la newsletter The Turing Point." },
  { id: "piaf", name: "PIAF", cat: "formation", url: "https://piaf-saclay.org",
    desc: "Pour une Intelligence Artificielle Fiable : association étudiante de Paris-Saclay sur la sûreté de l'IA." },
  { id: "inesia", name: "INESIA", cat: "institutions",
    url: "https://www.entreprises.gouv.fr/espace-presse/linstitut-national-pour-levaluation-et-la-securite-de-lia-adopte-sa-feuille-de-route",
    desc: "Institut national pour l'évaluation et la sécurité de l'IA (2025). Fédère l'ANSSI, Inria, le LNE et le PEReN, sous le pilotage de la DGE et du SGDSN." },
  { id: "nm", name: "Nouvelle Machine", cat: "formation", url: "https://nouvellemachine.com",
    desc: "Dîners hebdomadaires, build club et newsletter sur la sûreté de l'IA, à Paris." },
  { id: "futurologue", name: "Le Futurologue", cat: "medias", url: "https://lefuturologue.com",
    desc: "Chaîne YouTube et podcast d'entretiens et de débats sur l'IA et ses risques." },
  { id: "inde-medias", name: "Auteurs indépendants", cat: "medias",
    desc: "Auteurs et conférenciers qui écrivent sur l'IA et ses risques." },
  { id: "inde-recherche", name: "Indépendants", cat: "policy",
    desc: "Chercheurs et organisateurs indépendants." },
  { id: "critiques", name: "Voix sceptiques", cat: "critiques",
    desc: "Figures publiques qui contestent l'idée que l'IA avancée pose des risques majeurs. Elles font partie du débat." }
];

var ECO_PEOPLE = [
  // Mouvement
  { name: "Maxime Fournes", orgs: ["pauseai", "pauseia"], role: "CEO de PauseAI Global ; cofondateur et président de Pause IA",
    src: "https://pauseia.fr/en/qui-sommes-nous" },
  { name: "Clémence Peyrot", orgs: ["pauseia"], role: "Directrice exécutive", src: "https://pauseia.fr/en/qui-sommes-nous" },
  { name: "Éloïse", orgs: ["pauseia"], role: "Chercheuse indépendante en sécurité de l'IA, membre de Pause IA",
    src: "https://pauseia.fr/en/qui-sommes-nous" },
  { name: "Gabriel Alfour", orgs: ["controlai"], role: "Conseiller ; cofondateur de Conjecture", src: "https://controlai.org/about" },
  { name: "Adam Shimi", orgs: ["controlai"], role: "Chercheur en politiques publiques", src: "https://controlai.org/about" },

  // Policy
  { name: "Charbel-Raphaël Ségerie", orgs: ["cesia"], role: "Directeur exécutif et cofondateur", src: "https://cesia.org/en/about/" },
  { name: "Florent Berthet", orgs: ["cesia"], role: "Directeur général", src: "https://cesia.org/en/about/" },
  { name: "Markov Grey", orgs: ["cesia"], role: "Responsable de la gouvernance technique", src: "https://cesia.org/en/about/" },
  { name: "Arthur Grimonpont", orgs: ["cesia"], role: "Responsable du plaidoyer", src: "https://cesia.org/en/about/" },
  { name: "Anne Richard", orgs: ["cesia"], role: "Opérations", src: "https://cesia.org/en/about/" },
  { name: "Henry Papadatos", orgs: ["saferai"], role: "Directeur exécutif", src: "https://www.safer-ai.org/about" },
  { name: "Siméon Campos", orgs: ["saferai"], role: "Fondateur ; président du conseil d'administration", src: "https://www.safer-ai.org/about" },
  { name: "Tom David", orgs: ["gpai"], role: "Cofondateur et CEO", src: "https://www.gpaipolicylab.org/gpai-policy-lab" },
  { name: "Jérémy Andréoletti", orgs: ["gpai"], role: "Directeur de la recherche", src: "https://www.gpaipolicylab.org/gpai-policy-lab" },
  { name: "Pierre Peigné", orgs: ["gpai"], role: "Chercheur en sécurité de l'IA", src: "https://www.gpaipolicylab.org/gpai-policy-lab" },
  { name: "Jérémy Perret", orgs: ["inde-recherche"], role: "Docteur en IA ; écrit et anime des groupes sur l'alignement de l'IA, en français",
    src: "https://www.alignmentforum.org/users/gyrodiot" },

  // Technique
  { name: "Yoshua Bengio", orgs: ["lawzero"], role: "Fondateur, coprésident et directeur scientifique ; prix Turing",
    src: "https://lawzero.org/en/team" },

  // Labs
  { name: "Arthur Mensch", orgs: ["mistral"], role: "Cofondateur et CEO", src: "https://en.wikipedia.org/wiki/Arthur_Mensch" },
  { name: "Guillaume Lample", orgs: ["mistral"], role: "Cofondateur et directeur scientifique",
    src: "https://www.crunchbase.com/person/guillaume-lample" },

  // Formation & communauté
  { name: "Jack Stennett", orgs: ["ml4good"], role: "Directeur",
    src: "https://forum.effectivealtruism.org/posts/8BdJrjNCCHKsSWXp9/ml4good-is-scaling-and-hiring" },
  { name: "Diego Dorn", orgs: ["ml4good"], role: "Enseigne aux bootcamps ML4Good ; a dirigé le benchmark BELLS au CeSIA", src: "https://ddorn.fr/" },
  { name: "Madeleine Amiel-Jourdaa", orgs: ["aef"], role: "Présidente du conseil d'administration", src: "https://www.altruismeefficacefrance.org/a-propos" },
  { name: "Capucine Griot", orgs: ["aef"], role: "Directrice", src: "https://www.altruismeefficacefrance.org/a-propos" },
  { name: "Corentin Biteau", orgs: ["aef"], role: "Chargé de recherche", src: "https://www.altruismeefficacefrance.org/a-propos" },
  { name: "Erin Constance", orgs: ["nm"], role: "Fondatrice", src: "https://nouvellemachine.com" },

  // Médias
  { name: "Shaïman Thürler", orgs: ["futurologue"], role: "Fondateur et animateur", src: "https://lefuturologue.com/" },
  { name: "Flavien Chervet", orgs: ["inde-medias"], role: "Prospectiviste, conférencier ; auteur de Hyperprompt, Hyperarme et de la BD HELO",
    src: "https://www.blogdumoderateur.com/harnais-superintelligence-alignement-flavien-chervet-decrypte-concepts-ia-derriere-bd-helo/" },
  { name: "Aymeric Roucher", orgs: ["inde-medias"], role: "Ingénieur, ancien responsable des agents IA chez Hugging Face ; auteur de Ultra-intelligence (Odile Jacob, 2025)",
    src: "https://www.odilejacob.fr/catalogue/sciences/informatique/ultra-intelligence_9782415013141.php" },

  // Voix sceptiques (description neutre et sourcée uniquement)
  { name: "Yann LeCun", orgs: ["critiques"], role: "Prix Turing ; président exécutif d'AMI Labs (Paris), professeur à NYU.",
    src: "https://heise.de/-11085694" },
  { name: "Jean-Gabriel Ganascia", orgs: ["critiques"], role: "Professeur émérite à Sorbonne Université ; auteur de Le Mythe de la Singularité (Seuil, 2017)",
    src: "https://scai.sorbonne-universite.fr/researchers/ganascia-jean-gabriel" },
  { name: "Luc Julia", orgs: ["critiques"], role: "Ingénieur en IA ; auteur de L'intelligence artificielle n'existe pas (2019) et IA génératives, pas créatives (2025)",
    src: "https://fr.wikipedia.org/wiki/Luc_Julia" }
];
