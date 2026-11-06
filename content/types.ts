/**
 * Types partagés par tous les contenus (toutes langues confondues).
 * Les fichiers de /content/<langue>/ doivent respecter ces formes :
 * TypeScript signale toute faute de frappe au moment du build.
 */

export type GlossaryTheme =
  "bateau" | "voiles" | "manoeuvres" | "mer-meteo" | "navigation" | "course" | "vie-a-bord";

export type GlossaryEntry = {
  /** Identifiant unique, en minuscules sans accents : « babord ». */
  id: string;
  /** Mot tel qu'affiché : « Bâbord ». */
  term: string;
  /** Définition courte (1 à 3 phrases), compréhensible par un débutant. */
  definition: string;
  theme: GlossaryTheme;
  /** Autres écritures qui renvoient vers ce terme (« babord » pour « bâbord »). */
  aliases?: string[];
};

export type QuizQuestion = {
  question: string;
  choices: string[];
  /** Index (à partir de 0) de la bonne réponse dans `choices`. */
  answer: number;
  /** Explication affichée après la réponse. */
  explanation: string;
};

export type ChapterMeta = {
  /** Numéro d'escale, de 1 à 11. */
  number: number;
  /** Identifiant d'URL, en anglais : /fr/chapters/<slug>. */
  slug: string;
  /** Nom de l'escale sur la carte : « Le ponton ». */
  stop: string;
  /** Titre complet du chapitre. */
  title: string;
  /** Une phrase qui donne envie. */
  teaser: string;
  /** Durée de lecture estimée, en minutes. */
  minutes: number;
  /** Lieu réel qui sert de décor à l'escale sur la carte. */
  place: string;
  /** Coordonnées décoratives du lieu. */
  coords: string;
  /** « Ce qu'il faut retenir » : 3 à 5 points. */
  keyPoints: string[];
};

export type ProTipTheme =
  "voiles" | "meteo" | "energie" | "sommeil" | "preparation" | "securite" | "mental" | "navigation";

export type ProTip = {
  id: string;
  title: string;
  /** Recto de la carte : l'accroche. */
  front: string;
  /** Verso : l'explication. */
  back: string;
  theme: ProTipTheme;
  /** Chapitre où l'astuce apparaît, si elle vient d'un chapitre. */
  chapter?: string;
};
