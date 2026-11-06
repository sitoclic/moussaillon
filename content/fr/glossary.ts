import type { GlossaryEntry } from "../types";

/**
 * Glossaire : source unique des infobulles <Terme> et de la page Glossaire.
 * Chaque définition doit être compréhensible par quelqu'un qui n'a jamais
 * mis le pied sur un bateau.
 */
export const glossary: GlossaryEntry[] = [
  // ——— Le bateau ———
  {
    id: "babord",
    term: "Bâbord",
    theme: "bateau",
    definition:
      "Le côté gauche du bateau, quand on regarde vers l'avant. Il ne change jamais, même si tu te retournes.",
  },
  {
    id: "tribord",
    term: "Tribord",
    theme: "bateau",
    definition: "Le côté droit du bateau, quand on regarde vers l'avant.",
  },
  {
    id: "proue",
    term: "Proue",
    theme: "bateau",
    definition: "L'avant du bateau, la partie qui fend l'eau en premier.",
  },
  { id: "poupe", term: "Poupe", theme: "bateau", definition: "L'arrière du bateau." },
  {
    id: "etrave",
    term: "Étrave",
    theme: "bateau",
    definition:
      "La pièce tout à l'avant de la coque, qui ouvre l'eau. Sur les IMOCA récents, elle est souvent arrondie en « nez de scow ».",
  },
  {
    id: "coque",
    term: "Coque",
    theme: "bateau",
    definition:
      "Le corps du bateau, la partie qui flotte. Un monocoque en a une, un catamaran deux, un trimaran trois.",
  },
  { id: "pont", term: "Pont", theme: "bateau", definition: "Le « toit » de la coque, sur lequel on marche." },
  {
    id: "cockpit",
    term: "Cockpit",
    theme: "bateau",
    definition:
      "L'espace de travail du marin, d'où il barre et manœuvre. Sur un IMOCA, il est souvent protégé, presque fermé.",
  },
  {
    id: "roof",
    term: "Roof",
    theme: "bateau",
    definition:
      "La partie surélevée du pont qui abrite l'intérieur et protège le cockpit des paquets de mer.",
  },
  {
    id: "mat",
    term: "Mât",
    theme: "bateau",
    definition:
      "Le grand poteau vertical qui porte les voiles. Celui d'un IMOCA culmine jusqu'à 29 m au-dessus de l'eau.",
  },
  {
    id: "mat-aile",
    term: "Mât-aile",
    theme: "bateau",
    definition:
      "Un mât au profil d'aile d'avion, qui pivote pour s'orienter dans le vent. On en voit sur les multicoques de course.",
  },
  {
    id: "bome",
    term: "Bôme",
    theme: "bateau",
    definition: "La barre horizontale fixée au mât, qui tient le bas de la grand-voile.",
  },
  {
    id: "etai",
    term: "Étai",
    theme: "bateau",
    definition:
      "Le câble qui relie le haut du mât à l'avant du bateau et l'empêche de tomber vers l'arrière. Les voiles d'avant s'y accrochent.",
  },
  {
    id: "haubans",
    term: "Haubans",
    theme: "bateau",
    definition: "Les câbles qui tiennent le mât sur les côtés.",
  },
  {
    id: "greement",
    term: "Gréement",
    theme: "bateau",
    definition: "L'ensemble mât, câbles, cordages et voiles : tout ce qui sert à utiliser la force du vent.",
  },
  {
    id: "quille",
    term: "Quille",
    theme: "bateau",
    definition:
      "L'aileron lesté sous la coque. Il empêche le bateau de glisser de côté et fait contrepoids pour qu'il ne chavire pas.",
  },
  {
    id: "lest",
    term: "Lest",
    theme: "bateau",
    definition: "Un poids placé bas dans le bateau (souvent au bout de la quille) pour le stabiliser.",
  },
  {
    id: "bulbe",
    term: "Bulbe",
    theme: "bateau",
    definition:
      "La « torpille » de plomb au bout de la quille. Sur un IMOCA, il pèse entre 2,2 et 2,85 tonnes.",
  },
  {
    id: "quille-pendulaire",
    term: "Quille pendulaire",
    theme: "bateau",
    aliases: ["quille basculante"],
    definition:
      "Une quille qui pivote d'un côté à l'autre, comme un balancier. Basculée vers le côté au vent, elle redresse le bateau bien plus efficacement.",
  },
  {
    id: "verin",
    term: "Vérin",
    theme: "bateau",
    definition: "Un piston hydraulique. À bord d'un IMOCA, des vérins font basculer la quille.",
  },
  {
    id: "foil",
    term: "Foil",
    theme: "bateau",
    definition:
      "Une aile immergée qui sort du flanc du bateau. Avec la vitesse, elle crée une force qui soulève la coque et réduit le frottement de l'eau.",
  },
  {
    id: "safran",
    term: "Safran",
    theme: "bateau",
    definition: "La pale immergée à l'arrière qui sert de gouvernail. Un IMOCA en a deux, un de chaque côté.",
  },
  {
    id: "derive",
    term: "Dérive",
    theme: "bateau",
    definition: "Un aileron que l'on peut monter ou descendre, qui empêche le bateau de glisser de côté.",
  },
  {
    id: "ballast",
    term: "Ballast",
    theme: "bateau",
    definition:
      "Un réservoir que l'on remplit d'eau de mer pour alourdir un côté ou un bout du bateau et l'équilibrer.",
  },
  {
    id: "winch",
    term: "Winch",
    theme: "bateau",
    definition:
      "Un treuil en forme de tambour, que l'on tourne avec une manivelle, pour tirer fort sur un cordage.",
  },
  {
    id: "moulin-a-cafe",
    term: "Moulin à café",
    theme: "bateau",
    aliases: ["colonne de winch"],
    definition:
      "Une colonne à deux manivelles, que l'on tourne avec les bras comme un pédalier, pour actionner les winchs avec plus de puissance.",
  },
  {
    id: "pilote-automatique",
    term: "Pilote automatique",
    theme: "bateau",
    aliases: ["pilote"],
    definition:
      "Un ordinateur relié à des capteurs, qui barre le bateau à la place du marin. Indispensable pour dormir en solitaire.",
  },
  {
    id: "hydrogenerateur",
    term: "Hydrogénérateur",
    theme: "bateau",
    definition:
      "Une petite hélice plongée dans l'eau à l'arrière, entraînée par la vitesse du bateau, qui produit de l'électricité.",
  },
  {
    id: "bannette",
    term: "Bannette",
    theme: "bateau",
    definition:
      "La couchette du marin. Sur un bateau de course, c'est souvent un simple siège-baquet ou un pouf.",
  },
  {
    id: "table-a-cartes",
    term: "Table à cartes",
    theme: "bateau",
    definition:
      "Le petit bureau du bord, avec les écrans, l'ordinateur et la radio. C'est là qu'on prépare la route.",
  },
  {
    id: "balcon",
    term: "Balcon",
    theme: "bateau",
    definition: "La rambarde métallique à l'avant (et à l'arrière) du bateau.",
  },
  {
    id: "filieres",
    term: "Filières",
    theme: "bateau",
    definition: "Les câbles tendus autour du pont, comme un garde-corps, pour éviter de tomber à l'eau.",
  },

  // ——— Les voiles ———
  {
    id: "grand-voile",
    term: "Grand-voile",
    theme: "voiles",
    definition: "La voile principale, accrochée au mât et à la bôme, derrière le mât.",
  },
  {
    id: "voile-d-avant",
    term: "Voile d'avant",
    theme: "voiles",
    aliases: ["voiles d'avant"],
    definition: "Toute voile placée devant le mât : foc, génois, gennaker…",
  },
  {
    id: "foc",
    term: "Foc",
    theme: "voiles",
    definition: "Une voile triangulaire d'avant, accrochée à l'étai.",
  },
  {
    id: "gennaker",
    term: "Gennaker",
    theme: "voiles",
    definition:
      "Une grande voile d'avant légère et creuse, à mi-chemin entre le génois et le spi, pour les allures portantes.",
  },
  {
    id: "spi",
    term: "Spi",
    theme: "voiles",
    aliases: ["spinnaker"],
    definition:
      "Une immense voile d'avant ronde et légère, en forme de bulle, utilisée quand le vent vient de l'arrière.",
  },
  {
    id: "j0",
    term: "J0, J2, J3",
    theme: "voiles",
    aliases: ["j2", "j3"],
    definition:
      "Les voiles d'avant d'un IMOCA. Plus le chiffre est grand, plus la voile est petite et faite pour le vent fort : le J0 pour le petit temps, le J3 pour la tempête.",
  },
  {
    id: "penon",
    term: "Penon",
    theme: "voiles",
    aliases: ["penons"],
    definition:
      "Un petit brin de laine ou de tissu collé sur la voile. S'il flotte bien à l'horizontale, l'air glisse correctement : la voile est bien réglée.",
  },
  {
    id: "ris",
    term: "Ris",
    theme: "voiles",
    aliases: ["prendre un ris"],
    definition:
      "Une bande de voile que l'on replie pour réduire sa surface quand le vent forcit. « Prendre un ris », c'est réduire la voilure.",
  },
  {
    id: "ecoute",
    term: "Écoute",
    theme: "voiles",
    definition:
      "Le cordage qui règle l'ouverture d'une voile : on la « borde » (on tire) ou on la « choque » (on relâche).",
  },
  {
    id: "drisse",
    term: "Drisse",
    theme: "voiles",
    definition: "Le cordage qui sert à hisser une voile en haut du mât.",
  },
  {
    id: "border",
    term: "Border",
    theme: "voiles",
    definition: "Tirer sur l'écoute pour rapprocher la voile de l'axe du bateau.",
  },
  {
    id: "choquer",
    term: "Choquer",
    theme: "voiles",
    definition: "Relâcher l'écoute pour laisser la voile s'ouvrir.",
  },
  {
    id: "portance",
    term: "Portance",
    theme: "voiles",
    definition:
      "La force créée par l'air (ou l'eau) qui contourne une aile. C'est elle qui fait voler les avions et avancer les voiliers.",
  },
  {
    id: "voilure",
    term: "Voilure",
    theme: "voiles",
    definition: "L'ensemble des voiles hissées à un moment donné.",
  },

  // ——— Les manœuvres et allures ———
  {
    id: "allure",
    term: "Allure",
    theme: "manoeuvres",
    aliases: ["allures"],
    definition:
      "L'angle entre la direction du bateau et celle du vent. Chaque allure a un nom : près, travers, largue, vent arrière…",
  },
  {
    id: "pres",
    term: "Près",
    theme: "manoeuvres",
    aliases: ["au près"],
    definition:
      "L'allure la plus serrée face au vent, environ 40 à 50° du vent. Le bateau gîte et tape dans les vagues.",
  },
  {
    id: "bon-plein",
    term: "Bon plein",
    theme: "manoeuvres",
    definition: "Une allure un peu plus ouverte que le près, vers 60°. Plus confortable et plus rapide.",
  },
  {
    id: "travers",
    term: "Travers",
    theme: "manoeuvres",
    aliases: ["vent de travers"],
    definition: "Quand le vent arrive à 90°, perpendiculaire au bateau.",
  },
  {
    id: "largue",
    term: "Largue",
    theme: "manoeuvres",
    definition: "Le vent vient de l'arrière, en biais (environ 110 à 135°).",
  },
  {
    id: "grand-largue",
    term: "Grand largue",
    theme: "manoeuvres",
    definition:
      "Le vent vient presque de l'arrière (environ 135 à 160°). Souvent l'allure la plus rapide des bateaux modernes.",
  },
  {
    id: "vent-arriere",
    term: "Vent arrière",
    theme: "manoeuvres",
    definition: "Le vent pousse le bateau exactement par l'arrière.",
  },
  {
    id: "zone-morte",
    term: "Zone morte",
    theme: "manoeuvres",
    aliases: ["vent debout"],
    definition:
      "Le secteur face au vent (environ 40 à 45° de chaque côté) où aucun voilier ne peut avancer : les voiles faseyent.",
  },
  {
    id: "allures-portantes",
    term: "Allures portantes",
    theme: "manoeuvres",
    aliases: ["portant"],
    definition:
      "Toutes les allures où le vent vient de l'arrière du travers : largue, grand largue, vent arrière.",
  },
  {
    id: "virement-de-bord",
    term: "Virement de bord",
    theme: "manoeuvres",
    aliases: ["virer de bord"],
    definition: "Changer de côté en passant l'avant du bateau face au vent.",
  },
  {
    id: "empannage",
    term: "Empannage",
    theme: "manoeuvres",
    aliases: ["empanner"],
    definition:
      "Changer de côté en passant l'arrière du bateau face au vent. La bôme traverse brutalement : attention aux têtes !",
  },
  {
    id: "tirer-des-bords",
    term: "Tirer des bords",
    theme: "manoeuvres",
    aliases: ["louvoyer", "louvoyage"],
    definition: "Avancer en zigzag pour rejoindre un point situé face au vent.",
  },
  {
    id: "amure",
    term: "Amure",
    theme: "manoeuvres",
    aliases: ["babord-amures", "tribord-amures"],
    definition:
      "Le côté par lequel le bateau reçoit le vent. « Tribord amures » : le vent arrive par la droite.",
  },
  {
    id: "gite",
    term: "Gîte",
    theme: "manoeuvres",
    aliases: ["giter"],
    definition: "L'inclinaison du bateau sur le côté, sous la poussée du vent.",
  },
  {
    id: "faseyer",
    term: "Faseyer",
    theme: "manoeuvres",
    definition: "Quand une voile mal orientée claque et ondule comme un drapeau, sans rien produire.",
  },
  {
    id: "barrer",
    term: "Barrer",
    theme: "manoeuvres",
    aliases: ["barre"],
    definition: "Diriger le bateau, avec une barre (un long manche) ou une roue.",
  },
  {
    id: "chavirer",
    term: "Chavirer",
    theme: "manoeuvres",
    aliases: ["chavirage"],
    definition:
      "Se retourner complètement. Un monocoque lesté se redresse presque toujours ; un multicoque, non.",
  },
  { id: "au-vent", term: "Au vent", theme: "manoeuvres", definition: "Le côté d'où vient le vent." },
  {
    id: "sous-le-vent",
    term: "Sous le vent",
    theme: "manoeuvres",
    definition: "Le côté vers lequel le vent s'en va, à l'abri.",
  },
  {
    id: "abattre",
    term: "Abattre",
    theme: "manoeuvres",
    definition: "Tourner pour s'éloigner de la direction du vent.",
  },
  {
    id: "lofer",
    term: "Lofer",
    theme: "manoeuvres",
    definition: "Tourner pour se rapprocher de la direction du vent.",
  },
  {
    id: "matossage",
    term: "Matossage",
    theme: "manoeuvres",
    aliases: ["matosser"],
    definition:
      "Déplacer tout le matériel lourd (sacs de voiles, nourriture…) du côté au vent pour équilibrer le bateau. Un vrai déménagement à chaque virement !",
  },

  // ——— Mer et météo ———
  {
    id: "noeud",
    term: "Nœud",
    theme: "mer-meteo",
    aliases: ["noeuds", "nœuds"],
    definition: "L'unité de vitesse en mer : 1 nœud = 1 mille nautique par heure = 1,852 km/h.",
  },
  {
    id: "mille-nautique",
    term: "Mille nautique",
    theme: "navigation",
    aliases: ["mille", "milles", "milles nautiques"],
    definition:
      "L'unité de distance en mer : 1 852 m. Il correspond à une minute d'arc de latitude sur le globe.",
  },
  {
    id: "beaufort",
    term: "Échelle de Beaufort",
    theme: "mer-meteo",
    aliases: ["force"],
    definition: "Une échelle de 0 à 12 qui classe la force du vent d'après ses effets sur la mer.",
  },
  {
    id: "anticyclone",
    term: "Anticyclone",
    theme: "mer-meteo",
    definition:
      "Une zone de hautes pressions, souvent associée au beau temps et à peu de vent en son centre.",
  },
  {
    id: "depression",
    term: "Dépression",
    theme: "mer-meteo",
    definition: "Une zone de basses pressions, où l'air monte. Elle apporte nuages, pluie et vent fort.",
  },
  {
    id: "isobare",
    term: "Isobare",
    theme: "mer-meteo",
    aliases: ["isobares"],
    definition:
      "Une ligne qui relie les points de même pression sur une carte météo. Serrées, elles annoncent du vent fort.",
  },
  {
    id: "grain",
    term: "Grain",
    theme: "mer-meteo",
    aliases: ["grains"],
    definition:
      "Un nuage d'orage isolé qui apporte une rafale de vent et une averse, souvent violentes mais brèves.",
  },
  {
    id: "alizes",
    term: "Alizés",
    theme: "mer-meteo",
    definition:
      "Des vents réguliers qui soufflent toute l'année d'est en ouest de part et d'autre de l'équateur.",
  },
  {
    id: "pot-au-noir",
    term: "Pot-au-Noir",
    theme: "mer-meteo",
    definition:
      "La zone près de l'équateur où se rencontrent les alizés des deux hémisphères : calmes, orages et grains imprévisibles.",
  },
  {
    id: "rafale",
    term: "Rafale",
    theme: "mer-meteo",
    aliases: ["rafales"],
    definition: "Une brusque augmentation du vent, pendant quelques secondes.",
  },
  {
    id: "houle",
    term: "Houle",
    theme: "mer-meteo",
    definition: "Les grandes ondulations de la mer, nées d'un vent qui souffle (ou a soufflé) au loin.",
  },
  {
    id: "front",
    term: "Front",
    theme: "mer-meteo",
    aliases: ["fronts"],
    definition:
      "La frontière entre une masse d'air chaud et une masse d'air froid, souvent marquée par des nuages, de la pluie et une bascule du vent.",
  },
  {
    id: "vent-apparent",
    term: "Vent apparent",
    theme: "mer-meteo",
    definition:
      "Le vent ressenti à bord : le vent réel combiné au vent créé par la vitesse du bateau. Plus on va vite, plus il semble venir de l'avant.",
  },
  {
    id: "vent-reel",
    term: "Vent réel",
    theme: "mer-meteo",
    definition: "Le vent tel qu'il souffle vraiment, mesuré par un observateur immobile.",
  },

  // ——— Navigation ———
  {
    id: "cap",
    term: "Cap",
    theme: "navigation",
    definition: "La direction vers laquelle pointe l'avant du bateau, en degrés (0° = nord, 90° = est).",
  },
  {
    id: "route",
    term: "Route",
    theme: "navigation",
    definition: "Le chemin réellement suivi, qui peut différer du cap à cause du courant et de la dérive.",
  },
  {
    id: "latitude",
    term: "Latitude",
    theme: "navigation",
    definition: "La position au nord ou au sud de l'équateur, de 0° à 90°.",
  },
  {
    id: "longitude",
    term: "Longitude",
    theme: "navigation",
    definition: "La position à l'est ou à l'ouest du méridien de Greenwich, de 0° à 180°.",
  },
  {
    id: "gps",
    term: "GPS",
    theme: "navigation",
    definition: "Un système de satellites qui donne sa position partout sur Terre, à quelques mètres près.",
  },
  {
    id: "ais",
    term: "AIS",
    theme: "navigation",
    definition:
      "Un système radio par lequel les navires diffusent leur position, leur cap et leur vitesse : on voit les autres sur l'écran, et ils nous voient.",
  },
  {
    id: "routage",
    term: "Routage",
    theme: "navigation",
    aliases: ["routeur"],
    definition:
      "Le calcul de la route la plus rapide en fonction de la météo prévue et des performances du bateau.",
  },
  {
    id: "polaire",
    term: "Polaire",
    theme: "navigation",
    aliases: ["polaires", "courbe polaire"],
    definition:
      "Un graphique qui donne la vitesse d'un bateau pour chaque force et chaque angle de vent. C'est la « fiche technique » de ses performances.",
  },
  {
    id: "ofni",
    term: "OFNI",
    theme: "navigation",
    definition:
      "« Objet flottant non identifié » : conteneur, tronc, filet… Un danger redouté, invisible la nuit.",
  },
  {
    id: "zone-d-exclusion",
    term: "Zone d'exclusion",
    theme: "navigation",
    aliases: ["zone d'exclusion antarctique", "zea"],
    definition:
      "Une zone interdite par l'organisateur de la course, autour de l'Antarctique, pour tenir les marins loin des icebergs.",
  },

  // ——— La course ———
  {
    id: "imoca",
    term: "IMOCA",
    theme: "course",
    definition: "Un monocoque de course de 60 pieds (18,28 m), le bateau du Vendée Globe.",
  },
  {
    id: "ultim",
    term: "Ultim",
    theme: "course",
    definition: "Les plus grands et plus rapides trimarans de course océanique : jusqu'à 32 m de long.",
  },
  {
    id: "class40",
    term: "Class40",
    theme: "course",
    definition: "Un monocoque de course de 40 pieds (12,19 m), plus abordable que l'IMOCA, très disputé.",
  },
  {
    id: "mini-650",
    term: "Mini 6.50",
    theme: "course",
    aliases: ["mini"],
    definition: "Le plus petit bateau de course au large : 6,50 m pour traverser l'Atlantique seul.",
  },
  { id: "monocoque", term: "Monocoque", theme: "course", definition: "Un bateau à une seule coque." },
  {
    id: "multicoque",
    term: "Multicoque",
    theme: "course",
    definition: "Un bateau à plusieurs coques : catamaran (deux) ou trimaran (trois).",
  },
  {
    id: "catamaran",
    term: "Catamaran",
    theme: "course",
    definition: "Un bateau à deux coques reliées par une structure.",
  },
  {
    id: "trimaran",
    term: "Trimaran",
    theme: "course",
    definition: "Un bateau à trois coques : une coque centrale et deux flotteurs.",
  },
  {
    id: "skipper",
    term: "Skipper",
    theme: "course",
    definition: "Le chef de bord. En solitaire, c'est aussi le seul marin à bord !",
  },
  {
    id: "solitaire",
    term: "En solitaire",
    theme: "course",
    aliases: ["solitaire", "solo"],
    definition: "Seul à bord, du départ à l'arrivée.",
  },
  {
    id: "sans-assistance",
    term: "Sans assistance",
    theme: "course",
    definition:
      "Aucune aide matérielle extérieure : le marin répare et se débrouille seul avec ce qu'il a à bord.",
  },
  {
    id: "pied",
    term: "Pied",
    theme: "course",
    aliases: ["pieds"],
    definition:
      "Unité de longueur anglo-saxonne : 30,48 cm. On mesure les bateaux de course en pieds : 60 pieds = 18,28 m.",
  },
  {
    id: "jauge",
    term: "Jauge",
    theme: "course",
    definition: "Le règlement technique d'une classe : dimensions, poids, matériaux autorisés…",
  },

  {
    id: "monotype",
    term: "Monotype",
    theme: "course",
    definition:
      "Une classe où tous les bateaux sont identiques, construits dans le même moule. Seul le talent du marin fait la différence.",
  },
  {
    id: "prototype",
    term: "Prototype",
    theme: "course",
    definition: "Un bateau unique, dessiné sur mesure dans le cadre des règles de sa classe.",
  },
  {
    id: "petole",
    term: "Pétole",
    theme: "mer-meteo",
    definition: "L'absence totale de vent. Le cauchemar des marins de course.",
  },
  // ——— La vie à bord ———
  {
    id: "quart",
    term: "Quart",
    theme: "vie-a-bord",
    aliases: ["quarts"],
    definition:
      "Une période de veille. En équipage, on se relaie par quarts ; en solitaire, le marin est de quart en permanence.",
  },
  {
    id: "lyophilise",
    term: "Lyophilisé",
    theme: "vie-a-bord",
    aliases: ["lyophilisés"],
    definition: "Un plat déshydraté par le froid, très léger, que l'on réhydrate avec de l'eau chaude.",
  },
  {
    id: "dessalinisateur",
    term: "Dessalinisateur",
    theme: "vie-a-bord",
    definition: "Une machine qui transforme l'eau de mer en eau douce, en la filtrant à très haute pression.",
  },
  {
    id: "balise-de-detresse",
    term: "Balise de détresse",
    theme: "vie-a-bord",
    aliases: ["balise", "epirb"],
    definition:
      "Un émetteur qui, une fois déclenché, envoie par satellite la position du marin en danger aux secours.",
  },
  {
    id: "radeau-de-survie",
    term: "Radeau de survie",
    theme: "vie-a-bord",
    aliases: ["radeau"],
    definition: "Un canot gonflable qui se déploie en quelques secondes si le bateau doit être abandonné.",
  },
  {
    id: "harnais",
    term: "Harnais",
    theme: "vie-a-bord",
    aliases: ["longe"],
    definition: "Une sangle portée sur soi et reliée au bateau par une longe, pour ne jamais tomber à l'eau.",
  },
  {
    id: "ciré",
    term: "Ciré",
    theme: "vie-a-bord",
    aliases: ["cire"],
    definition: "La veste imperméable du marin. Historiquement en toile cirée, d'où son nom.",
  },
];

/** Retrouve une entrée par son identifiant, son nom ou un alias. */
export function findTerm(key: string): GlossaryEntry | undefined {
  const k = normalize(key);
  return glossary.find(
    (g) => g.id === k || normalize(g.term) === k || g.aliases?.some((a) => normalize(a) === k),
  );
}

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
