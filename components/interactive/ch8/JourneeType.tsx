"use client";

import { useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

export type DayEvent = { time: string; title: string; text: string; icon: string };

/** Une journée type à bord, en frise interactive. */
export function JourneeType({ events }: { events: DayEvent[] }) {
  const t = useIX().journee;
  const [i, setI] = useState(0);
  const ev = events[i];

  return (
    <Frame title={t.title} intro={t.intro}>
      <ol className="relative flex snap-x gap-2 overflow-x-auto pb-3" aria-label={t.title}>
        <span aria-hidden className="bg-line absolute top-[1.35rem] right-0 left-0 h-0.5" />
        {events.map((e, k) => (
          <li key={e.time} className="relative snap-start">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-current={k === i ? "true" : undefined}
              className="group flex w-20 flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "relative grid size-11 place-items-center rounded-full border-2 text-lg transition",
                  k === i
                    ? "border-accent-strong bg-accent scale-110"
                    : "border-line bg-surface group-hover:border-fg/40",
                )}
                aria-hidden
              >
                {e.icon}
              </span>
              <span className="font-mono text-xs">{e.time}</span>
              <span className="sr-only">{e.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="bg-bg-deep/60 mt-2 rounded-2xl p-4" aria-live="polite">
        <p className="text-muted font-mono text-xs">{ev.time}</p>
        <p className="font-serif text-xl font-semibold">{ev.title}</p>
        <p className="mt-1 leading-relaxed">{ev.text}</p>
      </div>
      <div className="mt-3 flex justify-between">
        <button
          type="button"
          onClick={() => setI((x) => Math.max(0, x - 1))}
          disabled={i === 0}
          className="text-link text-sm font-semibold disabled:opacity-40"
        >
          ← {t.prev}
        </button>
        <button
          type="button"
          onClick={() => setI((x) => Math.min(events.length - 1, x + 1))}
          disabled={i === events.length - 1}
          className="text-link text-sm font-semibold disabled:opacity-40"
        >
          {t.next} →
        </button>
      </div>
    </Frame>
  );
}
