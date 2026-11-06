/**
 * CHIFFRES CLÉS ET RECORDS
 * ------------------------
 * Tous les chiffres « durs » du site sont regroupés ici, avec leur source
 * et la date à laquelle ils ont été vérifiés.
 *
 * Règle : si un chiffre n'est pas confirmé par une source fiable, il porte
 * `statut: "a-verifier"` ET un commentaire // À VÉRIFIER, et il est listé
 * dans A_VERIFIER.md à la racine du projet.
 */

export type Chiffre = {
  /** Ce que mesure le chiffre. */
  libelle: string;
  /** Valeur affichable telle quelle. */
  valeur: string;
  /** Valeur numérique brute, quand elle sert à un calcul. */
  nombre?: number;
  source: { nom: string; url?: string };
  /** Date de vérification (AAAA-MM-JJ). */
  verifieLe: string;
  statut: "verifie" | "a-verifier";
};

export const chiffres = {
  // ——— Unités ———
  noeudKmh: {
    libelle: "1 nœud en km/h",
    valeur: "1,852 km/h",
    nombre: 1.852,
    source: {
      nom: "Définition internationale du mille marin (1 852 m), Bureau international des poids et mesures",
    },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  milleMetres: {
    libelle: "1 mille nautique en mètres",
    valeur: "1 852 m",
    nombre: 1852,
    source: { nom: "Bureau international des poids et mesures (SI, tableau des unités hors SI)" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  piedMetres: {
    libelle: "1 pied en mètres",
    valeur: "0,3048 m",
    nombre: 0.3048,
    source: { nom: "Définition internationale du pied (1959)" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },

  // ——— Bateaux ———
  imocaLongueur: {
    libelle: "Longueur d'un IMOCA",
    valeur: "60 pieds, soit 18,28 m",
    nombre: 18.28,
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  ultimLongueur: {
    libelle: "Longueur maximale d'un Ultim",
    valeur: "32 m",
    nombre: 32,
    source: { nom: "Class Ultim 32/23", url: "https://www.ultim3223.com" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },

  imocaLargeur: {
    libelle: "Largeur maximale de la coque d'un IMOCA",
    valeur: "5,85 m",
    nombre: 5.85,
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org/en/imoca/jauge-imoca" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  imocaTirantAir: {
    libelle: "Tirant d'air maximal d'un IMOCA (hauteur du mât au-dessus de l'eau)",
    valeur: "29 m (bateau au repos, sans gîte)",
    nombre: 29,
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org/en/imoca/jauge-imoca" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  imocaTirantEau: {
    libelle: "Tirant d'eau maximal d'un IMOCA",
    valeur: "4,50 m",
    nombre: 4.5,
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org/en/imoca/jauge-imoca" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  imocaLongueurHorsTout: {
    libelle: "Longueur hors tout maximale d'un IMOCA (avec le bout-dehors)",
    valeur: "20,12 m",
    nombre: 20.12,
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org/en/imoca/jauge-imoca" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  imocaBulbe: {
    libelle: "Masse du bulbe de quille d'un IMOCA",
    valeur: "entre 2,2 et 2,85 tonnes",
    source: { nom: "Classe IMOCA – règles de jauge", url: "https://www.imoca.org/en/imoca/jauge-imoca" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  // À VÉRIFIER : ordres de grandeur cités par la presse, pas de valeur officielle
  imocaVoilure: {
    libelle: "Surface de voilure d'un IMOCA moderne",
    valeur: "environ 260 m² au près et jusqu'à 600 m² au portant",
    source: { nom: "Presse spécialisée (ordre de grandeur, variable selon les bateaux)" },
    verifieLe: "2026-11-06",
    statut: "a-verifier",
  },
  // À VÉRIFIER : estimation de presse
  imocaDeplacement: {
    libelle: "Poids d'un IMOCA de dernière génération",
    valeur: "environ 8 tonnes",
    source: { nom: "Presse spécialisée (estimation)" },
    verifieLe: "2026-11-06",
    statut: "a-verifier",
  },
  record24hEquipageMonocoque: {
    libelle: "Record de distance en 24 h en monocoque (équipage)",
    valeur: "641,13 milles (26,7 nœuds de moyenne) – Team Malizia, The Ocean Race, mai 2023",
    source: { nom: "IMOCA, Giornale della Vela", url: "https://www.imoca.org" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  // À VÉRIFIER : record homologué par le WSSRC (Simon 615,33 milles, puis Lunven ?)
  record24hSolo: {
    libelle: "Record de distance en 24 h en monocoque, en solitaire",
    valeur: "plus de 615 milles (Vendée Globe 2024-2025)",
    source: { nom: "IMOCA, World Sailing Speed Record Council", url: "https://www.imoca.org" },
    verifieLe: "2026-11-06",
    statut: "a-verifier",
  },

  // ——— Records ———
  recordVendeeGlobe: {
    libelle: "Record du Vendée Globe",
    valeur: "64 j 19 h 22 min 49 s – Charlie Dalin, édition 2024-2025 (arrivée le 14 janvier 2025)",
    source: {
      nom: "Résultats officiels du Vendée Globe 2024-2025, repris par la presse (Figaro Nautisme, Yachting World…)",
      url: "https://www.vendeeglobe.org",
    },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  ancienRecordVendeeGlobe: {
    libelle: "Ancien record du Vendée Globe",
    valeur: "74 j 3 h 35 min 46 s – Armel Le Cléac'h, 2016-2017",
    source: { nom: "Vendée Globe", url: "https://www.vendeeglobe.org" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  recordJulesVerne: {
    libelle: "Record du Trophée Jules Verne (tour du monde en équipage)",
    valeur: "40 j 10 h 45 min 50 s – Sodebo Ultim 3 (Thomas Coville et son équipage), janvier 2026",
    source: {
      nom: "Yacht.de, Boat International (janvier 2026)",
      url: "https://www.boatinternational.com/yachts/news/racing-trimaran-sodebo-ultim-3-jules-verne-trophy-record-2026",
    },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
  ancienRecordJulesVerne: {
    libelle: "Ancien record du Trophée Jules Verne",
    valeur: "40 j 23 h 30 min 30 s – IDEC Sport (Francis Joyon et son équipage), janvier 2017",
    source: { nom: "Trophée Jules Verne" },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },

  // ——— Actualité ———
  routeDuRhum2026: {
    libelle: "13e Route du Rhum – Destination Guadeloupe",
    valeur: "Départ de Saint-Malo le dimanche 1er novembre 2026 à 13 h 02, 118 skippers, 6 catégories",
    source: {
      nom: "Figaro Nautisme, bateaux.com, organisateur OC Sport Pen Duick",
      url: "https://www.routedurhum.com",
    },
    verifieLe: "2026-11-06",
    statut: "verifie",
  },
} satisfies Record<string, Chiffre>;
