"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import { ui as frUI } from "@/content/fr/ui";
import { ix as frIX } from "@/content/fr/interactives";

/**
 * Donne accès aux textes d'interface dans les composants interactifs (client).
 * Ajoute ici les dictionnaires de chaque nouvelle langue.
 */
const dictionaries = { fr: { ui: frUI, ix: frIX } } satisfies Record<
  Locale,
  { ui: typeof frUI; ix: typeof frIX }
>;

const LangContext = createContext<Locale>("fr");

export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Locale {
  return useContext(LangContext);
}

/** Textes de l'interface générale. */
export function useUI() {
  return dictionaries[useContext(LangContext)].ui;
}

/** Textes des composants interactifs. */
export function useIX() {
  return dictionaries[useContext(LangContext)].ix;
}
