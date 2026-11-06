import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Configuration Next.js de Moussaillon.
 * Site 100 % statique : toutes les pages sont générées au build.
 */
const nextConfig: NextConfig = {
  // Les chapitres sont rédigés en MDX (dans /content/<langue>/chapters).
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    // Page 404 globale (« Un homme à la mer ! »), indépendante de la langue.
    globalNotFound: true,
  },
  // La racine renvoie vers la langue par défaut (le français).
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
