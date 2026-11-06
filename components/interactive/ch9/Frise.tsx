"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FriseEvent } from "@/content/fr/frise";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

const KIND_COLORS: Record<FriseEvent["kind"], string> = {
  pionnier: "#135e8a",
  course: "#c98f00",
  record: "#d64545",
  sauvetage: "#1d9a55",
  pionniere: "#5b4bb7",
};

/** Frise chronologique, filtrable par thème. */
export function Frise({ events }: { events: FriseEvent[] }) {
  const t = useIX().frise;
  const reduce = useReducedMotion();
  const [kind, setKind] = useState<FriseEvent["kind"] | "all">("all");
  const [i, setI] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const shown = events.filter((e) => kind === "all" || e.kind === kind);
  const ev = shown[Math.min(i, shown.length - 1)];

  function select(k: number) {
    setI(k);
    const el = listRef.current?.children[k] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.filter}>
        {(["all", ...Object.keys(KIND_COLORS)] as Array<FriseEvent["kind"] | "all">).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => {
              setKind(k);
              setI(0);
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium",
              kind === k ? "border-fg bg-fg text-bg" : "border-line hover:border-fg/40",
            )}
          >
            {k !== "all" && (
              <span className="size-2.5 rounded-full" style={{ background: KIND_COLORS[k] }} aria-hidden />
            )}
            {t.kinds[k]}
          </button>
        ))}
      </div>

      {/* La frise */}
      <div className="relative mt-5">
        <span aria-hidden className="bg-line absolute top-[2.15rem] right-0 left-0 h-1 rounded-full" />
        <ol ref={listRef} className="relative flex snap-x gap-3 overflow-x-auto px-1 pb-3">
          {shown.map((e, k) => (
            <li key={e.year + e.title} className="snap-center">
              <button
                type="button"
                onClick={() => select(k)}
                aria-current={ev === e ? "true" : undefined}
                className="group flex w-24 flex-col items-center gap-1.5 text-center"
              >
                <span className="font-mono text-xs font-bold">{e.year}</span>
                <span
                  className={cn(
                    "size-5 rounded-full border-4 transition",
                    ev === e ? "scale-125" : "group-hover:scale-110",
                  )}
                  style={{
                    borderColor: KIND_COLORS[e.kind],
                    background: ev === e ? KIND_COLORS[e.kind] : "var(--surface)",
                  }}
                  aria-hidden
                />
                <span
                  className={cn(
                    "line-clamp-2 text-xs leading-tight",
                    ev === e ? "font-semibold" : "text-muted",
                  )}
                >
                  {e.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div aria-live="polite" className="min-h-40">
        <AnimatePresence mode="wait" initial={false}>
          {ev && (
            <motion.article
              key={ev.year + ev.title}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-bg-deep/60 mt-2 rounded-2xl border-l-8 p-4"
              style={{ borderLeftColor: KIND_COLORS[ev.kind] }}
            >
              <p className="font-mono text-sm font-bold" style={{ color: KIND_COLORS[ev.kind] }}>
                {ev.year} · {t.kinds[ev.kind]}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold">{ev.title}</h3>
              <p className="mt-1 leading-relaxed">{ev.text}</p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex justify-between">
        <button
          type="button"
          onClick={() => select(Math.max(0, i - 1))}
          disabled={i === 0}
          className="text-link text-sm font-semibold disabled:opacity-40"
        >
          ← {t.prev}
        </button>
        <button
          type="button"
          onClick={() => select(Math.min(shown.length - 1, i + 1))}
          disabled={i >= shown.length - 1}
          className="text-link text-sm font-semibold disabled:opacity-40"
        >
          {t.next} →
        </button>
      </div>
    </Frame>
  );
}
