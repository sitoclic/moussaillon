"use client";

import { useState } from "react";
import type { RaceClass } from "@/content/fr/classes";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

export const CLASS_COLORS: Record<RaceClass["id"], string> = {
  mini: "#d64545",
  figaro: "#e07b28",
  class40: "#c98f00",
  oceanfifty: "#1d9a55",
  imoca: "#135e8a",
  ultim: "#5b4bb7",
};

const WATER = 38; // ligne de flottaison (en mètres, repère du dessin)
const STERN = 2; // abscisse de la poupe

/** Silhouette de profil d'un bateau, en mètres (1 unité = 1 m). */
export function BoatProfile({ c, color, strong }: { c: RaceClass; color: string; strong: boolean }) {
  const L = c.length;
  const free = Math.max(0.6, L * 0.06); // franc-bord
  const deck = WATER - free;
  const mastX = STERN + L * (c.hulls === 3 ? 0.5 : 0.56);
  const top = WATER - c.mast;
  const boom = deck - Math.max(0.6, L * 0.05);
  const keel = c.hulls === 1 ? Math.min(4.5, 1.2 + L * 0.18) : Math.min(4, L * 0.12);
  const opacity = strong ? 1 : 0.28;
  const sw = strong ? 0.18 : 0.12;
  return (
    <g opacity={opacity}>
      {/* Grand-voile */}
      <path
        d={`M${mastX} ${top + 0.4} L${STERN + L * 0.08} ${boom} L${mastX} ${boom} Z`}
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth={sw}
      />
      {/* Voile d'avant */}
      <path
        d={`M${mastX + 0.25} ${top + c.mast * 0.12} L${STERN + L * 0.97} ${deck} L${mastX + 0.25} ${deck} Z`}
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth={sw}
      />
      {/* Mât */}
      <line x1={mastX} y1={top} x2={mastX} y2={deck} stroke={color} strokeWidth={sw * 1.6} />
      {/* Coque */}
      <path
        d={`M${STERN} ${deck} L${STERN + L * 0.96} ${deck} Q${STERN + L} ${deck} ${STERN + L} ${deck + free * 0.4} L${STERN + L * 0.94} ${WATER + 0.3} L${STERN + 0.3} ${WATER + 0.3} Z`}
        fill={color}
        fillOpacity="0.85"
      />
      {/* Quille ou dérive */}
      <line
        x1={STERN + L * 0.5}
        y1={WATER + 0.3}
        x2={STERN + L * 0.5}
        y2={WATER + keel}
        stroke={color}
        strokeWidth={sw * 2}
      />
      {c.hulls === 1 && (
        <ellipse cx={STERN + L * 0.5} cy={WATER + keel} rx={L * 0.06} ry="0.3" fill={color} />
      )}
    </g>
  );
}

/** Silhouette humaine de 1,80 m. */
export function Human({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} ${WATER - 1.8})`} fill="var(--fg)">
      <circle cx="0.2" cy="0.2" r="0.2" />
      <path d="M0 0.45 h0.4 l0.12 0.65 h-0.14 l-0.05 0.7 h-0.13 l-0.03 -0.55 l-0.03 0.55 h-0.13 l-0.05 -0.7 h-0.14 z" />
    </g>
  );
}

/** Toutes les classes superposées, à la même échelle, avec un humain. */
export function Silhouettes({ classes }: { classes: RaceClass[] }) {
  const t = useIX().silhouettes;
  const [active, setActive] = useState<RaceClass["id"]>("imoca");
  const sorted = [...classes].sort((a, b) => b.length - a.length);
  const current = classes.find((c) => c.id === active)!;

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.title}>
        {classes.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "flex min-h-10 items-center gap-2 rounded-full border-2 px-3 text-sm font-semibold transition",
              active === c.id ? "bg-surface shadow" : "border-line text-muted hover:text-fg",
            )}
            style={active === c.id ? { borderColor: CLASS_COLORS[c.id] } : undefined}
          >
            <span className="size-3 rounded-full" style={{ background: CLASS_COLORS[c.id] }} aria-hidden />
            {c.name}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 38 45"
        className="mx-auto mt-4 h-auto w-full max-w-[460px] rounded-2xl bg-[linear-gradient(180deg,var(--sky-2),var(--sky-1)_84%,transparent_84%)]"
        role="img"
        aria-label={t.aria(current.name, current.lengthLabel, current.mastLabel)}
      >
        <rect x="0" y={WATER} width="38" height="7" fill="var(--ocean-2)" opacity="0.3" />
        {/* Graduations tous les 5 m */}
        {[0, 5, 10, 15, 20, 25, 30].map((m) => (
          <g key={m}>
            <line
              x1={STERN + m}
              y1={WATER + 5.6}
              x2={STERN + m}
              y2={WATER + 6.2}
              stroke="var(--fg)"
              strokeWidth="0.08"
            />
            <text x={STERN + m} y={WATER + 6.9} fontSize="0.7" textAnchor="middle" fill="var(--fg)">
              {m} m
            </text>
          </g>
        ))}
        {sorted.map((c) => (
          <BoatProfile key={c.id} c={c} color={CLASS_COLORS[c.id]} strong={c.id === active} />
        ))}
        <Human x={STERN + current.length + 1} />
      </svg>

      <div className="mt-4 grid gap-1 sm:grid-cols-3" aria-live="polite">
        <p>
          <span className="text-muted text-sm">{t.length} : </span>
          <strong>{current.lengthLabel}</strong>
        </p>
        <p>
          <span className="text-muted text-sm">{t.mast} : </span>
          <strong>{current.mastLabel}</strong>
        </p>
        <p>
          <span className="text-muted text-sm">{t.hulls} : </span>
          <strong>{current.hulls === 1 ? t.mono : t.tri}</strong>
        </p>
      </div>
      <p className="text-muted mt-2 text-sm">{t.note}</p>
    </Frame>
  );
}
