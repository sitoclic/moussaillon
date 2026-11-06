import type { QuizQuestion } from "../types";

/**
 * Mini-quiz de fin de chapitre, rangés par slug de chapitre.
 * Le quiz final du cap Horn pioche dans toutes ces questions.
 */
export const quizzes: Record<string, QuizQuestion[]> = {
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
};
