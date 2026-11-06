/**
 * Fiches des pièces de l'IMOCA (chapitre 3, schéma interactif).
 * Les positions des points sur les dessins sont dans le composant
 * components/interactive/ch3/AnatomieImoca.tsx ; ici, uniquement le texte.
 * Chiffres : voir content/chiffres.ts pour les sources.
 */

export type ImocaPart = {
  id: string;
  name: string;
  /** À quoi ça sert. */
  role: string;
  /** Comment ça marche. */
  how: string;
  /** Un chiffre marquant (facultatif). */
  figure?: string;
  /** Une anecdote (facultative). */
  anecdote?: string;
  /** Identifiant du glossaire, pour le lien « voir dans le glossaire ». */
  glossary?: string;
};

export const imocaParts: ImocaPart[] = [
  {
    id: "coque",
    name: "La coque",
    glossary: "coque",
    role: "C'est le corps du bateau : elle flotte, porte tout le reste et encaisse les chocs des vagues.",
    how: "Elle est construite en sandwich : deux peaux de fibre de carbone collées de part et d'autre d'une âme légère en nid d'abeille. Résultat : très rigide et très légère.",
    figure:
      "18,28 m de long (60 pieds) et 5,85 m de large au maximum : la longueur de 4 voitures, plus de deux places de parking côte à côte.",
    anecdote:
      "À pleine vitesse dans les vagues, la coque retombe parfois de plusieurs mètres : les skippers comparent ça à vivre dans une machine à laver qui tombe dans l'escalier.",
  },
  {
    id: "etrave",
    name: "L'étrave",
    glossary: "etrave",
    role: "C'est la proue, la partie avant de la coque, qui ouvre la vague.",
    how: "Sur les IMOCA récents, l'avant est de plus en plus large et arrondi. Cela évite que le bateau « plante » son nez dans la vague devant lui à grande vitesse.",
    anecdote:
      "Quand l'étrave plante dans une vague, le bateau peut passer de 25 à 10 nœuds en une seconde : le marin est projeté vers l'avant, comme dans un freinage d'urgence.",
  },
  {
    id: "cockpit",
    name: "Le cockpit",
    glossary: "cockpit",
    role: "Le poste de travail du marin : c'est de là qu'il règle les voiles et surveille le bateau.",
    how: "Sur un IMOCA moderne, le cockpit est presque fermé, comme une cabine. Toutes les cordes y reviennent : le marin peut manœuvrer sans aller sur le pont, à l'abri des vagues.",
    anecdote:
      "Certains skippers barrent rarement à la main : ils pilotent depuis l'intérieur, en regardant les écrans et les caméras.",
  },
  {
    id: "roof",
    name: "Le roof (l'abri)",
    glossary: "roof",
    role: "Il protège l'intérieur et le cockpit des paquets de mer.",
    how: "C'est la partie surélevée du pont, avec des hublots. Sur les IMOCA récents, il se prolonge par une « casquette » qui recouvre le cockpit.",
  },
  {
    id: "mat",
    name: "Le mât",
    glossary: "mat",
    role: "Il porte les voiles et transmet leur force au bateau.",
    how: "C'est un tube en carbone tenu par des câbles (l'étai et les haubans). Sur un IMOCA, il est identique pour tous : la règle de la classe impose un mât standard, ce qui limite les coûts.",
    figure:
      "Le sommet du mât culmine jusqu'à 29 m au-dessus de l'eau : la hauteur d'un immeuble de 9 étages.",
  },
  {
    id: "mat-aile",
    name: "Et le mât-aile ?",
    glossary: "mat-aile",
    role: "Sur certains multicoques de course (comme les Ultim), le mât lui-même a un profil d'aile.",
    how: "Il pivote sur sa base pour s'orienter dans le vent et former, avec la grand-voile, une aile plus efficace. Les IMOCA, eux, ont un mât classique, non pivotant.",
  },
  {
    id: "bome",
    name: "La bôme",
    glossary: "bome",
    role: "Elle tient le bas de la grand-voile et permet d'en régler l'ouverture.",
    how: "Elle est articulée au mât. En tirant ou relâchant l'écoute de grand-voile, on la rapproche ou on l'écarte de l'axe du bateau.",
    anecdote:
      "Lors d'un empannage non contrôlé, la bôme traverse le bateau d'un coup : d'où les casques que portent certains équipages.",
  },
  {
    id: "grand-voile",
    name: "La grand-voile",
    glossary: "grand-voile",
    role: "La voile principale, le « moteur » du bateau.",
    how: "Elle est hissée le long du mât. Quand le vent forcit, on la réduit en « prenant des ris » : on replie le bas de la voile pour en diminuer la surface.",
    // À VÉRIFIER : surface de voilure au portant (ordre de grandeur cité par la presse)
    figure:
      "Au portant, un IMOCA peut déployer environ 600 m² de toile au total : plus de deux courts de tennis.",
  },
  {
    id: "voiles-avant",
    name: "Les voiles d'avant",
    glossary: "j0",
    role: "Placées devant le mât, elles s'adaptent à chaque force de vent et à chaque allure.",
    how: "Leurs noms suivent une logique : J vient de l'anglais jib, le foc. Plus le numéro est grand, plus la voile est petite et solide. Le J0 sert par petit temps, le J2 dans la brise, le J3 dans le gros temps. Le gennaker, lui, est une grande voile légère pour le vent qui vient de l'arrière.",
    figure:
      "Le nombre de voiles est limité par la règle de la classe : le marin doit choisir son jeu avant le départ.",
    anecdote:
      "Changer de voile d'avant seul peut prendre une heure d'efforts, de nuit, sur un pont qui bouge dans tous les sens.",
  },
  {
    id: "etai",
    name: "L'étai",
    glossary: "etai",
    role: "Il tient le mât vers l'avant.",
    how: "C'est un câble tendu du haut du mât jusqu'à l'avant du bateau. Les voiles d'avant s'enroulent autour de câbles semblables, ce qui permet de les déployer ou les ranger rapidement.",
  },
  {
    id: "haubans",
    name: "Les haubans",
    glossary: "haubans",
    role: "Ils tiennent le mât sur les côtés.",
    how: "Ces câbles partent du mât et s'attachent sur les bords du bateau. Les barres de flèche, de petits bras horizontaux, les écartent pour mieux tenir le mât.",
    anecdote:
      "Si un hauban casse, le mât peut tomber en quelques secondes : c'est l'une des avaries les plus redoutées.",
  },
  {
    id: "quille",
    name: "La quille pendulaire",
    glossary: "quille-pendulaire",
    role: "C'est le contrepoids qui empêche le bateau de chavirer, et la pièce qui lui permet de porter beaucoup de voile.",
    how: "La quille pivote sous la coque, comme un pendule. Le marin la fait basculer du côté d'où vient le vent : le poids s'écarte, et redresse le bateau bien plus efficacement.",
    figure: "Le tirant d'eau, c'est-à-dire la profondeur sous la surface, peut atteindre 4,50 m.",
    anecdote:
      "La quille et le système qui la fait basculer sont parmi les pièces les plus surveillées : un problème de quille est l'une des pires avaries possibles en course.",
  },
  {
    id: "bulbe",
    name: "Le bulbe",
    glossary: "bulbe",
    role: "Le lest, tout au bout de la quille.",
    how: "C'est une « torpille » de plomb. Placé le plus bas possible, il fait levier pour redresser le bateau, comme un poids tout au bout d'un long bras.",
    figure:
      "Il pèse entre 2,2 et 2,85 tonnes selon la règle de la classe : autant que deux voitures citadines, accrochées à 4,50 m sous l'eau.",
  },
  {
    id: "verins",
    name: "Les vérins de quille",
    glossary: "verin",
    role: "Ils font basculer la quille d'un côté à l'autre.",
    how: "Ce sont des pistons hydrauliques actionnés par une pompe. Le marin commande la bascule depuis le cockpit, à chaque virement de bord.",
    anecdote:
      "Si le vérin lâche, la quille balance librement : le marin doit la bloquer en urgence pour sauver le bateau.",
  },
  {
    id: "foils",
    name: "Les foils",
    glossary: "foil",
    role: "Ces ailes immergées soulèvent le bateau pour réduire le frottement de l'eau.",
    how: "Un foil sort du flanc de la coque, de chaque côté. À partir d'une certaine vitesse, l'eau qui glisse dessus crée une force vers le haut (la même portance que pour une voile). Une grande partie de la coque sort de l'eau.",
    figure:
      "Grâce aux foils, les IMOCA ont dépassé les 600 milles en 24 heures, soit plus de 1 100 km en une journée.",
    anecdote:
      "Les foils sont apparus sur les IMOCA pour le Vendée Globe 2016-2017, et c'est un bateau à foils qui l'a gagné.",
  },
  {
    id: "derives",
    name: "Et les dérives ?",
    glossary: "derive",
    role: "Une dérive empêche le bateau de glisser de côté sous la poussée du vent.",
    how: "Sur les anciens IMOCA, deux dérives droites coulissaient dans la coque. Aujourd'hui, les foils jouent aussi ce rôle : ils remplacent les dérives classiques.",
  },
  {
    id: "safrans",
    name: "Les safrans",
    glossary: "safran",
    role: "Ce sont les gouvernails : ils dirigent le bateau.",
    how: "Un IMOCA en a deux, un de chaque côté de l'arrière : quand le bateau gîte, l'un des deux reste bien dans l'eau. Ils sont reliés à la barre et au pilote automatique.",
    anecdote:
      "Un choc avec un objet flottant peut casser un safran : la plupart des bateaux emportent de quoi réparer, voire un safran de rechange.",
  },
  {
    id: "ballasts",
    name: "Les ballasts",
    glossary: "ballast",
    role: "Ils servent à équilibrer le bateau.",
    how: "Ce sont des réservoirs que le marin remplit d'eau de mer avec une pompe. Une tonne d'eau du côté au vent, et le bateau se redresse ; à l'arrière, et il lève le nez.",
  },
  {
    id: "winchs",
    name: "Les winchs",
    glossary: "winch",
    role: "Ils permettent de tirer très fort sur les cordages.",
    how: "Un winch est un tambour sur lequel on enroule la corde. En tournant une manivelle, on démultiplie sa force, comme avec les vitesses d'un vélo.",
    anecdote:
      "Hisser une grande voile au winch, seul, est un effort comparable à plusieurs minutes de sprint.",
  },
  {
    id: "moulin",
    name: "La colonne de moulin à café",
    glossary: "moulin-a-cafe",
    role: "Elle donne de la puissance aux winchs.",
    how: "C'est une colonne à deux manivelles, que le marin tourne avec les deux bras, debout, comme un pédalier à mains. Elle est reliée aux winchs principaux.",
  },
  {
    id: "pilote",
    name: "Le pilote automatique",
    glossary: "pilote-automatique",
    role: "Il barre le bateau quand le marin dort, mange ou travaille.",
    how: "Un ordinateur reçoit les mesures des capteurs (vent, vitesse, mouvements du bateau) et commande un vérin relié aux safrans. Les plus modernes anticipent même les vagues.",
    figure: "En solitaire, le pilote barre l'immense majorité du temps.",
    anecdote:
      "Les skippers emportent souvent deux pilotes complets : sans pilote, impossible de dormir, donc impossible de finir la course.",
  },
  {
    id: "hydro",
    name: "Les hydrogénérateurs",
    glossary: "hydrogenerateur",
    role: "Ils fabriquent de l'électricité avec la vitesse du bateau.",
    how: "Une petite hélice plongée dans l'eau, à l'arrière, tourne quand le bateau avance et entraîne un alternateur, comme une dynamo de vélo.",
    anecdote:
      "En 2017, le marin néo-zélandais Conrad Colman a bouclé le Vendée Globe sans brûler de carburant pour son énergie : uniquement avec le soleil, le vent et l'eau.",
  },
  {
    id: "solaire",
    name: "Les panneaux solaires",
    role: "Ils rechargent les batteries.",
    how: "Des panneaux souples, collés sur le pont et le roof, transforment la lumière en électricité. Avec les hydrogénérateurs, ils permettent de limiter, voire d'éviter, l'usage du moteur pour l'énergie.",
  },
  {
    id: "moteur",
    name: "Le moteur",
    role: "Il sert à manœuvrer au port, et peut recharger les batteries.",
    // À VÉRIFIER : modalités exactes du scellé moteur selon l'avis de course
    how: "Pendant la course, il est interdit de s'en servir pour avancer : l'hélice est bloquée par un scellé posé par l'organisation. Seule exception : porter secours à un autre marin.",
  },
  {
    id: "electronique",
    name: "L'électronique et les capteurs",
    role: "Mesurer tout, tout le temps : vent, vitesse, cap, efforts dans les cordages…",
    how: "En haut du mât, une girouette et un anémomètre mesurent le vent. D'autres capteurs mesurent les mouvements du bateau et la tension des câbles. Tout arrive sur les écrans et dans le pilote automatique.",
  },
  {
    id: "cameras",
    name: "Les caméras embarquées",
    role: "Partager la course avec le public.",
    how: "Plusieurs caméras fixes filment le pont et l'intérieur. Les images partent par satellite : c'est ainsi que l'on voit les marins en direct, au milieu de l'océan.",
  },
  {
    id: "bannette",
    name: "La bannette",
    glossary: "bannette",
    role: "L'endroit où le marin dort, par tranches de quelques dizaines de minutes.",
    how: "Sur un IMOCA, c'est souvent un siège-baquet ou un pouf, placé près de la table à cartes, pour se relever en une seconde. On l'installe du côté au vent pour aider à équilibrer le bateau.",
  },
  {
    id: "table-a-cartes",
    name: "La table à cartes",
    glossary: "table-a-cartes",
    role: "Le bureau du bord : écrans, ordinateur, radio, communication satellite.",
    how: "C'est là que le marin télécharge la météo, calcule sa route et écrit à la terre. Le papier a presque disparu, remplacé par les écrans.",
  },
  {
    id: "survie",
    name: "La survie : radeau et balise",
    glossary: "radeau-de-survie",
    role: "Sauver le marin si le bateau doit être abandonné.",
    how: "Le radeau de survie se gonfle en quelques secondes. La balise de détresse, une fois déclenchée, envoie la position du marin aux secours par satellite. Le marin porte aussi une petite balise personnelle sur lui.",
    anecdote:
      "En 2020, pendant le Vendée Globe, Kevin Escoffier a vu son bateau se briser au large de l'Afrique du Sud. Réfugié dans son radeau, il a été récupéré dans la nuit par un autre concurrent, Jean Le Cam.",
  },
];
