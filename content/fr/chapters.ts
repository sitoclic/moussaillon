import type { ChapterMeta } from "../types";

/**
 * Les 11 escales du parcours, dans l'ordre.
 * Le texte de chaque chapitre est dans /content/fr/chapters/<slug>.mdx.
 * Les « coordonnées » sont décoratives : elles situent un lieu réel
 * de la route du Vendée Globe qui sert de décor à l'escale.
 */
export const chapters: ChapterMeta[] = [
  {
    number: 1,
    slug: "the-dock",
    stop: "Le ponton",
    title: "Le ponton : premiers mots de marin",
    teaser: "Bâbord, tribord, nœuds et milles : le petit lexique qui ouvre toutes les portes.",
    minutes: 6,
    place: "Les Sables-d'Olonne",
    coords: "46°30′N 1°47′W",
    keyPoints: [
      "Bâbord est à gauche et tribord à droite, quand on regarde vers l'avant du bateau.",
      "L'avant s'appelle la proue, l'arrière la poupe.",
      "« Au vent », c'est le côté d'où vient le vent ; « sous le vent », le côté où il s'en va.",
      "Un mille nautique mesure 1 852 m, et un nœud, c'est un mille par heure (environ 1,85 km/h).",
    ],
  },
  {
    number: 2,
    slug: "how-sailing-works",
    stop: "Le golfe",
    title: "Comment avance un voilier ?",
    teaser: "Une voile, c'est une aile d'avion posée sur la tranche. Et ça change tout.",
    minutes: 9,
    place: "Golfe de Gascogne",
    coords: "45°30′N 4°00′W",
    keyPoints: [
      "Une voile fonctionne comme une aile : l'air qui la contourne crée une force qui « aspire » le bateau.",
      "Un voilier peut remonter vers le vent, mais jamais tout droit : il lui reste une zone morte d'environ 40 à 45° de chaque côté.",
      "Les allures, du près au vent arrière, décrivent l'angle entre le bateau et le vent.",
      "La quille lestée fait contrepoids : plus le bateau penche, plus elle le redresse.",
      "Une polaire indique la vitesse d'un bateau selon la force et l'angle du vent.",
    ],
  },
  {
    number: 3,
    slug: "imoca-anatomy",
    stop: "Le chantier",
    title: "Anatomie d'un bateau de course",
    teaser: "On démonte un IMOCA, pièce par pièce, de la pointe du mât au bulbe de quille.",
    minutes: 10,
    place: "Lorient",
    coords: "47°45′N 3°22′W",
    keyPoints: [
      "Un IMOCA mesure 60 pieds, soit 18,28 m, et se mène en solitaire.",
      "La quille pendulaire bascule sur le côté pour redresser le bateau.",
      "Les foils soulèvent une partie de la coque pour réduire la traînée.",
      "Tout à bord est pensé pour un marin seul : manœuvres ramenées au cockpit, pilote automatique, énergie autonome.",
    ],
  },
  {
    number: 4,
    slug: "racing-classes",
    stop: "Le port de course",
    title: "La grande famille des bateaux de course",
    teaser: "Du Mini de 6,50 m au trimaran géant de 32 m : à chaque bateau sa course.",
    minutes: 8,
    place: "Madère",
    coords: "32°39′N 16°55′W",
    keyPoints: [
      "Monocoque : une coque ; catamaran : deux ; trimaran : trois.",
      "Chaque « classe » impose des règles qui rendent les bateaux comparables.",
      "Le parcours classique d'un skipper : Mini, puis Figaro, puis Class40, puis IMOCA ou Ultim.",
    ],
  },
  {
    number: 5,
    slug: "weather",
    stop: "Les alizés",
    title: "Lire le ciel et la mer : la météo",
    teaser: "Anticyclones, dépressions et grains : apprends à lire le ciel comme un skipper.",
    minutes: 10,
    place: "Canaries",
    coords: "28°06′N 15°25′W",
    keyPoints: [
      "Le vent souffle des hautes pressions vers les basses pressions, en tournant à cause de la rotation de la Terre.",
      "L'échelle de Beaufort classe le vent de 0 (calme) à 12 (ouragan).",
      "Plus les isobares sont serrées sur une carte, plus le vent est fort.",
      "Le routage consiste à chercher la route la plus rapide, rarement la plus courte.",
    ],
  },
  {
    number: 6,
    slug: "navigation",
    stop: "Le cap-vert",
    title: "Naviguer : savoir où l'on est et où l'on va",
    teaser: "Latitude, longitude, GPS et AIS : comment ne pas se perdre sur une planète bleue.",
    minutes: 8,
    place: "Cap-Vert",
    coords: "16°00′N 24°00′W",
    keyPoints: [
      "La latitude situe au nord ou au sud de l'équateur, la longitude à l'est ou à l'ouest de Greenwich.",
      "Le cap est la direction vers laquelle pointe le bateau ; la route, celle qu'il suit vraiment.",
      "L'AIS permet de voir les navires proches et d'être vu par eux.",
      "Les courses fixent des zones interdites pour éloigner la flotte des glaces.",
    ],
  },
  {
    number: 7,
    slug: "vendee-globe",
    stop: "Le Pot-au-Noir",
    title: "Le tour du monde : le Vendée Globe",
    teaser: "Trois caps, deux océans glacés, zéro escale : la course la plus folle du monde.",
    minutes: 10,
    place: "Pot-au-Noir",
    coords: "04°00′N 27°00′W",
    keyPoints: [
      "Le Vendée Globe est un tour du monde en solitaire, sans escale et sans assistance.",
      "Il part des Sables-d'Olonne tous les quatre ans.",
      "Les marins laissent les trois grands caps (Bonne-Espérance, Leeuwin, Horn) à gauche.",
      "Le record appartient à Charlie Dalin : 64 jours, 19 heures et 22 minutes (2024-2025).",
    ],
  },
  {
    number: 8,
    slug: "life-on-board",
    stop: "Sainte-Hélène",
    title: "La vie à bord",
    teaser:
      "Dormir 20 minutes, manger lyophilisé, réparer seul : bienvenue dans le quotidien d'un solitaire.",
    minutes: 9,
    place: "Sainte-Hélène",
    coords: "15°56′S 5°43′W",
    keyPoints: [
      "Les solitaires dorment par siestes courtes, souvent de 20 à 40 minutes.",
      "À bord d'un IMOCA, on mange surtout des plats lyophilisés et on produit son eau douce.",
      "Savoir réparer est aussi important que savoir naviguer.",
    ],
  },
  {
    number: 9,
    slug: "legends",
    stop: "Bonne-Espérance",
    title: "Les grandes courses et leurs légendes",
    teaser: "De Slocum à Dalin, un siècle et demi d'aventures, de records et de sauvetages.",
    minutes: 9,
    place: "Cap de Bonne-Espérance",
    coords: "34°21′S 18°28′E",
    keyPoints: [
      "Chaque grande course a son rythme, son parcours et ses classes de bateaux.",
      "Joshua Slocum réalise le premier tour du monde en solitaire à la fin du XIXe siècle.",
      "La course au large est aussi une histoire de solidarité : les marins se portent secours entre eux.",
    ],
  },
  {
    number: 10,
    slug: "pro-tips",
    stop: "Point Nemo",
    title: "Les astuces de pro",
    teaser: "Toutes les ficelles des skippers, réunies sur des cartes à retourner.",
    minutes: 7,
    place: "Point Nemo",
    coords: "48°53′S 123°24′W",
    keyPoints: [
      "Les penons, ces petits fils sur la voile, disent si elle est bien réglée.",
      "Un bon skipper anticipe : grain, sommeil, énergie, tout se prépare avant.",
      "Le mental se travaille comme le reste, avec des routines.",
    ],
  },
  {
    number: 11,
    slug: "cape-horn",
    stop: "Le cap Horn",
    title: "Le cap Horn : quiz final et diplôme",
    teaser: "Vingt questions pour passer le cap. À la clé : ton diplôme de marin.",
    minutes: 8,
    place: "Cap Horn",
    coords: "55°59′S 67°16′W",
    keyPoints: [],
  },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}
