"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { GlossaryEntry, GlossaryTheme } from "@/content/types";
import { cn } from "@/lib/cn";
import { useUI } from "@/components/providers/I18nProvider";

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/œ/g, "oe");

/** Liste du glossaire avec recherche instantanée et filtres par thème. */
export function GlossaryBrowser({ entries }: { entries: GlossaryEntry[] }) {
  const labels = useUI().glossary;
  const themes: Record<GlossaryTheme, string> = labels.themes;
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<GlossaryTheme | "all">("all");
  const q = useDeferredValue(fold(query.trim()));

  const sorted = useMemo(
    () => [...entries].sort((a, b) => fold(a.term).localeCompare(fold(b.term), "fr")),
    [entries],
  );

  const results = sorted.filter(
    (e) =>
      (theme === "all" || e.theme === theme) &&
      (!q ||
        fold(e.term).includes(q) ||
        e.aliases?.some((a) => fold(a).includes(q)) ||
        fold(e.definition).includes(q)),
  );

  // Regroupe par première lettre.
  const groups = new Map<string, GlossaryEntry[]>();
  for (const e of results) {
    const letter = fold(e.term)[0]?.toUpperCase() ?? "#";
    groups.set(letter, [...(groups.get(letter) ?? []), e]);
  }

  return (
    <div>
      <div className="border-line bg-bg/90 sticky top-16 z-20 -mx-5 border-b px-5 py-4 backdrop-blur-md">
        <label htmlFor="glossary-search" className="sr-only">
          {labels.search}
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" strokeLinecap="round" />
          </svg>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            autoComplete="off"
            className="border-line bg-surface focus:border-accent h-12 w-full rounded-full border-2 pr-4 pl-12 text-base outline-none"
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={labels.themesLabel}>
          {(["all", ...Object.keys(themes)] as Array<GlossaryTheme | "all">).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={theme === t}
              onClick={() => setTheme(t)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                theme === t
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line bg-surface hover:border-fg/40",
              )}
            >
              {t === "all" ? labels.all : themes[t]}
            </button>
          ))}
        </div>
        <p className="text-muted mt-2 text-sm" aria-live="polite">
          {labels.results(results.length)}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="text-muted py-16 text-center text-lg">{labels.empty}</p>
      ) : (
        <div className="mt-6 space-y-10">
          {[...groups.entries()].map(([letter, list]) => (
            <section key={letter} aria-labelledby={`lettre-${letter}`}>
              <h2 id={`lettre-${letter}`} className="text-accent-strong font-serif text-4xl font-semibold">
                {letter}
              </h2>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                {list.map((e) => (
                  <div
                    key={e.id}
                    id={e.id}
                    className="border-line bg-surface target:border-accent target:ring-accent/30 scroll-mt-48 rounded-2xl border p-4 target:ring-4"
                  >
                    <dt className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl font-semibold">{e.term}</span>
                      <span className="text-muted shrink-0 font-mono text-[0.65rem] tracking-[0.15em] uppercase">
                        {themes[e.theme]}
                      </span>
                    </dt>
                    <dd className="text-fg/90 mt-1.5 leading-relaxed">{e.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
