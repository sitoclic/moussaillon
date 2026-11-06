/**
 * Les étapes de la route du Vendée Globe (chapitre 7, carte interactive).
 * Positions : [longitude, latitude], approximatives. Les longitudes sont
 * « déroulées » vers l'est (au-delà de 180°) pour tracer un tour complet.
 */
export type VgStep = {
  id: string;
  name: string;
  pos: [number, number];
  coords: string;
  what: string;
  weather: string;
  traps: string;
  anecdote: string;
};

export const vgSteps: VgStep[] = [
  {
    id: "depart",
    name: "Les Sables-d'Olonne",
    pos: [-1.8, 46.5],
    coords: "46°30′ N · 1°47′ O",
    what: "Le départ, en novembre, tous les quatre ans. Des centaines de milliers de spectateurs se pressent le long du chenal pour saluer les marins. Il n'y aura plus personne pour les aider jusqu'à l'arrivée.",
    weather: "Automne en Atlantique Nord : les dépressions se succèdent.",
    traps: "Le stress du départ, la fatigue accumulée pendant les préparatifs, et une flotte très groupée.",
    anecdote:
      "La descente du chenal des Sables, sous les acclamations, est l'un des moments les plus émouvants de la course : beaucoup de skippers la racontent les larmes aux yeux.",
  },
  {
    id: "gascogne",
    name: "Le golfe de Gascogne et le cap Finisterre",
    pos: [-10, 43],
    coords: "43° N · 10° O",
    what: "Les premiers jours : il faut sortir du golfe de Gascogne et doubler le cap Finisterre, à la pointe nord-ouest de l'Espagne.",
    weather: "Le golfe est réputé pour ses coups de vent d'automne et sa mer courte et cassante.",
    traps:
      "La casse précoce, et les cargos : au large du Finisterre passe l'une des routes maritimes les plus fréquentées du monde.",
    anecdote:
      "Plusieurs éditions ont vu des abandons dès la première semaine, dans les tempêtes du golfe : finir le Vendée Globe commence par survivre à ses premiers jours.",
  },
  {
    id: "alizes",
    name: "Les alizés",
    pos: [-22, 22],
    coords: "22° N · 22° O",
    what: "Au large des Canaries et du Cap-Vert, les alizés poussent les bateaux vers le sud. C'est une longue glissade à grande vitesse.",
    weather: "Vent d'est à nord-est régulier, soleil, chaleur qui monte.",
    traps: "Les grains, et la tentation de pousser trop fort un bateau qui doit encore tenir deux mois.",
    anecdote:
      "C'est souvent ici que les marins trouvent enfin leur rythme de sommeil et de vie à bord, après la tension des premiers jours.",
  },
  {
    id: "pot-au-noir",
    name: "Le Pot-au-Noir",
    pos: [-27, 5],
    coords: "5° N · 27° O",
    what: "Juste au nord de l'équateur, les alizés des deux hémisphères se rencontrent. C'est le redouté Pot-au-Noir.",
    weather: "Calmes plats, orages, grains violents, pluies diluviennes, chaleur étouffante.",
    traps:
      "Rester englué sans vent pendant que le voisin, à quelques milles, passe avec une brise. Une loterie qui peut redistribuer le classement.",
    anecdote:
      "Les marins le traversent en le « coupant » au plus étroit, en étudiant les images satellites. Le passage de l'équateur, juste après, se fête souvent avec une petite offrande à Neptune.",
  },
  {
    id: "sainte-helene",
    name: "L'anticyclone de Sainte-Hélène",
    pos: [-30, -20],
    coords: "20° S · 30° O",
    what: "Dans l'Atlantique Sud, un grand anticyclone barre la route directe. Il faut le contourner par l'ouest, en longeant presque le Brésil.",
    weather: "Au centre : très peu de vent. Sur son bord : un vent régulier.",
    traps: "Couper trop près du centre et tomber dans la pétole.",
    anecdote:
      "L'anticyclone porte le nom de l'île de Sainte-Hélène, où Napoléon a vécu en exil jusqu'à sa mort, en 1821.",
  },
  {
    id: "bonne-esperance",
    name: "Le cap de Bonne-Espérance",
    pos: [18.5, -40],
    coords: "35° S · 18° E (passage plus au sud)",
    what: "Le premier des trois grands caps, à la pointe sud de l'Afrique. Les marins le laissent loin sur leur gauche et entrent dans l'océan Indien.",
    weather:
      "Les grandes dépressions des mers du Sud prennent le relais : vent fort, mer qui se creuse, froid qui arrive.",
    traps: "Les vagues croisées, quand la houle du sud rencontre le courant des Aiguilles.",
    anecdote:
      "Le navigateur portugais Bartolomeu Dias, premier à le doubler en 1488, l'avait baptisé « cap des Tempêtes ». C'est le roi du Portugal qui l'aurait renommé, avec plus d'optimisme, « Bonne-Espérance ».",
  },
  {
    id: "quarantiemes",
    name: "Les 40e Rugissants et les 50e Hurlants",
    pos: [70, -48],
    coords: "48° S · 70° E",
    what: "Le cœur des mers du Sud. Aucune terre ne freine le vent, qui fait le tour de la planète. Les marins y passent plusieurs semaines.",
    weather:
      "Dépressions à la chaîne, vents de 30 à 50 nœuds, vagues immenses, froid, humidité, nuit longue.",
    traps: "Les icebergs (d'où la zone d'exclusion), la casse, et l'épuisement.",
    anecdote:
      "En 2020, l'IMOCA de Kevin Escoffier s'est plié en deux au sud-ouest du cap de Bonne-Espérance. Jean Le Cam, dérouté, l'a récupéré dans son radeau de survie, en pleine nuit.",
  },
  {
    id: "leeuwin",
    name: "Le cap Leeuwin",
    pos: [115, -44],
    coords: "34° S · 115° E (passage plus au sud)",
    what: "Le deuxième grand cap, au sud-ouest de l'Australie. La moitié de l'océan Indien est derrière.",
    weather: "Toujours les mers du Sud : froid, gros temps, peu de répit.",
    traps: "L'usure : le bateau et le marin commencent à fatiguer sérieusement.",
    anecdote:
      "Lors de l'édition 1996-1997, plusieurs marins ont chaviré dans cette zone. Le Britannique Pete Goss a fait demi-tour contre la tempête pour secourir le Français Raphaël Dinelli, et la marine australienne a récupéré Tony Bullimore, resté plusieurs jours sous sa coque retournée.",
  },
  {
    id: "pacifique",
    name: "Le Pacifique Sud",
    pos: [170, -50],
    coords: "50° S · 170° E",
    what: "Après la Nouvelle-Zélande commence le plus grand océan du monde. Des milliers de milles sans aucune terre.",
    weather: "Longues houles, dépressions puissantes, parfois des journées entières dans le brouillard.",
    traps: "L'isolement : en cas de problème, les secours sont à plusieurs jours de navigation.",
    anecdote:
      "Lors de l'édition 2000-2001, Yves Parlier, démâté, s'est abrité au sud de la Nouvelle-Zélande pour reconstruire un mât de fortune avec les moyens du bord. Il a même mangé des algues pour compléter ses rations… et il a terminé la course.",
  },
  {
    id: "nemo",
    name: "Le point Nemo",
    pos: [236.6, -48.9],
    coords: "48°53′ S · 123°24′ O",
    what: "Le point de l'océan le plus éloigné de toute terre : plus de 2 600 km jusqu'à la côte la plus proche.",
    weather: "Les mers du Sud, toujours.",
    traps: "Le moral : c'est le milieu de nulle part, au sens propre.",
    anecdote:
      "Ici, les humains les plus proches du marin sont souvent… les astronautes de la Station spatiale internationale, quand elle passe à environ 400 km au-dessus de sa tête.",
  },
  {
    id: "horn",
    name: "Le cap Horn",
    pos: [292.7, -56],
    coords: "55°59′ S · 67°16′ O",
    what: "Le troisième et le plus mythique des grands caps, à la pointe de l'Amérique du Sud. Le passer, c'est quitter les mers du Sud.",
    weather: "Le vent s'accélère entre l'Antarctique et les Andes. La mer peut y être terrible.",
    traps:
      "Le dernier coup de vent des mers du Sud, souvent violent, et le plateau continental où la mer se creuse.",
    anecdote:
      "Une vieille tradition dit qu'un cap-hornier a le droit de porter un anneau d'or à l'oreille et de mettre un pied sur la table. Les skippers du Vendée Globe ne s'en privent pas !",
  },
  {
    id: "remontee",
    name: "La remontée de l'Atlantique",
    pos: [320, -25],
    coords: "25° S · 40° O",
    what: "Il reste environ un mois de course : remonter tout l'Atlantique, retraverser le Pot-au-Noir et les alizés, cette fois face à eux.",
    weather: "Le retour de la chaleur, puis du froid de l'hiver européen à l'approche de l'arrivée.",
    traps: "Les avaries accumulées, l'épuisement, et des duels serrés jusqu'au bout.",
    anecdote:
      "En 2024-2025, Charlie Dalin et Yoann Richomme ont joué au chat et à la souris pendant des semaines : à l'arrivée, ils n'étaient séparés que d'une douzaine d'heures après plus de deux mois de course.",
  },
  {
    id: "arrivee",
    name: "L'arrivée aux Sables-d'Olonne",
    pos: [358.2, 46.5],
    coords: "46°30′ N · 1°47′ O",
    what: "La boucle est bouclée : environ 24 000 milles théoriques, beaucoup plus en réalité, à cause des détours. Le chenal est de nouveau noir de monde.",
    weather: "L'hiver en Atlantique Nord : les dernières dépressions.",
    traps: "Le relâchement : une avarie de dernière minute est toujours possible.",
    anecdote:
      "Charlie Dalin a établi le record en 2025 : 64 jours, 19 heures et 22 minutes. Le premier vainqueur, Titouan Lamazou, avait mis 109 jours en 1990.",
  },
];
