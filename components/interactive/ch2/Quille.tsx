"use client";

import { useId, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

type Mode = "keel" | "none" | "canting";

const rad = (d: number) => (d * Math.PI) / 180;
/** Rotation d'un point autour de l'origine (sens horaire à l'écran). */
function rot([x, y]: [number, number], deg: number): [number, number] {
  const a = rad(deg);
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return [r2(x * Math.cos(a) - y * Math.sin(a)), r2(x * Math.sin(a) + y * Math.cos(a))];
}

/**
 * Bateau vu de face, vent venant de la gauche.
 * Curseur de vent → gîte. Sans quille, il chavire ; avec une quille
 * pendulaire, il reste plus droit. Modèle volontairement simplifié.
 */
export function Quille({ canting = false }: { canting?: boolean }) {
  const t = useIX().quille;
  const id = useId();
  const reduce = useReducedMotion();
  const [wind, setWind] = useState(40);
  const [mode, setMode] = useState<Mode>(canting ? "canting" : "keel");

  const modes: Mode[] = canting ? ["keel", "canting"] : ["keel", "none"];

  let heel: number;
  let capsized = false;
  if (mode === "none") {
    heel = wind * 1.3;
    if (heel > 75) {
      heel = 125;
      capsized = true;
    }
  } else {
    const k = mode === "canting" ? 95 : 48;
    heel = Math.round(((Math.atan(wind / k) * 180) / Math.PI) * 0.72 * 10) / 10;
  }
  const cant = mode === "canting" ? Math.min(38, wind * 0.6) : 0;
  const h = Math.round(heel);

  // Positions « monde » pour les flèches.
  const bulb = rot(rot([0, 112], cant), heel);
  const sailPt = rot([0, -90], heel);
  const buoy: [number, number] = [Math.min(50, heel * 0.9), 8];
  const transition = reduce ? "none" : "transform 0.6s cubic-bezier(.3,1.2,.5,1)";

  return (
    <Frame title={t.title}>
      <div className="flex gap-2" role="group">
        {modes.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "min-h-11 flex-1 rounded-xl border-2 px-3 text-sm font-semibold transition",
              mode === m ? "border-accent bg-accent text-on-accent" : "border-line hover:border-fg/40",
            )}
          >
            {m === "keel" ? t.withKeel : m === "none" ? t.withoutKeel : t.canting}
          </button>
        ))}
      </div>

      <div className="mt-4 grid items-center gap-6 sm:grid-cols-[1.2fr_1fr]">
        <svg viewBox="-160 -175 320 310" className="h-auto w-full" aria-hidden>
          <defs>
            <marker
              id={`${id}-a`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
            </marker>
          </defs>
          {/* Ciel / eau */}
          <rect x="-160" y="0" width="320" height="140" fill="var(--ocean-2)" opacity="0.22" />
          <line x1="-160" y1="0" x2="160" y2="0" stroke="var(--ocean-2)" strokeWidth="2" />

          {/* Bateau (pivot au niveau de l'eau) */}
          <g style={{ transform: `rotate(${heel}deg)`, transformOrigin: "0 0", transition }}>
            <line x1="0" y1="-20" x2="0" y2="-160" stroke="#0b2239" strokeWidth="4" />
            <path d="M0 -158 L-3 -26 L3 -26 Z" fill="var(--accent)" stroke="var(--accent-strong)" />
            {mode !== "none" && (
              <g style={{ transform: `rotate(${cant}deg)`, transformOrigin: "0 22px", transition }}>
                <path d="M-4 22 L4 22 L3 104 L-3 104 Z" fill="#475a6c" />
                <ellipse cx="0" cy="112" rx="14" ry="9" fill="#16324f" />
              </g>
            )}
            <path
              d="M-62 -22 L62 -22 Q 60 20 0 28 Q -60 20 -62 -22 Z"
              fill="#fffdf8"
              stroke="#0b2239"
              strokeWidth="2.5"
            />
            <rect x="-20" y="-34" width="40" height="12" rx="3" fill="#d8cdb7" stroke="#0b2239" />
          </g>

          {/* Flèches de forces */}
          {!capsized && (
            <g strokeWidth="4" strokeLinecap="round">
              {wind > 2 && (
                <line
                  x1={sailPt[0] - 20 - wind * 0.8}
                  y1={sailPt[1]}
                  x2={sailPt[0] - 8}
                  y2={sailPt[1]}
                  stroke="var(--ocean-2)"
                  markerEnd={`url(#${id}-a)`}
                />
              )}
              {mode !== "none" && (
                <line
                  x1={bulb[0]}
                  y1={bulb[1] - 4}
                  x2={bulb[0]}
                  y2={bulb[1] + 22}
                  stroke="#d64545"
                  markerEnd={`url(#${id}-a)`}
                />
              )}
              <line
                x1={buoy[0]}
                y1={buoy[1] + 26}
                x2={buoy[0]}
                y2={buoy[1]}
                stroke="#1d9a55"
                markerEnd={`url(#${id}-a)`}
              />
            </g>
          )}
        </svg>

        <div>
          <label htmlFor={`${id}-w`} className="text-sm font-semibold">
            {t.windForce}
          </label>
          <input
            id={`${id}-w`}
            type="range"
            min={0}
            max={100}
            value={wind}
            onChange={(e) => setWind(Number(e.target.value))}
            aria-valuetext={capsized ? t.capsized : t.heel(h)}
            className="mt-2 w-full cursor-pointer accent-[var(--accent-strong)]"
          />
          <p className="mt-4 font-mono text-3xl font-bold" aria-live="polite">
            {capsized ? "⚠" : t.heel(h)}
          </p>
          <p className={cn("mt-2 leading-relaxed", capsized && "text-danger font-semibold")}>
            {capsized ? t.capsized : mode === "canting" ? t.explainCanting : t.explainKeel}
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="bg-ocean-2 h-1 w-6 rounded" aria-hidden /> {t.legendWind}
            </li>
            {mode !== "none" && (
              <li className="flex items-center gap-2">
                <span className="h-1 w-6 rounded bg-[#d64545]" aria-hidden /> {t.legendWeight}
              </li>
            )}
            <li className="flex items-center gap-2">
              <span className="h-1 w-6 rounded bg-[#1d9a55]" aria-hidden /> {t.legendBuoyancy}
            </li>
          </ul>
        </div>
      </div>
    </Frame>
  );
}
