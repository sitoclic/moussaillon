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
};
