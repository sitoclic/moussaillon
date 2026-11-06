"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang, useUI } from "@/components/providers/I18nProvider";
import { resetProgress } from "@/lib/progress";
import { Waves } from "@/components/decor/Waves";

/** Pied de page : liens utiles et remise à zéro de la progression. */
export function Footer() {
  const ui = useUI();
  const lang = useLang();
  const [reset, setReset] = useState(false);

  return (
    <footer className="no-print relative mt-24 text-[#e9e2d3]">
      <Waves
        className="relative h-16"
        foam={false}
        layers={[
          { color: "var(--ocean-2)", amplitude: 8, wavelength: 360, baseline: 110, speed: 30, opacity: 0.6 },
          { color: "#0a2238", amplitude: 10, wavelength: 288, baseline: 140, speed: 22 },
        ]}
      />
      <div className="bg-[#0a2238]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl font-semibold text-white">{ui.siteName}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#c9c1b1]">{ui.footer.madeWith}</p>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={`/${lang}`} className="hover:underline">
                {ui.nav.home}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/glossary`} className="hover:underline">
                {ui.nav.glossary}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/about`} className="hover:underline">
                {ui.nav.about}
              </Link>
            </li>
          </ul>
          <div className="text-sm">
            <button
              type="button"
              onClick={() => {
                resetProgress();
                setReset(true);
              }}
              className="rounded-full border border-[#e9e2d3]/40 px-4 py-2 hover:border-[#f2b705]"
            >
              {ui.footer.reset}
            </button>
            <p aria-live="polite" className="mt-2 text-[#c9c1b1]">
              {reset ? ui.footer.resetDone : ""}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
