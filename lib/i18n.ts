/**
 * Langues disponibles. Pour ajouter une langue :
 * 1. ajoute son code ici ;
 * 2. duplique le dossier /content/fr en /content/<code> et traduis-le ;
 * 3. référence-le dans /content/index.ts.
 */
export const locales = ["fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Construit un lien interne préfixé par la langue. */
export function href(lang: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moussaillon.vercel.app";
