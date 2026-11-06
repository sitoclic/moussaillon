/**
 * Frise chronologique de la course au large (chapitre 9).
 * Chaque événement est daté et vérifiable ; voir A_VERIFIER.md pour la relecture.
 */
export type FriseEvent = {
  year: string;
  title: string;
  text: string;
  kind: "pionnier" | "record" | "sauvetage" | "pionniere" | "course";
};

export const frise: FriseEvent[] = [
  {
    year: "1895-1898",
    kind: "pionnier",
    title: "Joshua Slocum, le premier",
    text: "L'Américain Joshua Slocum réalise le premier tour du monde en solitaire à bord du Spray, un vieux bateau qu'il a lui-même reconstruit. Il raconte son aventure dans un livre devenu culte.",
  },
  {
    year: "1960",
    kind: "course",
    title: "La première transat en solitaire",
    text: "Quelques marins britanniques parient qu'on peut traverser l'Atlantique seul, d'est en ouest. Francis Chichester gagne cette première course, l'ancêtre de The Transat.",
  },
  {
    year: "1964",
    kind: "pionnier",
    title: "Éric Tabarly devient un héros",
    text: "Le Français remporte la transat anglaise à bord de Pen Duick II. Son triomphe déclenche la passion des Français pour la course au large.",
  },
  {
    year: "1968-1969",
    kind: "pionnier",
    title: "Le Golden Globe et Bernard Moitessier",
    text: "Première course autour du monde en solitaire et sans escale. Robin Knox-Johnston est le seul à la terminer, en 312 jours. Bernard Moitessier, peut-être en passe de gagner, renonce et repart vers le Pacifique : il préfère « sauver son âme » plutôt que revenir vers la civilisation.",
  },
  {
    year: "1973",
    kind: "course",
    title: "Le premier tour du monde en équipage",
    text: "Départ de la Whitbread, ancêtre de The Ocean Race : un tour du monde par étapes, en équipage.",
  },
  {
    year: "1978",
    kind: "course",
    title: "La première Route du Rhum",
    text: "De Saint-Malo à Pointe-à-Pitre. Le petit trimaran du Canadien Mike Birch l'emporte avec 98 secondes d'avance sur Michel Malinovsky, après plus de 23 jours de course.",
  },
  {
    year: "1989-1990",
    kind: "course",
    title: "Naissance du Vendée Globe",
    text: "Philippe Jeantot lance un tour du monde en solitaire, sans escale et sans assistance, au départ des Sables-d'Olonne. Titouan Lamazou gagne la première édition en 109 jours.",
  },
  {
    year: "1990",
    kind: "pionniere",
    title: "Florence Arthaud gagne la Route du Rhum",
    text: "Surnommée « la petite fiancée de l'Atlantique », elle devient la première femme à remporter une grande transatlantique en solitaire face aux hommes.",
  },
  {
    year: "1993",
    kind: "record",
    title: "Le premier Trophée Jules Verne",
    text: "Bruno Peyron et son équipage bouclent le tour du monde en moins de 80 jours, comme dans le roman de Jules Verne : 79 jours et 6 heures.",
  },
  {
    year: "1996-1997",
    kind: "sauvetage",
    title: "Les sauvetages des mers du Sud",
    text: "Le Britannique Pete Goss fait demi-tour dans la tempête pour sauver Raphaël Dinelli. La marine australienne récupère Thierry Dubois et Tony Bullimore, resté plusieurs jours sous sa coque retournée. La même édition, Catherine Chabaud devient la première femme à terminer le Vendée Globe.",
  },
  {
    year: "2005",
    kind: "record",
    title: "Ellen MacArthur, en 71 jours",
    text: "La Britannique bat le record du tour du monde en solitaire en multicoque : 71 jours et 14 heures. Quatre ans plus tôt, elle avait terminé deuxième du Vendée Globe.",
  },
  {
    year: "2017",
    kind: "record",
    title: "L'année des records",
    text: "Francis Joyon et son équipage bouclent le tour du monde en moins de 41 jours (Trophée Jules Verne). En fin d'année, François Gabart le fait seul en 42 jours et 16 heures.",
  },
  {
    year: "2020",
    kind: "sauvetage",
    title: "Jean Le Cam sauve Kevin Escoffier",
    text: "En plein Vendée Globe, l'IMOCA de Kevin Escoffier se brise. Jean Le Cam, détourné vers lui, le récupère dans son radeau de survie après des heures de recherches dans la nuit.",
  },
  {
    year: "2024",
    kind: "course",
    title: "Le premier tour du monde en Ultim, en solitaire et en course",
    text: "Charles Caudrelier remporte la première Arkéa Ultim Challenge en 50 jours et 19 heures, sans escale technique.",
  },
  {
    year: "2025",
    kind: "record",
    title: "Charlie Dalin pulvérise le record du Vendée Globe",
    text: "64 jours, 19 heures et 22 minutes : plus de neuf jours de moins que l'ancien record.",
  },
  {
    year: "2026",
    kind: "record",
    title: "Nouveau Trophée Jules Verne",
    text: "Le trimaran Sodebo Ultim 3 de Thomas Coville et son équipage établit un nouveau record : 40 jours, 10 heures et 45 minutes.",
  },
];
