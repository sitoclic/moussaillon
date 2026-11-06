"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLang, useUI } from "@/components/providers/I18nProvider";
import { useProgress } from "@/lib/progress";
import { CompassRose } from "@/components/decor/CompassRose";
import { cn } from "@/lib/cn";

export type MapStop = {
  slug: string;
  number: number;
  stop: string;
  title: string;
  teaser: string;
  minutes: number;
  place: string;
  coords: string;
};

/**
 * La carte nautique du parcours : une route qui serpente d'escale en escale,
 * du ponton au cap Horn. Les escales visitées sont cochées.
 */
export function VoyageMap({ stops }: { stops: MapStop[] }) {
  const ui = useUI();
  const lang = useLang();
  const { visited } = useProgress();
  const reduce = useReducedMotion();
  const count = stops.filter((s) => visited.includes(s.slug)).length;

  return (
    <section
      id="voyage"
      aria-labelledby="voyage-title"
      className="chart-grid relative scroll-mt-16 overflow-hidden py-20 sm:py-28"
    >
      <CompassRose className="text-ocean-2/25 pointer-events-none absolute -top-10 -right-24 w-80 sm:w-[28rem]" />
      <div className="relative mx-auto max-w-5xl px-5">
        <p className="text-muted font-mono text-xs tracking-[0.25em] uppercase">46°30′N → 55°59′S</p>
        <h2 id="voyage-title" className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">
          {ui.home.mapTitle}
        </h2>
        <p className="text-fg/85 mt-4 max-w-2xl text-lg leading-relaxed">{ui.home.mapIntro}</p>

        {/* Progression globale */}
        <div className="mt-6 max-w-md">
          <div className="bg-line h-2.5 overflow-hidden rounded-full" aria-hidden>
            <div
              className="bg-accent h-full rounded-full transition-all duration-700"
              style={{ width: `${(count / stops.length) * 100}%` }}
            />
          </div>
          <p className="text-muted mt-2 text-sm" aria-live="polite">
            {ui.home.progress(count, stops.length)}
          </p>
        </div>

        <ol className="mt-12">
          {stops.map((s, i) => {
            const done = visited.includes(s.slug);
            const right = i % 2 === 1;
            return (
              <li key={s.slug} className="relative grid grid-cols-[3.5rem_1fr] md:grid-cols-[1fr_5rem_1fr]">
                {/* Segment de route qui serpente */}
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-y-0 left-0 h-full w-14 md:left-1/2 md:w-20 md:-translate-x-1/2"
                >
                  <path
                    d={`M50 0 Q ${right ? 90 : 10} 25 50 50 Q ${right ? 10 : 90} 75 50 100`}
                    fill="none"
                    stroke={done ? "var(--accent-strong)" : "var(--ocean-2)"}
                    strokeOpacity={done ? 1 : 0.55}
                    strokeWidth="2.5"
                    strokeDasharray={done ? undefined : "6 6"}
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Bouée de l'escale */}
                <div className="relative z-10 col-start-1 row-start-1 flex items-center justify-center md:col-start-2">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full border-[3px] font-mono text-sm font-bold shadow-sm transition",
                      done
                        ? "border-accent-strong bg-accent text-on-accent"
                        : "border-ocean-2 bg-surface text-ocean-2 night:text-fg",
                    )}
                    aria-hidden
                  >
                    {done ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      s.number
                    )}
                  </span>
                </div>

                {/* Carte de l'escale */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "col-start-2 row-start-1 py-4 pl-2 md:py-6",
                    right ? "md:col-start-3 md:pl-4" : "md:col-start-1 md:pr-4 md:pl-0 md:text-right",
                  )}
                >
                  <Link
                    href={`/${lang}/chapters/${s.slug}`}
                    className="group border-line bg-surface/90 hover:border-accent block rounded-2xl border p-4 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
                  >
                    <p className="text-muted font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                      {s.place} · {s.coords}
                    </p>
                    <h3 className="group-hover:text-link mt-1 font-serif text-2xl font-semibold">
                      <span className="sr-only">
                        {ui.chapter.stop} {s.number} :{" "}
                      </span>
                      {s.stop}
                      {done && <span className="sr-only"> ({ui.home.visited})</span>}
                    </h3>
                    <p className="text-fg/90 mt-0.5 font-medium">{s.title}</p>
                    <p className="text-muted mt-2 text-[0.95rem] leading-relaxed">{s.teaser}</p>
                    <p className="text-muted mt-3 font-mono text-xs">
                      ⏱ {s.minutes} {ui.home.minutes}
                    </p>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
