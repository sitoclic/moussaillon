"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIX, useLang, useUI } from "@/components/providers/I18nProvider";
import type { ImocaPart } from "@/content/fr/imoca";
import { Frame } from "../Frame";
import { HOTSPOTS, ImocaProfile, ImocaTop } from "./ImocaDrawings";
import { cn } from "@/lib/cn";

type View = "profil" | "dessus" | "ecorche";
const VIEWS: View[] = ["profil", "dessus", "ecorche"];

/**
 * Grand schéma interactif d'un IMOCA : trois vues, des points numérotés,
 * et une fiche pour chaque pièce.
 */
export function AnatomieImoca({ parts }: { parts: ImocaPart[] }) {
  const t = useIX().anatomie;
  const ui = useUI();
  const lang = useLang();
  const reduce = useReducedMotion();
  const [view, setView] = useState<View>("profil");
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const byId = new Map(parts.map((p) => [p.id, p]));
  const spots = Object.entries(HOTSPOTS[view]).filter(([id]) => byId.has(id));
  const numberOf = new Map(parts.map((p, i) => [p.id, i + 1]));
  const part = selected ? byId.get(selected) : undefined;

  function open(id: string) {
    setSelected(id);
    // Sur mobile, la fiche est sous le dessin : on la fait apparaître.
    if (view === "dessus" || window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }),
      );
    }
  }

  function switchView(v: View) {
    setView(v);
    if (selected && !HOTSPOTS[v][selected]) setSelected(null);
  }

  return (
    <Frame title={t.title} intro={t.help}>
      {/* Onglets de vue */}
      <div role="tablist" aria-label={t.title} className="bg-bg-deep flex gap-1 rounded-full p-1">
        {VIEWS.map((v) => (
          <button
            key={v}
            role="tab"
            type="button"
            aria-selected={view === v}
            onClick={() => switchView(v)}
            className={cn(
              "min-h-10 flex-1 rounded-full px-3 text-sm font-semibold transition",
              view === v ? "bg-surface shadow" : "text-muted hover:text-fg",
            )}
          >
            {t.views[v]}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "mt-5 grid gap-6",
          view !== "dessus" && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start",
        )}
      >
        {/* Dessin + points */}
        <div role="tabpanel" aria-label={t.views[view]}>
          <div className={cn("relative mx-auto", view === "dessus" ? "max-w-[720px]" : "max-w-[420px]")}>
            {view === "dessus" ? <ImocaTop /> : <ImocaProfile cutaway={view === "ecorche"} />}
            {/* Traits de rappel vers la pièce exacte */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {spots.map(([id, pos]) =>
                pos.ax !== undefined && pos.ay !== undefined ? (
                  <g key={id}>
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={pos.ax}
                      y2={pos.ay}
                      stroke={selected === id ? "var(--accent-strong)" : "#0b2239"}
                      strokeWidth={selected === id ? 2 : 1}
                      strokeOpacity={selected === id ? 1 : 0.55}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ) : null,
              )}
            </svg>
            {spots.map(([id, pos]) =>
              pos.ax !== undefined && pos.ay !== undefined ? (
                <span
                  key={`dot-${id}`}
                  aria-hidden
                  style={{ left: `${pos.ax}%`, top: `${pos.ay}%` }}
                  className="bg-ink pointer-events-none absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
                />
              ) : null,
            )}
            {spots.map(([id, pos]) => (
              <button
                key={id}
                type="button"
                onClick={() => open(id)}
                aria-label={byId.get(id)!.name}
                aria-pressed={selected === id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className={cn(
                  "absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-mono text-[0.68rem] font-bold shadow-md transition sm:size-8",
                  selected === id
                    ? "border-ink bg-accent text-ink scale-125"
                    : "bg-ink border-white text-white hover:scale-110 hover:bg-[#135e8a]",
                )}
              >
                {numberOf.get(id)}
              </button>
            ))}
          </div>
          {view !== "dessus" && <p className="text-muted mt-2 text-center text-xs">{t.scale}</p>}
        </div>

        {/* Fiche */}
        <div ref={panelRef} className={cn(view !== "dessus" && "lg:sticky lg:top-24")} aria-live="polite">
          <AnimatePresence mode="wait">
            {part ? (
              <motion.article
                key={part.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-bg-deep/60 border-line rounded-2xl border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold">
                    <span className="bg-accent text-on-accent mr-2 inline-grid size-8 place-items-center rounded-full align-middle font-mono text-sm">
                      {numberOf.get(part.id)}
                    </span>
                    {part.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label={t.close}
                    className="hover:bg-fg/5 grid size-9 shrink-0 place-items-center rounded-full"
                  >
                    ✕
                  </button>
                </div>
                <dl className="mt-3 space-y-3 leading-relaxed">
                  <div>
                    <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                      {t.role}
                    </dt>
                    <dd>{part.role}</dd>
                  </div>
                  <div>
                    <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                      {t.how}
                    </dt>
                    <dd>{part.how}</dd>
                  </div>
                  {part.figure && (
                    <div className="bg-ocean-1 rounded-xl p-3 text-[#f3ecdf]">
                      <dt className="text-cire font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                        {t.figure}
                      </dt>
                      <dd className="mt-0.5">{part.figure}</dd>
                    </div>
                  )}
                  {part.anecdote && (
                    <div className="border-accent border-l-4 pl-3">
                      <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                        {t.anecdote}
                      </dt>
                      <dd className="italic">{part.anecdote}</dd>
                    </div>
                  )}
                </dl>
                {part.glossary && (
                  <Link
                    href={`/${lang}/glossary#${part.glossary}`}
                    className="text-link mt-3 inline-block text-sm font-medium underline underline-offset-2"
                  >
                    {ui.term.seeGlossary} →
                  </Link>
                )}
              </motion.article>
            ) : (
              <motion.p
                key="empty"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-line text-muted rounded-2xl border border-dashed p-6 text-center"
              >
                {t.pick}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Liste complète (accès rapide, utile au clavier et sur mobile) */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold">
              {t.allParts} ({parts.length})
            </summary>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {parts.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!HOTSPOTS[view][p.id]) {
                        const v = VIEWS.find((vv) => HOTSPOTS[vv][p.id]) ?? view;
                        setView(v);
                      }
                      open(p.id);
                    }}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium",
                      selected === p.id
                        ? "border-accent bg-accent text-on-accent"
                        : "border-line hover:border-fg/40",
                    )}
                  >
                    {numberOf.get(p.id)}. {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </Frame>
  );
}
