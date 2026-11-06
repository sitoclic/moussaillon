/**
 * Échelle de Beaufort (chapitre 5).
 * Vitesses et hauteurs de vagues : valeurs de référence de l'Organisation
 * météorologique mondiale (hauteur « probable » de la mer du vent au large).
 * Les textes « pour un skipper » sont des repères pédagogiques.
 */
export type BeaufortLevel = {
  force: number;
  name: string;
  /** Vitesse du vent en nœuds (min – max). */
  knots: [number, number | null];
  /** Hauteur probable des vagues au large, en mètres. */
  waves: string;
  sea: string;
  skipper: string;
};

export const beaufort: BeaufortLevel[] = [
  {
    force: 0,
    name: "Calme",
    knots: [0, 1],
    waves: "0 m",
    sea: "La mer est comme un miroir.",
    skipper:
      "La pétole : le bateau n'avance plus, les voiles pendent. Pour un marin de course, c'est presque pire que la tempête.",
  },
  {
    force: 1,
    name: "Très légère brise",
    knots: [1, 3],
    waves: "0,1 m",
    sea: "Quelques rides en écailles de poisson.",
    skipper:
      "On cherche le moindre souffle. Les voiles légères sortent, et l'on évite de bouger à bord pour ne pas « secouer » le vent des voiles.",
  },
  {
    force: 2,
    name: "Légère brise",
    knots: [4, 6],
    waves: "0,2 m",
    sea: "Vaguelettes courtes, crêtes d'aspect vitreux.",
    skipper: "Le bateau glisse doucement. Idéal pour une balade, frustrant pour une course.",
  },
  {
    force: 3,
    name: "Petite brise",
    knots: [7, 10],
    waves: "0,6 m",
    sea: "Très petites vagues, quelques moutons épars.",
    skipper: "Ça commence à avancer. Un bateau de course moderne va déjà presque aussi vite que le vent.",
  },
  {
    force: 4,
    name: "Jolie brise",
    knots: [11, 16],
    waves: "1 m",
    sea: "Petites vagues, moutons nombreux.",
    skipper: "Le temps rêvé des plaisanciers. Les bateaux de course sont à pleine puissance.",
  },
  {
    force: 5,
    name: "Bonne brise",
    knots: [17, 21],
    waves: "2 m",
    sea: "Vagues modérées et allongées, beaucoup de moutons.",
    skipper: "Il est temps de réduire la voilure. Sur un IMOCA à foils, le bateau commence à taper fort.",
  },
  {
    force: 6,
    name: "Vent frais",
    knots: [22, 27],
    waves: "3 m",
    sea: "Lames qui se forment, crêtes d'écume blanche étendues.",
    skipper: "On parle de « mer formée ». Ris dans la grand-voile, petite voile d'avant : on sécurise tout.",
  },
  {
    force: 7,
    name: "Grand frais",
    knots: [28, 33],
    waves: "4 m",
    sea: "La mer grossit, l'écume est soufflée en traînées.",
    skipper:
      "Le bateau souffre. Le skipper se déplace harnaché, et dort peu : il faut surveiller en permanence.",
  },
  {
    force: 8,
    name: "Coup de vent",
    knots: [34, 40],
    waves: "5,5 m",
    sea: "Lames assez hautes, tourbillons d'embruns arrachés aux crêtes.",
    skipper:
      "Avis de coup de vent. On réduit au maximum, on ralentit volontairement le bateau pour ne pas le casser.",
  },
  {
    force: 9,
    name: "Fort coup de vent",
    knots: [41, 47],
    waves: "7 m",
    sea: "Grosses lames, épaisses traînées d'écume. La visibilité baisse.",
    skipper: "On survit plus qu'on ne court. Toute erreur peut coûter le mât.",
  },
  {
    force: 10,
    name: "Tempête",
    knots: [48, 55],
    waves: "9 m",
    sea: "Très grosses lames à longues crêtes. La mer devient blanche.",
    skipper:
      "Les marins de course cherchent à tout prix à éviter ce genre de système en modifiant leur route.",
  },
  {
    force: 11,
    name: "Violente tempête",
    knots: [56, 63],
    waves: "11,5 m",
    sea: "Lames exceptionnellement hautes, qui peuvent cacher des navires.",
    skipper:
      "Conditions extrêmes, rencontrées parfois dans les mers du Sud. Le bateau est mis à l'abri autant que possible.",
  },
  {
    force: 12,
    name: "Ouragan",
    knots: [64, null],
    waves: "14 m et plus",
    sea: "L'air est plein d'écume et d'embruns. Visibilité presque nulle.",
    skipper: "Aucune course n'envoie volontairement ses marins là-dedans : on fait tout pour être ailleurs.",
  },
];
