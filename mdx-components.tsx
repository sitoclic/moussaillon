import type { MDXComponents } from "mdx/types";

/**
 * Composants MDX globaux (exigé par @next/mdx).
 * Les composants qui dépendent de la langue (<Terme>, <Astuce>…) sont
 * fournis page par page via getMdxComponents(lang).
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
