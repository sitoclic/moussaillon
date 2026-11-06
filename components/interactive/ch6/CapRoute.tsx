"use client";

import { useId, useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { BoatTop } from "@/components/decor/BoatTop";
import { Frame } from "../Frame";

/** Le cap (où pointe le bateau) et la route (où il va vraiment), avec du courant. */
export function CapRoute() {
  const t = useIX().capRoute;
  const id = useId();
  const [current, setCurrent] = useState(0); // nœuds, vers le sud
  const boatSpeed = 6; // nœuds, cap à l'est
  const drift = Math.round((Math.atan(current / boatSpeed) * 180) / Math.PI);
  const scale = 40; // px par nœud (une heure de navigation)
  const start: [number, number] = [40, 60];
  const end: [number, number] = [start[0] + boatSpeed * scale, start[1] + current * scale];

  return (
    <Frame title={t.title} intro={t.intro}>
      <svg viewBox="0 0 320 240" className="bg-ocean-2/12 h-auto w-full rounded-2xl" aria-hidden>
        <defs>
          <marker
            id={`${id}-m`}
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
        {/* Courant : petites flèches vers le sud */}
        {current > 0 &&
          [80, 150, 220, 290].map((x) =>
            [110, 170].map((y) => (
              <line
                key={`${x}-${y}`}
                x1={x}
                y1={y}
                x2={x}
                y2={y + 6 + current * 5}
                stroke="var(--ocean-3)"
                strokeWidth="2"
                markerEnd={`url(#${id}-m)`}
              />
            )),
          )}
        {/* Cap */}
        <line
          x1={start[0]}
          y1={start[1]}
          x2={start[0] + boatSpeed * scale}
          y2={start[1]}
          stroke="var(--fg)"
          strokeWidth="2"
          strokeDasharray="6 5"
          markerEnd={`url(#${id}-m)`}
        />
        <text x={start[0] + 150} y={start[1] - 10} fontSize="12" fontWeight="700" fill="var(--fg)">
          {t.heading} 090°
        </text>
        {/* Route réelle */}
        <line
          x1={start[0]}
          y1={start[1]}
          x2={end[0]}
          y2={end[1]}
          stroke="var(--accent-strong)"
          strokeWidth="3.5"
          markerEnd={`url(#${id}-m)`}
          style={{ transition: "all .4s" }}
        />
        <text
          x={end[0] - 70}
          y={Math.min(232, end[1] + 18)}
          fontSize="12"
          fontWeight="700"
          fill="var(--accent-strong)"
        >
          {t.track}
        </text>
        {/* Bateau, toujours pointé vers l'est */}
        <g
          transform={`translate(${end[0]} ${end[1]}) rotate(90) scale(0.32)`}
          style={{ transition: "transform .4s" }}
        >
          <BoatTop main={20} jib={15} />
        </g>
      </svg>
      <label htmlFor={id} className="mt-4 block text-sm font-semibold">
        {t.current} : <span className="font-mono">{current} nœuds</span>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={4}
        step={0.5}
        value={current}
        onChange={(e) => setCurrent(Number(e.target.value))}
        className="mt-2 w-full cursor-pointer accent-[var(--accent-strong)]"
      />
      <p className="mt-3 font-medium" aria-live="polite">
        {t.drift(drift)}
      </p>
    </Frame>
  );
}
