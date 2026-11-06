import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { Moussaillon } from "@/components/mascotte/Moussaillon";
import { Waves } from "@/components/decor/Waves";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Un homme à la mer ! · Moussaillon",
  description: "Cette page est passée par-dessus bord.",
};

/** Page 404 : « Un homme à la mer ! » */
export default function GlobalNotFound() {
  return (
    <html
      lang="fr"
      data-theme="day"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-48 text-center">
          <p className="text-danger font-mono text-xs tracking-[0.3em] uppercase">Erreur 404 · Mayday</p>
          <h1 className="mt-3 font-serif text-[clamp(2.5rem,1.5rem+5vw,5rem)] leading-none font-semibold">
            Un homme à la mer !
          </h1>
          <p className="text-fg/85 mt-5 max-w-lg text-lg leading-relaxed">
            Cette page est passée par-dessus bord. Pas de panique : on lance la bouée, on garde un œil sur
            elle, et on fait demi-tour. C&apos;est exactement ce que font les marins.
          </p>
          <Link
            href="/fr"
            className="bg-accent text-on-accent mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-[0_6px_0_-1px_var(--accent-strong)]"
          >
            Lancer la bouée et revenir au port
          </Link>

          {/* Le moussaillon tombé à l'eau, avec sa bouée */}
          <div aria-hidden className="absolute bottom-10 left-1/2 w-28 -translate-x-1/2">
            <div className="animate-bob relative">
              <Moussaillon mood="wow" wave className="relative z-0 w-full" />
              <svg viewBox="0 0 100 40" className="absolute bottom-[18%] left-0 z-10 w-full">
                <ellipse
                  cx="50"
                  cy="20"
                  rx="46"
                  ry="16"
                  fill="#f7f3ea"
                  stroke="#d64545"
                  strokeWidth="10"
                  strokeDasharray="22 14"
                />
              </svg>
            </div>
          </div>
          <Waves className="absolute inset-x-0 bottom-0 h-28" />
        </main>
      </body>
    </html>
  );
}
