"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import { ui as fr } from "@/content/fr/ui";

/**
 * Donne accès aux textes d'interface dans les composants interactifs (client).
 * Ajoute ici le dictionnaire de chaque nouvelle langue.
 */
const dictionaries = { fr } satisfies Record<Locale, typeof fr>;

const LangContext = createContext<Locale>("fr");

export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Locale {
  return useContext(LangContext);
}

export function useUI() {
  return dictionaries[useContext(LangContext)];
}
