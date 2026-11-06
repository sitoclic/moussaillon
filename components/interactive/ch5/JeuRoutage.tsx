"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Pt = [number, number];

/**
 * Scénarios simplifiés : chaque route a une distance et une vitesse moyenne
 * déduite du vent rencontré. Les chiffres sont illustratifs.
 */
const SCENARIOS: Array<{
  kind: "high" | "low" | "trades";
  center?: Pt;
  a: { miles: number; speed: number };
  b: { miles: number; speed: number; ctrl: Pt };
}> = [
  {
    kind: "high",
    center: [200, 130],
    a: { miles: 600, speed: 5.7 },
    b: { miles: 760, speed: 12, ctrl: [200, -20] },
  },
  {
    kind: "low",
    center: [200, 200],
    a: { miles: 520, speed: 9 },
    b: { miles: 640, speed: 16, ctrl: [200, 380] },
  },
  { kind: "trades", a: { miles: 500, speed: 14 }, b: { miles: 590, speed: 15, ctrl: [200, 250] } },
];

const START: Pt = [40, 130];
const END: Pt = [360, 130];

const qPoint = (p0: Pt, c: Pt, p1: Pt, t: number): Pt => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * p1[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * p1[1],
];

/** Mini-jeu : choisir entre deux routes et voir laquelle arrive la première. */
export function JeuRoutage() {
  const t = useIX().routage;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 (temps écoulé / temps de la route la plus lente)
  const raf = useRef<number | undefined>(undefined);

  const sc = SCENARIOS[index];
  const text = t.scenarios[index];
  const timeA = sc.a.miles / sc.a.speed;
  const timeB = sc.b.miles / sc.b.speed;
  const winner: "a" | "b" = timeA <= timeB ? "a" : "b";
  const slowest = Math.max(timeA, timeB);
  const pA = Math.min(1, (progress * slowest) / timeA);
  const pB = Math.min(1, (progress * slowest) / timeB);
  const done = choice !== null && progress >= 1;

  useEffect(() => {
    if (choice === null) return;
    if (reduce) {
      raf.current = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf.current!);
    }
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / 4000);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current!);
  }, [choice, reduce]);

  function next() {
    setChoice(null);
    setProgress(0);
    setIndex((i) => (i + 1) % SCENARIOS.length);
  }

  const posA: Pt = [START[0] + (END[0] - START[0]) * pA, START[1]];
  const posB = qPoint(START, sc.b.ctrl, END, pB);

  return (
    <Frame title={t.title} intro={t.intro}>
      <p className="text-muted font-mono text-xs tracking-widest uppercase">
        {t.scenario} {index + 1} / {SCENARIOS.length}
      </p>
      <p className="font-serif text-2xl font-semibold">{text.name}</p>

      <svg viewBox="0 0 400 260" className="bg-ocean-2/10 mt-3 h-auto w-full rounded-2xl" aria-hidden>
        {/* Météo */}
        {sc.kind === "high" && sc.center && (
          <g>
            {[30, 60, 90].map((r) => (
              <ellipse
                key={r}
                cx={sc.center![0]}
                cy={sc.center![1]}
                rx={r * 1.4}
                ry={r}
                fill="none"
                stroke="var(--ocean-2)"
                strokeOpacity="0.6"
              />
            ))}
            <circle cx={sc.center[0]} cy={sc.center[1]} r="14" fill="#135e8a" />
            <text
              x={sc.center[0]}
              y={sc.center[1] + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill="white"
            >
              A
            </text>
          </g>
        )}
        {sc.kind === "low" && sc.center && (
          <g>
            {[16, 30, 44].map((r) => (
              <ellipse
                key={r}
                cx={sc.center![0]}
                cy={sc.center![1]}
                rx={r * 1.5}
                ry={r}
                fill="none"
                stroke="var(--ocean-2)"
                strokeOpacity="0.6"
              />
            ))}
            <circle cx={sc.center[0]} cy={sc.center[1]} r="14" fill="#d64545" />
            <text
              x={sc.center[0]}
              y={sc.center[1] + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill="white"
            >
              D
            </text>
            {/* Au nord de la dépression : vent d'est (de face pour la route A) */}
            {[80, 180, 280].map((x) => (
              <path
                key={x}
                d={`M${x + 26} 110 l-26 0 m7 -5 l-7 5 l7 5`}
                stroke="var(--fg)"
                strokeOpacity="0.6"
                fill="none"
                strokeWidth="1.5"
              />
            ))}
            {/* Au sud de la dépression : vent d'ouest (dans le dos pour la route B) */}
            {[60, 300].map((x) => (
              <path
                key={x}
                d={`M${x} 248 l26 0 m-7 -5 l7 5 l-7 5`}
                stroke="var(--fg)"
                strokeOpacity="0.6"
                fill="none"
                strokeWidth="1.5"
              />
            ))}
          </g>
        )}
        {sc.kind === "trades" &&
          [50, 110, 170, 230].map((y) =>
            [60, 160, 260, 340].map((x) => (
              <path
                key={`${x}-${y}`}
                d={`M${x} ${y - 8} l-4 16 m-4 -6 l4 6 l5 -5`}
                stroke="var(--fg)"
                strokeOpacity="0.45"
                fill="none"
                strokeWidth="1.5"
              />
            )),
          )}

        {/* Routes */}
        <line
          x1={START[0]}
          y1={START[1]}
          x2={END[0]}
          y2={END[1]}
          stroke="#d64545"
          strokeWidth={choice === "a" ? 3.5 : 2}
          strokeDasharray="7 5"
        />
        <path
          d={`M${START.join(" ")} Q${sc.b.ctrl.join(" ")} ${END.join(" ")}`}
          fill="none"
          stroke="#135e8a"
          strokeWidth={choice === "b" ? 3.5 : 2}
          strokeDasharray="7 5"
        />
        <text
          x={START[0] + 70}
          y={START[1] - 8}
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="#d64545"
        >
          1
        </text>
        <text
          x={qPoint(START, sc.b.ctrl, END, 0.5)[0]}
          y={qPoint(START, sc.b.ctrl, END, 0.5)[1] + (sc.b.ctrl[1] < 130 ? -8 : 16)}
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="#135e8a"
        >
          2
        </text>

        {/* Départ et arrivée */}
        <circle cx={START[0]} cy={START[1]} r="6" fill="var(--fg)" />
        <text x={START[0]} y={START[1] + 20} textAnchor="middle" fontSize="10" fill="var(--fg)">
          {t.start}
        </text>
        <path d={`M${END[0]} ${END[1] - 14} v28`} stroke="var(--fg)" strokeWidth="2" />
        <path d={`M${END[0]} ${END[1] - 14} h12 v8 h-12`} fill="var(--accent)" />
        <text x={END[0]} y={END[1] + 26} textAnchor="middle" fontSize="10" fill="var(--fg)">
          {t.finish}
        </text>

        {/* Bateaux */}
        {choice && (
          <>
            <circle cx={posA[0]} cy={posA[1]} r="7" fill="#d64545" stroke="white" strokeWidth="2" />
            <circle cx={posB[0]} cy={posB[1]} r="7" fill="#135e8a" stroke="white" strokeWidth="2" />
          </>
        )}
      </svg>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["a", "b"] as const).map((r) => {
          const route = sc[r];
          const time = r === "a" ? timeA : timeB;
          return (
            <div
              key={r}
              className={cn(
                "rounded-2xl border-2 p-4",
                r === "a" ? "border-[#d64545]/50" : "border-[#135e8a]/50",
                done && r === winner && "ring-success ring-4",
              )}
            >
              <p className="font-semibold" style={{ color: r === "a" ? "#d64545" : "var(--link)" }}>
                {r === "a" ? t.routeA : t.routeB}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{r === "a" ? text.a : text.b}</p>
              <p className="text-muted mt-2 font-mono text-xs">
                {t.distance} : {t.miles(route.miles)}
                {done && (
                  <>
                    {" "}
                    · {t.time} : {t.hours(time)}
                  </>
                )}
              </p>
              {!choice && (
                <Button className="mt-3 w-full" onClick={() => setChoice(r)}>
                  {t.choose} {r === "a" ? t.routeA : t.routeB}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div aria-live="polite">
        {done && (
          <div className={cn("mt-4 rounded-2xl p-4", choice === winner ? "bg-success/12" : "bg-danger/10")}>
            <p className={cn("font-semibold", choice === winner ? "text-success" : "text-danger")}>
              {choice === winner ? t.youWin : t.youLose}
            </p>
            <p className="mt-1 leading-relaxed">{text.lesson}</p>
            <Button variant="secondary" className="mt-3" onClick={next}>
              {index + 1 < SCENARIOS.length ? t.again : t.restart}
            </Button>
          </div>
        )}
      </div>
    </Frame>
  );
}
