/**
 * Les grandes courses (chapitre 9). Routes : [longitude, latitude], simplifiées.
 * Sources et dates : voir content/chiffres.ts et A_VERIFIER.md.
 */
export type Race = {
  id: string;
  name: string;
  route: string;
  rhythm: string;
  crew: string;
  classes: string;
  since: string;
  fact: string;
  /** Tracé simplifié pour la mini-carte. */
  path: Array<[number, number]>;
  /** Cadrage de la mini-carte : [lonMin, lonMax, latMax, latMin]. */
  frame: [number, number, number, number];
};

export const races: Race[] = [
  {
    id: "vendee-globe",
    name: "Vendée Globe",
    route: "Les Sables-d'Olonne → tour du monde par les trois caps → Les Sables-d'Olonne",
    rhythm: "Tous les quatre ans. Prochain départ : novembre 2028.",
    crew: "En solitaire, sans escale et sans assistance",
    classes: "IMOCA",
    since: "1989",
    fact: "Record : 64 jours, 19 heures et 22 minutes (Charlie Dalin, 2024-2025).",
    path: [
      [-1.8, 46.5],
      [-25, 10],
      [-30, -20],
      [18, -42],
      [115, -45],
      [175, -50],
      [237, -50],
      [293, -56],
      [320, -25],
      [330, 5],
      [358, 46.5],
    ],
    frame: [-180, 180, 70, -70],
  },
  {
    id: "route-du-rhum",
    name: "Route du Rhum – Destination Guadeloupe",
    route: "Saint-Malo → Pointe-à-Pitre (Guadeloupe)",
    rhythm: "Tous les quatre ans. 13e édition partie le 1er novembre 2026.",
    crew: "En solitaire",
    classes: "Ultim, Ocean Fifty, IMOCA, Class40, Vintage Mono et Vintage Multi",
    since: "1978",
    fact: "La première édition s'est jouée à 98 secondes : Mike Birch a devancé Michel Malinovsky sur la ligne.",
    path: [
      [-2, 48.6],
      [-12, 44],
      [-25, 30],
      [-45, 20],
      [-61.5, 16.2],
    ],
    frame: [-75, 5, 55, 5],
  },
  {
    id: "transat-cafe-lor",
    name: "Transat Café L'Or (ex-Transat Jacques Vabre)",
    route: "Le Havre → Fort-de-France (Martinique) en 2025",
    rhythm: "Tous les deux ans (années impaires). Prochaine édition : 2027.",
    crew: "En double",
    classes: "Ultim, Ocean Fifty, IMOCA, Class40",
    since: "1993",
    fact: "Surnommée « la route du café », en souvenir des cargos qui rapportaient le café d'Amérique du Sud. Elle a changé de nom en 2025.",
    path: [
      [0.1, 49.5],
      [-5, 48],
      [-12, 43],
      [-25, 28],
      [-45, 18],
      [-61, 14.6],
    ],
    frame: [-75, 5, 55, 5],
  },
  {
    id: "solitaire-figaro",
    name: "La Solitaire du Figaro",
    route:
      "Plusieurs étapes entre la France, l'Espagne, l'Irlande ou le Royaume-Uni (le parcours change chaque année)",
    rhythm: "Tous les ans.",
    crew: "En solitaire",
    classes: "Figaro Beneteau 3 (monotype)",
    since: "1970",
    fact: "Surnommée « l'université de la course au large » : la plupart des grands skippers français y ont fait leurs classes.",
    path: [
      [-1.2, 46.2],
      [-4.5, 48],
      [-6, 51.5],
      [-4, 50.2],
      [-1.6, 49.6],
      [-5, 47.5],
    ],
    frame: [-12, 4, 56, 42],
  },
  {
    id: "mini-transat",
    name: "Mini Transat",
    route:
      "France → Canaries → Antilles (en 2025 : Les Sables-d'Olonne → La Palma → Saint-François, Guadeloupe)",
    rhythm: "Tous les deux ans (années impaires).",
    crew: "En solitaire, sans contact avec la terre",
    classes: "Mini 6.50",
    since: "1977",
    fact: "En 2025, la première étape a été annulée à cause de l'ouragan Gabrielle : les marins sont partis directement des Canaries.",
    path: [
      [-1.8, 46.5],
      [-10, 40],
      [-17.8, 28.7],
      [-35, 20],
      [-61.2, 16.3],
    ],
    frame: [-75, 5, 55, 5],
  },
  {
    id: "the-ocean-race",
    name: "The Ocean Race",
    route:
      "Tour du monde par étapes. Édition 2027 : départ d'Alicante (Espagne), escales notamment à Auckland, arrivée en mer Rouge",
    rhythm: "Tous les trois à quatre ans. Prochain départ : 17 janvier 2027.",
    crew: "En équipage",
    classes: "IMOCA (tous à foils en 2027)",
    since: "1973 (sous le nom de Whitbread)",
    fact: "La plus ancienne course autour du monde en équipage. L'édition 2027 comptera la plus longue étape de son histoire, d'Alicante à Auckland.",
    path: [
      [-0.5, 38.3],
      [-20, 10],
      [-20, -30],
      [40, -45],
      [110, -45],
      [174.8, -36.8],
      [200, -50],
      [293, -56],
      [-48.7 + 360, -26.9],
      [-82.7 + 360, 27.8],
      [-9.4 + 360, 38.7],
    ],
    frame: [-180, 180, 70, -70],
  },
  {
    id: "jules-verne",
    name: "Trophée Jules Verne",
    route: "Tour du monde depuis la ligne Ouessant – cap Lizard, et retour",
    rhythm: "Pas de date fixe : c'est un record, que l'on tente quand la météo est favorable.",
    crew: "En équipage, sans escale",
    classes: "Tous bateaux (en pratique, de grands multicoques)",
    since: "1993",
    fact: "Record : 40 jours, 10 heures et 45 minutes (Sodebo Ultim 3, janvier 2026). Le premier détenteur avait mis 79 jours, en 1993.",
    path: [
      [-5.1, 48.5],
      [-25, 10],
      [-28, -25],
      [20, -45],
      [115, -48],
      [175, -52],
      [237, -55],
      [293, -57],
      [320, -25],
      [330, 5],
      [354.9, 48.5],
    ],
    frame: [-180, 180, 70, -70],
  },
  {
    id: "arkea-ultim",
    name: "Arkéa Ultim Challenge – Brest",
    route: "Brest → tour du monde par les trois caps → Brest",
    rhythm: "Première édition en 2024.",
    crew: "En solitaire (escales techniques autorisées)",
    classes: "Ultim",
    since: "2024",
    fact: "Charles Caudrelier a remporté la première édition en 50 jours et 19 heures, sans aucune escale technique.",
    path: [
      [-4.5, 48.4],
      [-25, 10],
      [-28, -25],
      [20, -45],
      [115, -48],
      [175, -52],
      [237, -55],
      [293, -57],
      [320, -25],
      [330, 5],
      [355.5, 48.4],
    ],
    frame: [-180, 180, 70, -70],
  },
  {
    id: "the-transat",
    name: "The Transat CIC",
    route: "Europe → Amérique du Nord, contre les vents dominants (2024 : Lorient → New York)",
    rhythm: "Tous les quatre ans.",
    crew: "En solitaire",
    classes: "IMOCA, Class40 et d'autres selon les éditions",
    since: "1960",
    fact: "La plus ancienne course transatlantique en solitaire, née d'un pari entre marins britanniques. Éric Tabarly la gagne en 1964 et lance la passion française pour la course au large.",
    path: [
      [-3.4, 47.7],
      [-15, 48],
      [-35, 46],
      [-55, 43],
      [-74, 40.6],
    ],
    frame: [-80, 0, 58, 32],
  },
];
