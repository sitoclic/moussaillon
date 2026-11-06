import type { Locale } from "@/lib/i18n";
import { Terme } from "@/components/ui/Terme";
import { Astuce, ATerre, Bulle } from "@/components/ui/Boxes";
import { interactives } from "./interactives";

/**
 * Composants disponibles dans les fichiers MDX des chapitres.
 *
 * Dans un chapitre, on écrit par exemple :
 *   <Terme>bâbord</Terme>                    → mot relié au glossaire
 *   <Terme id="noeud">nœuds</Terme>          → forme différente du mot
 *   <Bulle type="question">…</Bulle>          → le moussaillon se pose une question
 *   <Bulle>…</Bulle>                          → le conseil du moussaillon
 *   <Astuce title="…">…</Astuce>             → astuce de pro
 *   <ATerre>…</ATerre>                        → comparaison avec la vie à terre
 *   <Wide>…</Wide>                            → bloc pleine largeur (schéma, interaction)
 */
export function getMdxComponents(lang: Locale) {
  return {
    Terme: (p: { id?: string; children: React.ReactNode }) => <Terme lang={lang} {...p} />,
    Astuce: (p: { title?: string; children: React.ReactNode }) => <Astuce lang={lang} {...p} />,
    Bulle: (p: React.ComponentProps<typeof Bulle>) => <Bulle {...p} lang={lang} />,
    ATerre: (p: { children: React.ReactNode }) => <ATerre lang={lang} {...p} />,
    Wide: ({ children }: { children: React.ReactNode }) => <div className="wide">{children}</div>,
    ...interactives,
  };
}
