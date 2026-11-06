import type { QuizQuestion } from "../types";

/**
 * Mini-quiz de fin de chapitre, rangés par slug de chapitre.
 * Le quiz final du cap Horn pioche dans toutes ces questions.
 */
export const quizzes: Record<string, QuizQuestion[]> = {
  // Chapitre 1 : Le ponton
  "the-dock": [
    {
      question: "Tu es à bord et tu regardes vers l'avant. Où est tribord ?",
      choices: ["À ta gauche", "À ta droite", "Derrière toi", "Ça dépend du vent"],
      answer: 1,
      explanation:
        "Tribord, c'est toujours à droite quand on regarde vers l'avant. Ça ne dépend ni du vent, ni de l'endroit où tu te tiens.",
    },
    {
      question: "Un bateau file à 10 nœuds. À peu près combien cela fait-il en km/h ?",
      choices: ["10 km/h", "18,5 km/h", "25 km/h", "100 km/h"],
      answer: 1,
      explanation: "Un nœud vaut 1,852 km/h : 10 nœuds font donc environ 18,5 km/h.",
    },
    {
      question: "Comment s'appelle l'arrière du bateau ?",
      choices: ["La proue", "La poupe", "L'étrave", "Le roof"],
      answer: 1,
      explanation:
        "La poupe est l'arrière ; la proue est l'avant (et l'étrave, la pièce tout devant la coque).",
    },
    {
      question: "« Sous le vent », c'est…",
      choices: [
        "Le côté d'où vient le vent",
        "Le côté vers lequel le vent s'en va",
        "Quand il n'y a pas de vent",
        "L'intérieur du bateau",
      ],
      answer: 1,
      explanation:
        "Sous le vent, c'est le côté abrité, où le vent s'en va. Le côté d'où il vient, c'est « au vent ».",
    },
  ],
  "how-sailing-works": [
    {
      question: "Comment une voile fait-elle avancer un bateau qui remonte vers le vent ?",
      choices: [
        "Le vent pousse la voile par derrière",
        "La voile fonctionne comme une aile : elle crée une portance",
        "Le bateau utilise un petit moteur caché",
        "C'est impossible, un voilier ne remonte jamais vers le vent",
      ],
      answer: 1,
      explanation:
        "Bombée comme une aile, la voile crée une force de portance. La quille empêche le bateau de glisser de côté : il ne reste que la poussée vers l'avant.",
    },
    {
      question: "Pourquoi un voilier ne peut-il pas avancer exactement face au vent ?",
      choices: [
        "Parce que c'est interdit par le règlement",
        "Parce que les voiles ne se gonflent plus et faseyent",
        "Parce que la quille bloque",
        "Parce que le bateau gîte trop",
      ],
      answer: 1,
      explanation:
        "Face au vent, dans la « zone morte », les voiles claquent comme des drapeaux. Il faut s'écarter d'environ 40 à 45° et tirer des bords.",
    },
    {
      question: "Quelle allure est souvent la plus rapide pour un voilier de course moderne ?",
      choices: ["Le près", "Le vent arrière", "Le largue ou le grand largue", "La zone morte"],
      answer: 2,
      explanation:
        "Au largue et au grand largue, la voile pousse et aspire à la fois. Vent arrière, elle ne fait que pousser : c'est moins efficace.",
    },
    {
      question: "Quelle est la différence entre un virement de bord et un empannage ?",
      choices: [
        "Aucune, ce sont deux mots pour la même chose",
        "Virement : l'avant passe dans le vent ; empannage : l'arrière passe dans le vent",
        "Virement : on accélère ; empannage : on freine",
        "Virement : en solitaire ; empannage : en équipage",
      ],
      answer: 1,
      explanation:
        "Au virement de bord, l'avant passe face au vent. À l'empannage, c'est l'arrière, et la bôme traverse le bateau d'un coup.",
    },
    {
      question: "Qu'est-ce qui empêche un monocoque de chavirer ?",
      choices: ["Ses voiles", "Le lest placé au bout de la quille", "Son mât", "Le pilote automatique"],
      answer: 1,
      explanation: "Le lest fait contrepoids : plus le bateau penche, plus il le redresse, comme un culbuto.",
    },
  ],
  "imoca-anatomy": [
    {
      question: "Combien mesure la coque d'un IMOCA ?",
      choices: ["6,50 m", "12,19 m", "18,28 m (60 pieds)", "32 m"],
      answer: 2,
      explanation:
        "Un IMOCA mesure 60 pieds, soit 18,28 m. 6,50 m, c'est un Mini, 12,19 m un Class40, et 32 m un Ultim.",
    },
    {
      question: "À quoi sert la quille pendulaire ?",
      choices: [
        "À diriger le bateau",
        "À basculer le lest du côté au vent pour redresser le bateau",
        "À produire de l'électricité",
        "À ranger les voiles",
      ],
      answer: 1,
      explanation:
        "En basculant du côté d'où vient le vent, la quille écarte le lest et redresse le bateau plus efficacement.",
    },
    {
      question: "Que font les foils ?",
      choices: [
        "Ils freinent le bateau dans les vagues",
        "Ils soulèvent une partie de la coque pour réduire le frottement de l'eau",
        "Ils servent d'ancre",
        "Ils stockent l'eau douce",
      ],
      answer: 1,
      explanation:
        "Les foils créent de la portance dans l'eau. La coque frotte moins, et le bateau accélère. Un IMOCA ne vole pas complètement pour autant.",
    },
    {
      question:
        "Comment s'appelle la petite hélice qui produit de l'électricité grâce à la vitesse du bateau ?",
      choices: ["Un winch", "Un hydrogénérateur", "Un safran", "Un vérin"],
      answer: 1,
      explanation:
        "L'hydrogénérateur fonctionne comme une dynamo de vélo : l'eau fait tourner l'hélice, qui entraîne un alternateur.",
    },
    {
      question: "Dans le nom des voiles d'avant J0, J2, J3, que signifie un numéro plus grand ?",
      choices: [
        "Une voile plus grande, pour le petit temps",
        "Une voile plus petite et plus solide, pour le vent fort",
        "Une voile plus récente",
        "Une voile de secours",
      ],
      answer: 1,
      explanation: "Plus le numéro est grand, plus la voile est petite : le J3 sert dans le gros temps.",
    },
  ],
  "racing-classes": [
    {
      question: "Combien de coques a un trimaran ?",
      choices: ["Une", "Deux", "Trois", "Quatre"],
      answer: 2,
      explanation:
        "Un trimaran a une coque centrale et deux flotteurs. Le catamaran en a deux, le monocoque une seule.",
    },
    {
      question: "Que veut dire « monotype » ?",
      choices: [
        "Un bateau mené par une seule personne",
        "Une classe où tous les bateaux sont identiques",
        "Un bateau à une seule voile",
        "Un bateau sans moteur",
      ],
      answer: 1,
      explanation:
        "En monotype, comme le Figaro Beneteau 3, tous les bateaux sortent du même moule : seul le marin fait la différence.",
    },
    {
      question: "Quel est le plus petit bateau de course pour traverser l'Atlantique en solitaire ?",
      choices: ["Le Class40", "Le Mini 6.50", "L'Ocean Fifty", "Le Figaro"],
      answer: 1,
      explanation: "Le Mini 6.50 mesure… 6,50 m. Il dispute la Mini Transat, de la France aux Antilles.",
    },
    {
      question: "Pourquoi un multicoque qui chavire est-il un vrai problème ?",
      choices: [
        "Parce qu'il coule immédiatement",
        "Parce qu'il n'a pas de lest et ne se redresse pas tout seul",
        "Parce que le moteur s'arrête",
        "Ce n'est pas un problème, il se relève",
      ],
      answer: 1,
      explanation:
        "Sans quille lestée, un multicoque retourné reste à l'envers. Le marin doit attendre les secours.",
    },
  ],
  weather: [
    {
      question: "Que trouve-t-on au centre d'un anticyclone ?",
      choices: ["Une tempête", "Très peu de vent", "Des vagues énormes", "Des alizés"],
      answer: 1,
      explanation:
        "Au centre d'un anticyclone, l'air descend doucement : peu de vent, mer calme. Un piège pour les marins de course.",
    },
    {
      question: "Sur une carte météo, des isobares très serrées annoncent…",
      choices: ["Du beau temps", "Du vent fort", "Du brouillard", "Un anticyclone"],
      answer: 1,
      explanation:
        "Comme des courbes de niveau serrées indiquent une pente raide, des isobares serrées indiquent un vent fort.",
    },
    {
      question: "Que mesure l'échelle de Beaufort ?",
      choices: [
        "La hauteur des marées",
        "La force du vent",
        "La température de l'eau",
        "La vitesse du bateau",
      ],
      answer: 1,
      explanation: "Elle classe la force du vent de 0 (calme) à 12 (ouragan), d'après ses effets sur la mer.",
    },
    {
      question: "Pourquoi un routeur conseille-t-il souvent un détour ?",
      choices: [
        "Pour admirer le paysage",
        "Parce qu'une route plus longue mais mieux ventée peut être plus rapide",
        "Pour éviter les autres concurrents",
        "Parce que c'est obligatoire",
      ],
      answer: 1,
      explanation:
        "La vitesse dépend du vent rencontré : un détour par une zone bien ventée fait souvent gagner du temps.",
    },
    {
      question: "Qu'est-ce qu'un grain ?",
      choices: [
        "Un nuage isolé qui apporte une rafale et une averse",
        "Une vague géante",
        "Un courant marin",
        "Un banc de sable",
      ],
      answer: 0,
      explanation:
        "Un grain est un gros nuage sombre : quelques minutes de vent violent et de pluie, puis souvent le calme.",
    },
  ],
  navigation: [
    {
      question: "La latitude indique…",
      choices: [
        "La position à l'est ou à l'ouest de Greenwich",
        "La position au nord ou au sud de l'équateur",
        "L'altitude",
        "La profondeur de l'eau",
      ],
      answer: 1,
      explanation:
        "La latitude va de 0° à l'équateur à 90° aux pôles. La longitude, elle, se mesure depuis Greenwich.",
    },
    {
      question: "À combien de milles nautiques correspond une minute de latitude ?",
      choices: ["0,5 mille", "1 mille", "10 milles", "60 milles"],
      answer: 1,
      explanation:
        "Une minute de latitude vaut un mille : c'est pour ça que le mille nautique mesure 1 852 m.",
    },
    {
      question: "Quelle est la différence entre le cap et la route ?",
      choices: [
        "Aucune",
        "Le cap est la direction où pointe le bateau ; la route, le chemin qu'il suit vraiment",
        "Le cap se mesure en milles, la route en nœuds",
        "Le cap est réservé aux multicoques",
      ],
      answer: 1,
      explanation: "Le courant et le vent peuvent dévier le bateau : la route réelle diffère alors du cap.",
    },
    {
      question: "À quoi sert l'AIS ?",
      choices: [
        "À dessaler l'eau",
        "À voir les navires proches et à être vu d'eux",
        "À mesurer la force du vent",
        "À faire basculer la quille",
      ],
      answer: 1,
      explanation:
        "Chaque navire équipé diffuse sa position, sa vitesse et son cap : on peut ainsi éviter les collisions.",
    },
    {
      question: "Au Vendée Globe, un skipper a-t-il le droit d'être guidé par un routeur à terre ?",
      choices: [
        "Oui, c'est obligatoire",
        "Non, il décide seul de sa route",
        "Seulement la nuit",
        "Seulement dans les mers du Sud",
      ],
      answer: 1,
      explanation: "Au Vendée Globe, le marin est seul : il analyse lui-même la météo et choisit sa route.",
    },
  ],
  "vendee-globe": [
    {
      question: "Que signifie « sans assistance » au Vendée Globe ?",
      choices: [
        "Le marin n'a pas le droit de téléphoner",
        "Aucune aide matérielle extérieure : le marin répare seul avec ce qu'il a à bord",
        "Il n'y a pas de pilote automatique",
        "Le marin n'a pas de carte",
      ],
      answer: 1,
      explanation:
        "Le skipper peut recevoir des conseils, mais aucune pièce ni aucune aide physique. Il répare tout lui-même.",
    },
    {
      question: "Quels sont les trois grands caps du tour du monde ?",
      choices: [
        "Finisterre, Vert et Horn",
        "Bonne-Espérance, Leeuwin et Horn",
        "Leeuwin, Nord et Gris-Nez",
        "Horn, Canaveral et Bonne-Espérance",
      ],
      answer: 1,
      explanation:
        "Bonne-Espérance (Afrique du Sud), Leeuwin (Australie) et le Horn (Amérique du Sud), laissés à gauche par les marins.",
    },
    {
      question: "Qu'est-ce que le Pot-au-Noir ?",
      choices: [
        "Un port de ravitaillement",
        "Une zone près de l'équateur, faite de calmes et d'orages",
        "Le surnom du cap Horn",
        "Une tempête de l'océan Indien",
      ],
      answer: 1,
      explanation: "Là où se rencontrent les alizés des deux hémisphères : calmes plats, grains et orages.",
    },
    {
      question: "Pourquoi existe-t-il une zone d'exclusion autour de l'Antarctique ?",
      choices: [
        "Pour protéger les manchots",
        "Pour tenir les marins éloignés des icebergs",
        "Parce que l'eau y est trop chaude",
        "Pour raccourcir la course",
      ],
      answer: 1,
      explanation:
        "Les icebergs dérivent loin vers le nord : la zone d'exclusion interdit aux marins de descendre trop au sud.",
    },
    {
      question: "Quel est le record du Vendée Globe (2024-2025) ?",
      choices: ["109 jours", "74 jours", "64 jours, 19 heures et 22 minutes", "40 jours"],
      answer: 2,
      explanation: "Charlie Dalin a bouclé le tour du monde en 64 jours, 19 heures et 22 minutes.",
    },
  ],
  "life-on-board": [
    {
      question: "Pourquoi les solitaires dorment-ils par petites siestes ?",
      choices: [
        "Parce que les siestes sont plus reposantes",
        "Parce que le bateau ne doit jamais rester longtemps sans surveillance",
        "Parce que le règlement l'impose",
        "Parce qu'ils n'ont pas de couchette",
      ],
      answer: 1,
      explanation:
        "Un cargo, une saute de vent, une voile qui se déchire : en dormant 20 à 40 minutes, le skipper limite les risques.",
    },
    {
      question: "À quoi sert le dessalinisateur ?",
      choices: [
        "À sécher les vêtements",
        "À transformer l'eau de mer en eau douce",
        "À enlever le sel des voiles",
        "À cuisiner les lyophilisés",
      ],
      answer: 1,
      explanation: "Il pousse l'eau de mer à très haute pression à travers une membrane qui retient le sel.",
    },
    {
      question: "Que mangent surtout les marins en course au large ?",
      choices: [
        "Des plats frais cuisinés chaque jour",
        "Des plats lyophilisés, réhydratés à l'eau chaude",
        "Du poisson pêché en route",
        "Rien, ils jeûnent",
      ],
      answer: 1,
      explanation:
        "Les lyophilisés sont très légers et se conservent longtemps : idéal pour un bateau de course.",
    },
    {
      question: "Pourquoi le harnais est-il si important ?",
      choices: [
        "Pour porter les sacs de voiles",
        "Pour rester attaché au bateau et ne jamais tomber à l'eau",
        "Pour dormir assis",
        "Pour tenir chaud",
      ],
      answer: 1,
      explanation:
        "Un solitaire tombé à l'eau voit son bateau continuer sans lui, guidé par le pilote : le harnais est vital.",
    },
  ],
  legends: [
    {
      question: "Qui a réalisé le premier tour du monde en solitaire, à la fin du XIXe siècle ?",
      choices: ["Éric Tabarly", "Joshua Slocum", "Bernard Moitessier", "Florence Arthaud"],
      answer: 1,
      explanation: "L'Américain Joshua Slocum, à bord du Spray, entre 1895 et 1898.",
    },
    {
      question: "La Route du Rhum relie…",
      choices: [
        "Les Sables-d'Olonne à New York",
        "Saint-Malo à Pointe-à-Pitre (Guadeloupe)",
        "Le Havre à la Martinique",
        "Brest à Brest",
      ],
      answer: 1,
      explanation: "Depuis 1978, tous les quatre ans, en solitaire.",
    },
    {
      question: "Quelle est la différence entre une course et un record comme le Trophée Jules Verne ?",
      choices: [
        "Il n'y en a pas",
        "Un record se tente quand on veut, seul contre le chronomètre",
        "Un record se court toujours en solitaire",
        "Un record est plus court",
      ],
      answer: 1,
      explanation:
        "Pour un record, on attend la bonne fenêtre météo et on s'élance seul contre le temps de référence.",
    },
    {
      question: "Que se passe-t-il quand un concurrent est en détresse ?",
      choices: [
        "Rien, chacun pour soi",
        "Les marins les plus proches sont déroutés pour lui porter secours",
        "La course est annulée",
        "On attend la fin de la course",
      ],
      answer: 1,
      explanation:
        "La solidarité passe avant le classement. Le temps perdu pendant un sauvetage peut ensuite être rendu par le jury.",
    },
    {
      question: "Quel marin a renoncé à gagner le Golden Globe, en 1969, pour continuer vers le Pacifique ?",
      choices: ["Robin Knox-Johnston", "Bernard Moitessier", "Francis Chichester", "Mike Birch"],
      answer: 1,
      explanation:
        "Bernard Moitessier a préféré poursuivre sa route en mer plutôt que de rentrer en Europe pour la victoire.",
    },
  ],
};
