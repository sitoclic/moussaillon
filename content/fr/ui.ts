/**
 * Textes de l'interface (boutons, menus, messages).
 * Pour traduire le site, copie ce fichier dans /content/<langue>/ui.ts.
 */
export const ui = {
  siteName: "Moussaillon",
  tagline:
    "Du ponton au cap Horn, la course au large expliquée à ceux qui n'ont jamais mis le pied sur un bateau.",
  description:
    "Un documentaire interactif pour tout comprendre à la course au large : les bateaux, la météo, la navigation, la vie à bord, les grandes courses et leurs légendes.",
  skipToContent: "Aller au contenu",
  nav: {
    main: "Navigation principale",
    menu: "Les escales",
    openMenu: "Ouvrir le menu des escales",
    closeMenu: "Fermer le menu",
    home: "Accueil",
    glossary: "Glossaire",
    about: "À propos et sources",
    proTips: "Astuces de pro",
    finalQuiz: "Quiz final",
  },
  theme: {
    toNight: "Passer en quart de nuit",
    toDay: "Revenir au jour",
    night: "Quart de nuit",
    day: "Jour",
  },
  home: {
    kicker: "Documentaire interactif",
    helloTitle: "Salut, moi c'est Moussaillon !",
    hello: [
      "Je ne connaissais rien à la mer. Pas même la différence entre bâbord et tribord. Alors on va apprendre ensemble, pas à pas, sans jargon.",
      "Au programme : des bateaux qui volent au-dessus de l'eau, des marins qui dorment 20 minutes d'affilée, des vagues hautes comme des immeubles… et quelques ficelles de pros. À chaque mot technique, je t'explique.",
    ],
    cast: "Larguer les amarres",
    resume: "Reprendre où j'en étais",
    mapTitle: "La carte du voyage",
    mapIntro:
      "Onze escales, du ponton au cap Horn. Chacune se lit en 5 à 10 minutes, dans l'ordre ou en picorant. Les escales déjà visitées sont cochées.",
    visited: "Escale visitée",
    minutes: "min",
    progress: (n: number, total: number) =>
      n === 0
        ? "Ton voyage n'a pas encore commencé."
        : n === total
          ? "Tu as fait le tour complet. Respect, cap-hornier !"
          : `${n} escale${n > 1 ? "s" : ""} sur ${total} visitée${n > 1 ? "s" : ""}.`,
    scrollHint: "Fais défiler pour quitter le port",
  },
  chapter: {
    stop: "Escale",
    readingTime: (m: number) => `${m} min de lecture`,
    keyPoints: "Ce qu'il faut retenir",
    quiz: "Le mini-quiz",
    prev: "Escale précédente",
    next: "Escale suivante",
    backToMap: "Retour à la carte",
    soon: "Cette escale est en cours de préparation. Le moussaillon astique le pont, reviens bientôt !",
    done: "Escale terminée ! Elle est cochée sur ta carte.",
  },
  quiz: {
    check: "Valider",
    next: "Question suivante",
    finish: "Voir mon score",
    restart: "Recommencer",
    right: "Bien vu !",
    wrong: "Pas tout à fait…",
    score: (s: number, t: number) => `Score : ${s} / ${t}`,
    question: (i: number, t: number) => `Question ${i} sur ${t}`,
    best: (s: number, t: number) => `Ton meilleur score : ${s} / ${t}`,
    perfect: "Sans faute, matelot ! Le moussaillon est épaté.",
    good: "Belle navigation ! Quelques bords à reprendre, et ce sera parfait.",
    retry:
      "Pas grave : même les grands skippers ont raté des virements. Relis l'escale et retente ta chance.",
  },
  glossary: {
    title: "Glossaire",
    kicker: (n: number) => `${n} mots de marin`,
    intro:
      "Tous les mots techniques du site, expliqués simplement. Tape un mot, ou filtre par thème. Ce sont les mêmes définitions que dans les bulles des chapitres.",
    search: "Chercher un mot (ex. : bâbord, foil, grain…)",
    all: "Tous",
    themesLabel: "Filtrer par thème",
    results: (n: number) => (n === 0 ? "Aucun résultat" : `${n} mot${n > 1 ? "s" : ""}`),
    empty: "Aucun mot trouvé. Essaie sans accent, ou un mot plus court.",
    themes: {
      bateau: "Le bateau",
      voiles: "Les voiles",
      manoeuvres: "Allures et manœuvres",
      "mer-meteo": "Mer et météo",
      navigation: "Navigation",
      course: "La course",
      "vie-a-bord": "Vie à bord",
    },
  },
  about: {
    title: "À propos et sources",
    intro: [
      "Moussaillon est un documentaire interactif pour découvrir la course au large sans rien y connaître. Pas de compte, pas de publicité, pas de pisteur : ta progression et tes scores restent dans ton navigateur, et rien n'est envoyé nulle part.",
      "Tous les textes sont rédigés pour ce site. Les illustrations (bateaux, cartes, mascotte) sont des dessins originaux : aucune photo de personne réelle, aucun logo de sponsor ni de marque.",
      "Les cartes du site sont volontairement simplifiées : elles servent à comprendre, pas à naviguer !",
    ],
    sourcesTitle: "Les sources",
    sourcesIntro:
      "Les informations ont été recoupées à partir de sources publiques. Les sites officiels des classes et des courses font foi en cas de doute.",
    sources: [
      {
        name: "Vendée Globe (site officiel)",
        url: "https://www.vendeeglobe.org",
        note: "parcours, règlement, résultats",
      },
      { name: "Classe IMOCA", url: "https://www.imoca.org", note: "jauge et caractéristiques des IMOCA" },
      {
        name: "Route du Rhum – Destination Guadeloupe",
        url: "https://www.routedurhum.com",
        note: "édition 2026",
      },
      { name: "Class40", url: "https://www.class40.com", note: "caractéristiques de la classe" },
      { name: "Classe Mini", url: "https://www.classemini.com", note: "Mini 6.50 et Mini Transat" },
      { name: "Météo-France", url: "https://meteofrance.com", note: "échelle de Beaufort, phénomènes météo" },
      {
        name: "Service hydrographique et océanographique de la Marine (SHOM)",
        url: "https://www.shom.fr",
        note: "cartographie, unités",
      },
      {
        name: "Presse spécialisée",
        note: "Figaro Nautisme, Voiles et Voiliers, Course au large, Yachting World, Sailing World",
      },
    ] as Array<{ name: string; url?: string; note?: string }>,
    figuresTitle: "Les chiffres clés, et quand ils ont été vérifiés",
    figuresIntro:
      "Chaque chiffre important du site est rangé dans un fichier unique, avec sa source et sa date de vérification. Le voici en entier.",
    colFigure: "Chiffre",
    colSource: "Source",
    colDate: "Vérifié le",
    toCheck: "à vérifier",
  },
  hullTypes: {
    mono: "Monocoque",
    cata: "Catamaran",
    tri: "Trimaran",
    caption:
      "Le monocoque tient debout grâce à son lest. Le catamaran et le trimaran, eux, tirent leur stabilité de leur largeur : plus légers, donc plus rapides, mais incapables de se redresser s'ils chavirent.",
  },
  news: {
    title: "En ce moment",
    updated: "Mis à jour le",
  },
  term: {
    definition: "Définition",
    seeGlossary: "Voir dans le glossaire",
  },
  boxes: {
    proTip: "Astuce de pro",
    mascotTip: "Le conseil du moussaillon",
    mascotQuestion: "Le moussaillon se demande…",
    landComparison: "Pour comparer, à terre",
  },
  footer: {
    madeWith: "Un site sans compte, sans pub et sans pisteur. Ta progression reste dans ton navigateur.",
    reset: "Effacer ma progression",
    resetDone: "Progression effacée.",
  },
} as const;

export type UI = typeof ui;
