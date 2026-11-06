import type { Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { TermTip } from "./TermTip";

type Props = {
  lang: Locale;
  /** Identifiant du glossaire. Facultatif : par défaut, on cherche le texte affiché. */
  id?: string;
  children: React.ReactNode;
};

/**
 * <Terme> : relie un mot technique au glossaire.
 * Dans un fichier MDX : <Terme>bâbord</Terme> ou <Terme id="noeud">nœuds</Terme>.
 * Seule la définition utilisée est envoyée au navigateur.
 */
export function Terme({ lang, id, children }: Props) {
  const { findTerm } = getContent(lang);
  const key = id ?? (typeof children === "string" ? children : "");
  const entry = findTerm(key);

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Terme] Terme introuvable dans le glossaire : « ${key} »`);
    }
    return <>{children}</>;
  }

  return (
    <TermTip id={entry.id} term={entry.term} definition={entry.definition}>
      {children}
    </TermTip>
  );
}
