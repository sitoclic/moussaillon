/**
 * ENCADRÉ « EN CE MOMENT »
 * ------------------------
 * C'est le seul fichier à modifier pour mettre à jour l'actualité du site.
 * Il s'affiche sur la page d'accueil et à l'escale « Les grandes courses ».
 *
 * Pour le mettre à jour :
 * 1. modifie `updatedAt` (date du jour, format AAAA-MM-JJ) ;
 * 2. modifie, ajoute ou supprime des éléments dans `items` ;
 * 3. lance `npm run build` pour vérifier, puis pousse sur GitHub.
 */

export type NewsItem = {
  /** Petit libellé coloré : « En course », « Prochainement »… */
  tag: string;
  title: string;
  text: string;
  /** Lien officiel facultatif (ouvert dans un nouvel onglet). */
  link?: { label: string; url: string };
};

export const actualites: { updatedAt: string; items: NewsItem[] } = {
  updatedAt: "2026-11-06",
  items: [
    {
      tag: "En course",
      title: "La 13e Route du Rhum – Destination Guadeloupe",
      text: "Partis de Saint-Malo le dimanche 1er novembre 2026 à 13 h 02, 118 skippers en solitaire foncent vers Pointe-à-Pitre, répartis en 6 catégories : Ultim, Ocean Fifty, IMOCA, Class40, Vintage Multi et Vintage Mono.",
      link: { label: "Suivre la course sur le site officiel", url: "https://www.routedurhum.com" },
    },
    {
      tag: "Prochainement",
      title: "The Ocean Race 2027",
      text: "Départ d'Alicante le 17 janvier 2027 pour un tour du monde en équipage et par étapes, entièrement en IMOCA à foils.",
    },
    {
      tag: "Rendez-vous",
      title: "Le prochain Vendée Globe",
      text: "Départ des Sables-d'Olonne en novembre 2028. Le record à battre : 64 jours, 19 heures et 22 minutes.",
    },
  ],
};
