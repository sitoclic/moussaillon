import type { MDXContent } from "mdx/types";

/**
 * Point d'entrée des contenus français.
 */
export { ui } from "./ui";
export { chapters, getChapter } from "./chapters";
export { glossary, findTerm } from "./glossary";
export { quizzes } from "./quiz";
export { imocaParts } from "./imoca";
export { raceClasses } from "./classes";
export { beaufort } from "./beaufort";

/**
 * Texte de chaque chapitre (MDX), chargé uniquement à la demande.
 * Un chapitre absent de cette liste affiche « en préparation ».
 */
export const chapterBodies: Record<string, () => Promise<{ default: MDXContent }>> = {
  "the-dock": () => import("./chapters/the-dock.mdx"),
  "how-sailing-works": () => import("./chapters/how-sailing-works.mdx"),
  "imoca-anatomy": () => import("./chapters/imoca-anatomy.mdx"),
  "racing-classes": () => import("./chapters/racing-classes.mdx"),
  weather: () => import("./chapters/weather.mdx"),
  navigation: () => import("./chapters/navigation.mdx"),
};
