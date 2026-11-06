import type { MDXContent } from "mdx/types";

/**
 * Point d'entrée des contenus français.
 */
export { ui } from "./ui";
export { chapters, getChapter } from "./chapters";
export { glossary, findTerm } from "./glossary";
export { quizzes } from "./quiz";

/**
 * Texte de chaque chapitre (MDX), chargé uniquement à la demande.
 * Un chapitre absent de cette liste affiche « en préparation ».
 */
export const chapterBodies: Record<string, () => Promise<{ default: MDXContent }>> = {
  "the-dock": () => import("./chapters/the-dock.mdx"),
};
