"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIX } from "@/components/providers/I18nProvider";
import { BoatTop } from "@/components/decor/BoatTop";
import { sailTrim } from "@/lib/sailing";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Mode = "tack" | "gybe";

/** Cap du bateau à chaque étape (vent venant du haut). */
const HEADINGS: Record<Mode, number[]> = {
  tack: [45, 18, 0, -45],
  gybe: [-150, -168, -180, -210],
};

/** Animation pas à pas : virement de bord (avant dans le vent) et empannage (arrière dans le vent). */
export function Manoeuvres() {
  const t = useIX().manoeuvres;
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("tack");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const steps = mode === "tack" ? t.stepsTack : t.stepsGybe;
  const heading = HEADINGS[mode][step];
  let trim = sailTrim(heading);
  // Pendant l'empannage, la bôme traverse : on la montre dans l'axe.
  if (mode === "gybe" && step === 2) trim = { main: 0, jib: 0, flapping: false };

  // L'animation tourne tant qu'on n'a pas atteint la dernière étape.
  const running = playing && step < 3;

  useEffect(() => {
    if (!running) return;
    timer.current = window.setTimeout(() => setStep((s) => s + 1), 1500);
    return () => window.clearTimeout(timer.current);
  }, [running, step]);

  function changeMode(m: Mode) {
    setMode(m);
    setStep(0);
    setPlaying(false);
  }

  function play() {
    setStep(0);
    setPlaying(true);
  }

  return (
    <Frame title={t.title}>
      <div className="flex gap-2" role="group">
        {(["tack", "gybe"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => changeMode(m)}
            className={cn(
              "min-h-11 flex-1 rounded-xl border-2 px-3 font-semibold transition",
              mode === m ? "border-accent bg-accent text-on-accent" : "border-line hover:border-fg/40",
            )}
          >
            {m === "tack" ? t.tack : t.gybe}
          </button>
        ))}
      </div>

      <div className="mt-5 grid items-center gap-6 sm:grid-cols-2">
        <svg viewBox="-110 -125 220 230" className="mx-auto h-auto w-full max-w-[300px]" aria-hidden>
          <circle r="100" fill="var(--ocean-2)" opacity="0.12" />
          {/* Vent */}
          {[-20, 0, 20].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1={-122}
                x2={x}
                y2={-104}
                stroke="var(--ocean-2)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d={`M${x - 5} -107 L${x} -99 L${x + 5} -107 Z`} fill="var(--ocean-2)" />
            </g>
          ))}
          {/* Trajectoire */}
          <path
            d={mode === "tack" ? "M-70 60 Q 0 -60 70 60" : "M-70 -40 Q 0 90 70 -40"}
            fill="none"
            stroke="var(--fg)"
            strokeOpacity="0.25"
            strokeDasharray="4 5"
          />
          <g
            style={{
              transform: `rotate(${heading}deg)`,
              transformOrigin: "0 0",
              transition: reduce ? "none" : "transform 1.1s ease-in-out",
            }}
          >
            <BoatTop main={trim.main} jib={trim.jib} flapping={trim.flapping} />
          </g>
          {mode === "gybe" && step === 2 && (
            <text y="95" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--danger)">
              ⚠ {t.boom}
            </text>
          )}
        </svg>

        <div>
          <p className="text-muted font-mono text-xs tracking-wider uppercase">
            {t.step} {step + 1} / 4
          </p>
          <p className="mt-2 min-h-24 text-lg leading-relaxed" aria-live="polite">
            {steps[step]}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0 || running}
              aria-label={t.prev}
            >
              ←
            </Button>
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={step === 3 || running}
              aria-label={t.next}
            >
              →
            </Button>
            <Button onClick={play} disabled={running}>
              {step === 3 ? t.replay : t.play}
            </Button>
          </div>
        </div>
      </div>
    </Frame>
  );
}
