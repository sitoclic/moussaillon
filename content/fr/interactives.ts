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
  silhouettes: {
    title: "Toute la famille, à la même échelle",
    intro: "Choisis une classe pour la mettre en avant. Le petit personnage mesure 1,80 m.",
    aria: (name: string, length: string, mast: string) =>
      `Silhouettes des bateaux de course à l'échelle. ${name} : longueur ${length}, mât ${mast}.`,
    length: "Longueur",
    mast: "Hauteur de mât",
    hulls: "Coques",
    mono: "1 (monocoque)",
    tri: "3 (trimaran)",
    note: "Dessins simplifiés, à l'échelle approximative.",
  },
  comparateur: {
    title: "Le comparateur de classes",
    intro: "Choisis deux bateaux et compare-les point par point.",
    first: "Premier bateau",
    second: "Second bateau",
    mono: "1 (monocoque)",
    tri: "3 (trimaran)",
    footprint: "Vus de dessus, à la même échelle : la largeur d'un trimaran saute aux yeux.",
    footprintAria: (a: string, b: string) => `${a} et ${b} vus de dessus, à la même échelle.`,
    rows: {
      length: "Longueur",
      beam: "Largeur",
      mast: "Hauteur de mât",
      hulls: "Coques",
      speed: "Vitesse de pointe (ordre de grandeur)",
      price: "Prix (ordre de grandeur)",
      crew: "À bord",
      foils: "Foils",
      races: "Courses phares",
      pitch: "En une phrase",
    },
    note: "Dimensions : maxima fixés par les règles de chaque classe. Vitesses et prix : ordres de grandeur, très variables d'un bateau à l'autre.",
  },
  beaufort: {
    title: "L'échelle de Beaufort vivante",
    intro: "Fais glisser le curseur de 0 à 12 et regarde la mer changer.",
    force: "Force",
    wind: "Vent",
    waves: "Vagues",
    knots: "nœuds",
    kmh: "km/h",
    sea: "État de la mer",
    skipper: "Pour un skipper",
    sound: "Son",
    soundOn: "Couper le son",
    soundOff: "Activer le son (généré, sans fichier)",
    slider: "Force du vent sur l'échelle de Beaufort",
  },
  meteoCarte: {
    title: "Lire une carte météo",
    intro: "Touche les éléments de la carte pour comprendre ce qu'ils signifient.",
    items: {
      high: {
        label: "A : l'anticyclone",
        text: "Une zone de hautes pressions. Au centre, peu de vent : les marins l'évitent. Dans l'hémisphère Nord, le vent tourne autour dans le sens des aiguilles d'une montre.",
      },
      low: {
        label: "D : la dépression",
        text: "Une zone de basses pressions. Le vent y tourne dans l'autre sens et y souffle fort, avec nuages et pluie. Bien placé, on y trouve un vent puissant pour aller vite ; mal placé, c'est la tempête.",
      },
      isobars: {
        label: "Les isobares",
        text: "Ces lignes relient les points de même pression, comme les courbes de niveau sur une carte de randonnée. Plus elles sont serrées, plus le vent est fort.",
      },
      arrows: {
        label: "Les flèches de vent",
        text: "Elles montrent la direction du vent. Le vent suit à peu près les isobares, en penchant légèrement vers les basses pressions.",
      },
      front: {
        label: "Le front",
        text: "La limite entre de l'air chaud et de l'air froid. Son passage apporte souvent pluie, grains et une bascule brutale du vent.",
      },
    },
    pick: "Touche un élément de la carte.",
  },
  routage: {
    title: "Le mini-jeu du routeur",
    intro: "Deux routes possibles pour rejoindre l'arrivée. Laquelle choisirais-tu ?",
    scenario: "Situation",
    routeA: "Route 1",
    routeB: "Route 2",
    choose: "Je choisis",
    distance: "Distance",
    time: "Temps",
    hours: (h: number) => `${Math.round(h)} h`,
    miles: (m: number) => `${m} milles`,
    youWin: "Bien vu, ta route gagne !",
    youLose: "Raté : l'autre route arrive avant.",
    again: "Situation suivante",
    restart: "Rejouer",
    start: "Départ",
    finish: "Arrivée",
    scenarios: [
      {
        name: "Un anticyclone sur la route",
        a: "La route directe, en plein milieu de l'anticyclone.",
        b: "Le détour par le bord de l'anticyclone, là où le vent souffle.",
        lesson:
          "Au centre d'un anticyclone, il n'y a presque pas de vent : la route courte devient interminable. Le détour est plus long, mais bien plus rapide.",
      },
      {
        name: "Une dépression au sud de la route",
        a: "La route directe, au nord de la dépression : le vent arrive de face.",
        b: "Le grand crochet par le sud de la dépression, avec le vent dans le dos.",
        lesson:
          "Au près, on remonte le vent en zigzag et l'on va moins vite. Au portant, le bateau file : la route plus longue l'emporte.",
      },
      {
        name: "Des alizés bien établis",
        a: "La route directe, vent de travers.",
        b: "Un détour vers le sud pour chercher plus de vent.",
        lesson:
          "Quand le vent est régulier partout, le détour ne rapporte rien : la route directe gagne. Le routage, c'est savoir quand faire un détour… et quand ne pas en faire !",
      },
    ],
  },
  coordonnees: {
    title: "Latitude et longitude",
    intro: "Touche la carte : tu obtiens la position du point. Sauras-tu trouver la mission ?",
    lat: "Latitude",
    lon: "Longitude",
    north: "N",
    south: "S",
    east: "E",
    west: "O",
    missions: [
      { label: "Trouve l'équateur et le méridien de Greenwich (0°, 0°)", lat: 0, lon: 0 },
      { label: "Trouve le cap Horn (56° S, 67° O)", lat: -56, lon: -67 },
      { label: "Trouve le point Nemo (49° S, 123° O)", lat: -49, lon: -123 },
    ],
    found: "Trouvé ! Bravo, navigateur.",
    close: (d: number) => `Encore un effort : tu es à environ ${d} milles nautiques.`,
    next: "Mission suivante",
    equator: "Équateur",
    greenwich: "Greenwich",
  },
  capRoute: {
    title: "Le cap et la route",
    intro:
      "Ajoute du courant : le bateau pointe toujours dans la même direction, mais il ne va plus au même endroit.",
    current: "Force du courant (vers le sud)",
    heading: "Cap",
    track: "Route réelle",
    drift: (deg: number) =>
      deg === 0
        ? "Pas de courant : la route suit le cap."
        : `Le courant dévie le bateau de ${deg}° par rapport à son cap.`,
  },
  vendeeGlobe: {
    title: "La route du Vendée Globe",
    intro:
      "Suis la course étape par étape : touche les numéros, utilise les flèches, ou lance la visite automatique.",
    step: "Étape",
    stepsLabel: "Étapes de la course",
    weather: "La météo",
    traps: "Les pièges",
    anecdote: "L'histoire vraie",
    prev: "Précédente",
    next: "Suivante",
    play: "▶ Visite automatique",
    pause: "❚❚ Pause",
    capes: ["Bonne-Espérance", "Leeuwin", "Horn"],
    zea: "Zone d'exclusion antarctique (tracé très simplifié) : interdiction d'aller plus au sud, à cause des icebergs.",
  },
  sommeil: {
    title: "Le simulateur de sommeil",
    intro:
      "Chaque case représente 20 minutes. Touche les cases pour placer tes siestes sur 24 heures, et regarde ta fatigue évoluer. Saurais-tu dormir comme un skipper ?",
    presetLand: "Dormir comme à terre",
    presetSkipper: "Dormir comme un skipper",
    clear: "Tout effacer",
    gridLabel: "Planning de sommeil sur 24 heures, par tranches de 20 minutes",
    asleep: "endormi",
    awake: "éveillé",
    legendSleep: "Sommeil",
    legendNight: "Nuit",
    fatigue: "Ta jauge de fatigue sur la journée",
    total: "Sommeil total",
    longest: "Plus longue sieste",
    good: "Rythme de skipper : assez de sommeil au total, et jamais trop longtemps sans surveiller le bateau. Bravo !",
    riskLong:
      "Sieste trop longue : en une heure, un cargo invisible au moment où tu t'endors peut arriver sur toi. Les solitaires dorment rarement plus de 20 à 40 minutes d'affilée.",
    riskTired:
      "Fatigue extrême : erreurs de manœuvre, chutes, voire hallucinations. C'est comme ça qu'on casse un bateau.",
    riskTooLittle: "Pas assez de sommeil au total : tu ne tiendras pas des semaines à ce rythme.",
    riskNone: "Zéro sommeil ? Impossible de tenir plus d'un ou deux jours. Place quelques siestes !",
    modelNote: "Modèle très simplifié, pour comprendre le principe.",
  },
  journee: {
    title: "Une journée dans les mers du Sud",
    intro: "Une journée type, reconstituée d'après les récits de skippers. Touche chaque moment.",
    prev: "Avant",
    next: "Après",
  },
  courses: {
    title: "Les grandes courses",
    intro: "Choisis une course pour voir son parcours et sa carte d'identité.",
    mapOf: "Carte du parcours :",
    start: "Départ",
    finish: "Arrivée",
    route: "Parcours",
    rhythm: "Rythme",
    crew: "À bord",
    classes: "Bateaux",
    since: "Depuis",
  },
  frise: {
    title: "La frise des légendes",
    intro: "Plus d'un siècle de course au large. Touche une date, ou filtre par thème.",
    filter: "Filtrer par thème",
    kinds: {
      all: "Tout",
      pionnier: "Pionniers",
      course: "Naissance d'une course",
      record: "Records",
      sauvetage: "Sauvetages",
      pionniere: "Pionnières",
    },
    prev: "Plus ancien",
    next: "Plus récent",
  },
} as const;

export type IX = typeof ix;
