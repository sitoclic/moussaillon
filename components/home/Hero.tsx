"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Waves } from "@/components/decor/Waves";
import { Sailboat } from "@/components/decor/Sailboat";
import { Moussaillon } from "@/components/mascotte/Moussaillon";
import { buttonClass } from "@/components/ui/Button";
import { useUI } from "@/components/providers/I18nProvider";
import { useProgress } from "@/lib/progress";

/**
 * Accueil immersif : la mer, un voilier qui passe au loin, et un port
 * que l'on quitte en faisant défiler la page.
 */
export function Hero() {
  const ui = useUI();
  const progress = useProgress();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Le port recule, le bateau prend le large, le texte s'efface.
  const harborX = useTransform(scrollYProgress, [0, 0.6], ["0%", "70%"]);
  const harborScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);
  const boatX = useTransform(scrollYProgress, [0, 0.7], ["0vw", "-46vw"]);
  const boatScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.75]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  const still = !!reduce;

  return (
    <section ref={ref} className="relative h-[170vh] sm:h-[190vh]" aria-labelledby="hero-title">
      <div className="sticky top-0 h-dvh overflow-hidden bg-[linear-gradient(180deg,var(--sky-2)_0%,var(--sky-1)_62%)]">
        {/* Soleil ou lune */}
        <div
          aria-hidden
          className="absolute top-[14%] right-[12%] size-20 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,color-mix(in_srgb,var(--accent)_30%,transparent)_60%,transparent_72%)] opacity-80 sm:size-28"
        />

        {/* Coordonnées décoratives */}
        <p
          aria-hidden
          className="text-fg/60 absolute bottom-[36%] left-4 font-mono text-[0.7rem] tracking-[0.2em] sm:left-8"
        >
          46°30′N · 1°47′W
        </p>

        {/* Voilier au loin */}
        <div aria-hidden className="animate-sail-by absolute bottom-[36%] left-0 w-10 opacity-60 sm:w-14">
          <Sailboat hull="var(--ocean-1)" sail="var(--surface)" />
        </div>

        {/* Le port (à droite) : jetée et phare. Le bateau en part vers la gauche. */}
        <motion.div
          aria-hidden
          style={still ? undefined : { x: harborX, scale: harborScale }}
          className="absolute right-0 bottom-[26%] w-[min(46vw,62vh)] max-w-[520px] origin-bottom-right"
        >
          <div className="-scale-x-100">
            <Harbor />
          </div>
        </motion.div>

        {/* La mer */}
        <Waves className="absolute inset-x-0 bottom-0 h-[34%]" />

        {/* Notre bateau, avec le moussaillon à bord */}
        <motion.div
          aria-hidden
          style={still ? undefined : { x: boatX, scale: boatScale }}
          className="absolute right-[24vw] bottom-[22%] w-[min(7rem,18vh)] origin-bottom sm:right-[28vw] sm:w-[min(10rem,22vh)]"
        >
          <div className="animate-bob relative -scale-x-100">
            <Sailboat />
            <Moussaillon wave className="absolute bottom-[14%] left-[56%] w-[22%]" />
          </div>
        </motion.div>

        {/* Titre et accroche */}
        <motion.div
          style={still ? undefined : { opacity: textOpacity, y: textY }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-start px-5 pt-[max(5.5rem,13vh)]"
        >
          <p className="text-ocean-2 night:text-accent font-mono text-xs font-semibold tracking-[0.3em] uppercase">
            {ui.home.kicker}
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-serif text-[clamp(2.8rem,min(8vw,11vh),6.5rem)] leading-[0.95] font-semibold tracking-tight"
          >
            {ui.siteName}
          </h1>
          <p className="text-fg/90 mt-4 max-w-xl font-serif text-[clamp(1.1rem,min(2vw,3vh),1.6rem)] leading-snug italic">
            {ui.tagline}
          </p>
          <div className="mt-[min(2rem,4vh)] flex flex-wrap gap-3">
            <a href="#voyage" className={buttonClass("primary", "text-lg")}>
              {ui.home.cast}
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden
              >
                <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {progress.last && (
              <Link href={progress.last} className={buttonClass("secondary", "bg-surface/70 backdrop-blur")}>
                {ui.home.resume}
              </Link>
            )}
          </div>
        </motion.div>

        <p
          aria-hidden
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-mono text-[0.7rem] tracking-[0.2em] text-[#e6f0f1]/80 uppercase"
        >
          {ui.home.scrollHint} ↓
        </p>
      </div>
    </section>
  );
}

/** Jetée, ponton et phare (dessin original). */
function Harbor() {
  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      {/* Rochers de la jetée */}
      <path d="M0 210 Q40 190 90 196 Q140 186 190 198 Q240 190 300 204 L300 260 L0 260 Z" fill="#5b6b78" />
      <path d="M0 214 Q60 200 120 206 Q190 198 290 210" stroke="#7d8d99" strokeWidth="3" fill="none" />
      {/* Phare */}
      <g transform="translate(200 40)">
        <path d="M14 160 L22 20 L50 20 L58 160 Z" fill="#fffdf8" />
        <path d="M17 120 L55 120 L56.5 140 L15.5 140 Z" fill="#d64545" />
        <path d="M19.5 70 L52.5 70 L53.7 90 L18.3 90 Z" fill="#d64545" />
        <rect x="18" y="2" width="36" height="20" rx="3" fill="#16324f" />
        <rect x="24" y="6" width="24" height="12" rx="2" fill="#f2b705" />
        <path d="M14 0 L36 -14 L58 0 Z" fill="#16324f" />
      </g>
      {/* Ponton en bois */}
      <rect x="290" y="198" width="230" height="10" fill="#8a6a4a" />
      {[300, 350, 400, 450, 500].map((x) => (
        <rect key={x} x={x} y="198" width="7" height="40" fill="#6d5238" />
      ))}
      {/* Bollard */}
      <rect x="470" y="186" width="12" height="14" rx="3" fill="#16324f" />
    </svg>
  );
}
