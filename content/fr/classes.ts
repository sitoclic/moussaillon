/**
 * Les grandes classes de la course au large (chapitre 4).
 * Dimensions : maxima fixés par les règles de chaque classe (sources dans content/chiffres.ts).
 * Les vitesses de pointe et les prix sont des ORDRES DE GRANDEUR, signalés comme tels.
 */

export type RaceClass = {
  id: "mini" | "figaro" | "class40" | "oceanfifty" | "imoca" | "ultim";
  name: string;
  /** Nombre de coques. */
  hulls: 1 | 3;
  /** Longueur de coque, en mètres (sert au dessin à l'échelle). */
  length: number;
  lengthLabel: string;
  /** Largeur maximale, en mètres. */
  beam: number;
  beamLabel: string;
  /** Hauteur du mât au-dessus de l'eau, en mètres (dessin). */
  mast: number;
  mastLabel: string;
  topSpeed: string;
  price: string;
  races: string[];
  crew: string;
  foils: string;
  pitch: string;
};

export const raceClasses: RaceClass[] = [
  {
    id: "mini",
    name: "Mini 6.50",
    hulls: 1,
    length: 6.5,
    lengthLabel: "6,50 m",
    beam: 3,
    beamLabel: "3 m",
    mast: 12,
    // À VÉRIFIER : la jauge limite tirant d'air + tirant d'eau à 14 m ; « environ 12 m » est un ordre de grandeur
    mastLabel: "environ 12 m",
    topSpeed: "plus de 20 nœuds au surf",
    // À VÉRIFIER : prix observés sur les petites annonces de la classe
    price: "de quelques milliers à plus de 100 000 € d'occasion",
    races: ["Mini Transat"],
    crew: "En solitaire (et parfois en double)",
    foils: "Autorisés sur les prototypes",
    pitch:
      "Le plus petit bateau pour traverser l'Atlantique seul. L'école de presque tous les grands skippers.",
  },
  {
    id: "figaro",
    name: "Figaro Beneteau 3",
    hulls: 1,
    length: 9.75,
    lengthLabel: "9,75 m de coque (10,85 m hors tout)",
    beam: 3.4,
    beamLabel: "3,40 m",
    mast: 15,
    // À VÉRIFIER : hauteur de mât
    mastLabel: "environ 15 m",
    topSpeed: "une vingtaine de nœuds",
    // À VÉRIFIER
    price: "quelques centaines de milliers d'euros neuf",
    races: ["La Solitaire du Figaro", "Transat en double"],
    crew: "En solitaire ou en double",
    foils: "Oui : le premier monocoque de série à foils",
    pitch: "Tous les bateaux sont identiques (monotype) : seul le talent du marin fait la différence.",
  },
  {
    id: "class40",
    name: "Class40",
    hulls: 1,
    length: 12.19,
    lengthLabel: "12,19 m (40 pieds)",
    beam: 4.5,
    beamLabel: "4,50 m",
    mast: 19,
    mastLabel: "19 m au maximum",
    topSpeed: "plus de 25 nœuds",
    // À VÉRIFIER
    price: "de l'ordre du million d'euros neuf",
    races: ["Route du Rhum", "Transat Café L'Or (ex-Jacques Vabre)", "Globe40"],
    crew: "En solitaire, en double ou en équipage",
    foils: "Interdits",
    pitch:
      "La classe la plus nombreuse au départ des grandes transats : 49 bateaux sur la Route du Rhum 2026.",
  },
  {
    id: "oceanfifty",
    name: "Ocean Fifty",
    hulls: 3,
    length: 15.24,
    lengthLabel: "15,24 m (50 pieds)",
    beam: 15.24,
    beamLabel: "15,24 m",
    mast: 23.77,
    // À VÉRIFIER : source secondaire
    mastLabel: "23,77 m au maximum",
    topSpeed: "plus de 35 nœuds",
    // À VÉRIFIER
    price: "quelques millions d'euros",
    races: ["Route du Rhum", "Transat Café L'Or (ex-Jacques Vabre)", "Ocean Fifty Series"],
    crew: "En solitaire, en double ou en équipage",
    foils: "Oui",
    pitch: "Aussi larges que longs : des trimarans de poche, nerveux et spectaculaires.",
  },
  {
    id: "imoca",
    name: "IMOCA",
    hulls: 1,
    length: 18.28,
    lengthLabel: "18,28 m (60 pieds)",
    beam: 5.85,
    beamLabel: "5,85 m",
    mast: 29,
    mastLabel: "29 m au maximum",
    topSpeed: "plus de 35 nœuds",
    // À VÉRIFIER
    price: "plusieurs millions d'euros neuf",
    races: ["Vendée Globe", "Route du Rhum", "Transat Café L'Or (ex-Jacques Vabre)", "The Ocean Race"],
    crew: "En solitaire, en double ou en équipage",
    foils: "Oui (et quille pendulaire)",
    pitch: "Le bateau du Vendée Globe, conçu pour faire le tour du monde seul et sans escale.",
  },
  {
    id: "ultim",
    name: "Ultim",
    hulls: 3,
    length: 32,
    lengthLabel: "jusqu'à 32 m",
    beam: 23,
    beamLabel: "jusqu'à 23 m",
    mast: 36,
    // À VÉRIFIER : la jauge limite le mât à 120 % de la longueur ; 35-36 m est un ordre de grandeur
    mastLabel: "environ 35 m",
    topSpeed: "plus de 40 nœuds",
    // À VÉRIFIER
    price: "plus de 10 millions d'euros",
    races: [
      "Arkéa Ultim Challenge",
      "Route du Rhum",
      "Trophée Jules Verne",
      "Transat Café L'Or (ex-Jacques Vabre)",
    ],
    crew: "En solitaire, en double ou en équipage",
    foils: "Oui : ils volent au-dessus de l'eau",
    pitch:
      "Les géants des mers : des trimarans volants capables de faire le tour du monde en une quarantaine de jours.",
  },
];
