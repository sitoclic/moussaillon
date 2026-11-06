import type { Locale } from "@/lib/i18n";
import * as fr from "./fr";

/**
 * Registre des contenus par langue.
 * Pour ajouter une langue : `import * as en from "./en"` puis l'ajouter ici.
 */
const registry = { fr } satisfies Record<Locale, typeof fr>;

export function getContent(lang: Locale) {
  return registry[lang];
}

export type Content = typeof fr;
