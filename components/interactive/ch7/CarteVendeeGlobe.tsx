"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { VgStep } from "@/content/fr/vendee-globe";
import { useIX } from "@/components/providers/I18nProvider";
import { WorldMap } from "@/components/decor/WorldMap";
import { project, WORLD_W } from "@/lib/world";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Points intermédiaires pour dessiner une route réaliste entre les étapes. */
const EXTRA: Record<string, Array<[number, number]>> = {
  "sainte-helene": [[-12, -36]],
  horn: [[300, -50]],
  remontee: [
    [330, 2],
    [334, 25],
    [348, 42],
  ],
};

/** Zone d'exclusion antarctique, très simplifiée. */
const ZEA: Array<[number, number]> = [
  [10, -46],
  [60, -47],
  [110, -48],
  [160, -53],
  [210, -58],
  [260, -60],
  [290, -59],
];

const toPath = (pts: Array<[number, number]>) =>
  pts.map(([lon, lat], i) => `${i ? "L" : "M"}${project(lon, lat).join(" ")}`).join(" ");

/** Carte du Vendée Globe : on suit la route, étape par étape. */
export function CarteVendeeGlobe({ steps }: { steps: VgStep[] }) {
  const t = useIX().vendeeGlobe;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const step = steps[i];

  // Route complète : étapes + points intermédiaires.
  const route: Array<[number, number]> = [];
  const stepIndexInRoute: number[] = [];
  steps.forEach((s, k) => {
    if (k > 0) route.push(...(EXTRA[s.id] ?? []));
    stepIndexInRoute.push(route.length);
    route.push(s.pos);
  });
  const done = route.slice(0, stepIndexInRoute[i] + 1);
  const todo = route.slice(stepIndexInRoute[i]);
  const [bx, by] = project(step.pos[0], step.pos[1]);

  const running = playing && i < steps.length - 1;
  useEffect(() => {
    if (!running) return;
    timer.current = window.setTimeout(() => setI((x) => x + 1), 2600);
    return () => window.clearTimeout(timer.current);
  }, [running, i]);

  // Tout le tracé, dessiné deux fois pour « boucler » autour du globe.
  const overlay = (
    <>
      <path
        d={toPath(ZEA)}
        fill="none"
        stroke="#d64545"
        strokeWidth="1.2"
        strokeDasharray="5 4"
        opacity="0.8"
      />
      <path
        d={toPath(todo)}
        fill="none"
        stroke="var(--fg)"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
      <path
        d={toPath(done)}
        fill="none"
        stroke="var(--accent-strong)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {steps.map((s, k) => {
        const [x, y] = project(s.pos[0], s.pos[1]);
        return (
          <circle
            key={s.id}
            cx={x}
            cy={y}
            r={k === i ? 0 : 3.6}
            fill={k < i ? "var(--accent)" : "var(--surface)"}
            stroke="var(--fg)"
            strokeWidth="1.2"
          />
        );
      })}
      <g
        style={{
          transform: `translate(${bx}px, ${by}px)`,
          transition: reduce ? "none" : "transform .8s ease-in-out",
        }}
      >
        <circle r="9" fill="var(--accent)" opacity="0.35">
          {!reduce && <animate attributeName="r" values="7;12;7" dur="1.8s" repeatCount="indefinite" />}
        </circle>
        <circle r="5.5" fill="var(--accent)" stroke="var(--fg)" strokeWidth="1.8" />
      </g>
    </>
  );

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="relative">
        <WorldMap center={60} latTop={62} latBottom={-72} className="h-auto w-full rounded-xl" aria-hidden>
          {overlay}
          <g transform={`translate(${-WORLD_W} 0)`}>{overlay}</g>
          {/* Noms des trois caps */}
          {[
            [t.capes[0], 18.5, -34.4],
            [t.capes[1], 115, -34.4],
            [t.capes[2], 292.7 - 360, -55.9],
          ].map(([label, lon, lat]) => {
            const [x, y] = project(lon as number, lat as number);
            return (
              <text
                key={label as string}
                x={x + 5}
                y={y - 5}
                fontSize="9"
                fontWeight="700"
                fill="var(--fg)"
                stroke="var(--bg)"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {label as string}
              </text>
            );
          })}
        </WorldMap>
        <p className="text-muted mt-1 flex items-center gap-2 text-xs">
          <span className="inline-block h-0 w-6 border-t-2 border-dashed border-[#d64545]" aria-hidden />
          {t.zea}
        </p>
      </div>

      {/* Étapes */}
      <ol className="mt-4 flex gap-1.5 overflow-x-auto pb-2" aria-label={t.stepsLabel}>
        {steps.map((s, k) => (
          <li key={s.id} className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setI(k);
              }}
              aria-current={k === i ? "step" : undefined}
              title={s.name}
              className={cn(
                "grid size-9 place-items-center rounded-full border-2 font-mono text-xs font-bold transition",
                k === i
                  ? "border-accent-strong bg-accent text-on-accent scale-110"
                  : k < i
                    ? "border-accent/60 bg-accent/25"
                    : "border-line hover:border-fg/40",
              )}
            >
              <span className="sr-only">{s.name}</span>
              <span aria-hidden>{k + 1}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div aria-live="polite" className="min-h-[16rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={step.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-muted font-mono text-xs tracking-widest uppercase">
                {t.step} {i + 1} / {steps.length} · {step.coords}
              </p>
              <h3 className="mt-1 font-serif text-2xl font-semibold">{step.name}</h3>
              <p className="mt-2 leading-relaxed">{step.what}</p>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="bg-bg-deep/60 rounded-xl p-3">
                  <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                    {t.weather}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem]">{step.weather}</dd>
                </div>
                <div className="bg-bg-deep/60 rounded-xl p-3">
                  <dt className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                    {t.traps}
                  </dt>
                  <dd className="mt-0.5 text-[0.95rem]">{step.traps}</dd>
                </div>
              </dl>
              <div className="border-accent mt-3 border-l-4 pl-3">
                <p className="text-muted font-mono text-[0.68rem] tracking-[0.16em] uppercase">
                  {t.anecdote}
                </p>
                <p className="italic">{step.anecdote}</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="flex flex-row gap-2 lg:flex-col">
          <Button
            variant="secondary"
            onClick={() => setI((x) => Math.max(0, x - 1))}
            disabled={i === 0 || running}
          >
            ← {t.prev}
          </Button>
          <Button
            onClick={() => setI((x) => Math.min(steps.length - 1, x + 1))}
            disabled={i === steps.length - 1 || running}
          >
            {t.next} →
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (i === steps.length - 1) setI(0);
              setPlaying((p) => !p);
            }}
          >
            {running ? t.pause : t.play}
          </Button>
        </div>
      </div>
    </Frame>
  );
}
