/**
 * Textes des composants interactifs (simulateurs, jeux, schémas).
 * Séparés du code pour pouvoir être relus et traduits facilement.
 */
export const ix = {
  babordTribord: {
    title: "Le jeu de bâbord et tribord",
    intro:
      "Le bateau tourne au hasard. Clique (ou touche) la bonne partie du bateau. Rappel : on se place toujours à bord, en regardant vers l'avant.",
    targets: {
      babord: "Où est bâbord ?",
      tribord: "Où est tribord ?",
      proue: "Où est la proue (l'avant) ?",
      poupe: "Où est la poupe (l'arrière) ?",
    },
    names: { babord: "bâbord", tribord: "tribord", proue: "la proue", poupe: "la poupe" },
    zoneLabel: (dir: string) => `Partie du bateau située ${dir} de l'écran`,
    dirs: [
      "en haut",
      "en haut à droite",
      "à droite",
      "en bas à droite",
      "en bas",
      "en bas à gauche",
      "à gauche",
      "en haut à gauche",
    ],
    right: "Exact !",
    wrong: (name: string) => `Raté : tu as touché ${name}.`,
    explainSide:
      "Repère d'abord l'avant (la pointe du bateau), imagine-toi debout à bord en regardant vers lui : bâbord est à ta gauche, tribord à ta droite.",
    explainEnds:
      "La proue, c'est la partie pointue qui fend l'eau ; la poupe, c'est l'arrière, large et plat.",
    lights:
      "Bonus : la nuit, les bateaux portent un feu rouge à bâbord et un feu vert à tribord. C'est ainsi qu'on devine, de loin, dans quel sens va un navire.",
    next: "Question suivante",
    streak: (n: number) =>
      n === 0 ? "Série : 0" : `Série : ${n} bonne${n > 1 ? "s" : ""} réponse${n > 1 ? "s" : ""} d'affilée`,
    showHelp: "Afficher les repères",
    hideHelp: "Masquer les repères",
    bow: "avant",
  },
  noeuds: {
    title: "Convertisseur de nœuds",
    label: "Vitesse du bateau, en nœuds",
    kmh: "km/h",
    compare: [
      { max: 3, text: "Le pas tranquille d'un promeneur." },
      { max: 7, text: "Un joggeur à bonne allure." },
      { max: 12, text: "Un cycliste en balade." },
      { max: 18, text: "Un cycliste qui appuie fort sur les pédales." },
      { max: 27, text: "Une voiture qui roule en ville." },
      { max: 40, text: "Une voiture sur une route de campagne." },
      { max: 999, text: "La vitesse d'une voiture sur une nationale, mais sur l'eau, avec des vagues !" },
    ],
    caption: (kn: number, km: string, miles: number) =>
      `À ${kn} nœuds, un bateau parcourt ${miles} milles en 24 heures, soit environ ${km} km.`,
  },
  auVent: {
    wind: "Vent",
    windward: "Au vent",
    leeward: "Sous le vent",
    caption:
      "Le côté « au vent » reçoit le vent en premier ; le côté « sous le vent » est à l'abri. Sur ce bateau, le vent arrive par bâbord.",
  },
  voileAile: {
    title: "Une voile, c'est une aile",
    wing: "Aile d'avion",
    sail: "Voile vue de dessus",
    lift: "Portance",
    fast: "L'air passe vite : la pression baisse",
    slow: "L'air passe moins vite : la pression est plus forte",
    caption:
      "Côté bombé, l'air accélère et la pression diminue ; côté creux, elle reste plus forte. Cette différence crée une force, la portance, qui « aspire » la voile vers l'avant et sur le côté.",
  },
  allures: {
    title: "Le simulateur d'allures",
    help: "Fais tourner le bateau en le faisant glisser (ou avec les flèches du clavier, ou le curseur). Le vent vient toujours du haut.",
    wind: "Vent",
    windStrength: "Force du vent",
    knots: "nœuds",
    angle: "Angle au vent",
    speed: "Vitesse indicative",
    tack: { babord: "bâbord amures", tribord: "tribord amures", aucun: "" },
    slider: "Cap du bateau par rapport au vent",
    names: {
      "zone-morte": "Vent debout (zone morte)",
      pres: "Près",
      "bon-plein": "Bon plein",
      travers: "Travers",
      largue: "Largue",
      "grand-largue": "Grand largue",
      "vent-arriere": "Vent arrière",
    },
    tips: {
      "zone-morte":
        "Face au vent, les voiles claquent comme des drapeaux : impossible d'avancer. Il faut s'écarter d'au moins 40° du vent.",
      pres: "On remonte au plus près du vent. Le bateau gîte, tape dans les vagues : c'est l'allure la plus inconfortable.",
      "bon-plein": "Un peu plus ouvert que le près : le bateau accélère et devient plus confortable.",
      travers: "Le vent arrive de côté, à 90°. Les voiles sont à moitié ouvertes.",
      largue:
        "Le vent vient de l'arrière, en biais. Les voiles sont bien ouvertes : souvent une allure très rapide.",
      "grand-largue":
        "Le vent vient presque de l'arrière. Avec un gennaker, c'est l'allure préférée des bateaux de course modernes.",
      "vent-arriere":
        "Le vent pousse par l'arrière. Contre-intuitif : ce n'est pas l'allure la plus rapide, et la bôme peut traverser violemment (empannage).",
    },
    polarTitle: "La polaire du bateau",
    polarCaption:
      "Chaque courbe donne la vitesse du bateau pour une force de vent. Le point jaune, c'est toi. Polaire imaginaire, inspirée d'un monocoque de course.",
    valueText: (allure: string, twa: number, tackLabel: string, speed: string) =>
      `${allure}, ${twa}° du vent${tackLabel ? `, ${tackLabel}` : ""}, ${speed} nœuds`,
  },
  manoeuvres: {
    title: "Virement de bord et empannage",
    tack: "Virement de bord",
    gybe: "Empannage",
    play: "Lancer la manœuvre",
    replay: "Rejouer",
    boom: "la bôme !",
    step: "Étape",
    prev: "Étape précédente",
    next: "Étape suivante",
    stepsTack: [
      "Le bateau avance au près, bâbord amures : le vent arrive par la gauche.",
      "Le marin pousse la barre : l'avant du bateau se rapproche du vent.",
      "L'avant passe face au vent : les voiles faseyent, le bateau ralentit.",
      "Les voiles se gonflent de l'autre côté : nous voilà tribord amures.",
    ],
    stepsGybe: [
      "Le bateau avance au grand largue, tribord amures : le vent arrive par l'arrière droit.",
      "Le marin tourne doucement : l'arrière se rapproche du vent.",
      "L'arrière passe dans le vent : la bôme traverse le bateau d'un coup. Attention aux têtes !",
      "Le bateau repart au grand largue, bâbord amures.",
    ],
  },
  quille: {
    title: "Pourquoi le bateau ne chavire pas ?",
    windForce: "Force du vent",
    heel: (deg: number) => `Gîte : ${deg}°`,
    withKeel: "Avec quille lestée",
    withoutKeel: "Sans quille",
    canting: "Quille pendulaire",
    capsized: "Chavirage ! Sans contrepoids, rien ne redresse le bateau.",
    legendWind: "Poussée du vent",
    legendWeight: "Poids du lest",
    legendBuoyancy: "Poussée de l'eau",
    explainKeel:
      "Plus le bateau penche, plus le lest s'écarte sur le côté et tire vers le bas : il agit comme un bras de levier qui redresse le bateau.",
    explainCanting:
      "La quille pendulaire bascule du côté d'où vient le vent : le lest fait contrepoids plus loin, et le bateau reste plus droit, donc plus rapide.",
  },
  anatomie: {
    title: "Anatomie d'un IMOCA",
    help: "Touche un point numéroté pour ouvrir la fiche de la pièce. Change de vue avec les onglets.",
    views: { profil: "Profil", dessus: "Vue de dessus", ecorche: "Écorché (intérieur)" },
    role: "À quoi ça sert",
    how: "Comment ça marche",
    figure: "Le chiffre",
    anecdote: "L'anecdote",
    allParts: "Toutes les pièces",
    close: "Fermer la fiche",
    pick: "Choisis une pièce sur le schéma pour voir sa fiche.",
    scale: "Échelle : une silhouette humaine de 1,80 m",
  },
  foils: {
    title: "Avant / après les foils",
    speed: "Vitesse du bateau",
    before: "IMOCA à dérives (avant 2015)",
    after: "IMOCA à foils",
    wetted: "Coque dans l'eau",
    explain: (lift: number) =>
      lift < 5
        ? "À faible vitesse, le foil ne porte presque rien : les deux bateaux se comportent pareil."
        : lift < 60
          ? "Le foil commence à soulever la coque : moins de surface mouillée, donc moins de frottement."
          : "À grande vitesse, le foil porte une grande partie du poids : la coque effleure l'eau. Un IMOCA ne vole jamais complètement, mais il s'allège énormément.",
    note: "Illustration simplifiée : les proportions sont exagérées pour bien voir l'effet.",
  },
} as const;

export type IX = typeof ix;
