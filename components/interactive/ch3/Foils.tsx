"use client";

import { useId, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIX } from "@/components/providers/I18nProvider";
import { Waves } from "@/components/decor/Waves";
import { Frame } from "../Frame";

/** Petit IMOCA de profil, avec ou sans foil, soulevé de `rise` unités. */
function MiniImoca({ rise, foil }: { rise: number; foil: boolean }) {
  return (
    <g style={{ transform: `translateY(${-rise}px)`, transition: "transform 0.5s ease-out" }}>
      <path d="M118 8 L112 64 L72 64 Z" fill="#fffdf8" stroke="#0b2239" strokeWidth="1.2" />
      <path d="M124 10 L160 70 L124 70 Z" fill="#fffdf8" stroke="#0b2239" strokeWidth="1.2" />
      <rect x="118" y="6" width="3" height="68" fill="#0b2239" />
      <path
        d="M30 72 L196 70 Q 208 72 208 80 Q 204 88 194 92 L40 92 Q 30 90 30 84 Z"
        fill="#f4efe4"
        stroke="#0b2239"
        strokeWidth="2"
      />
      <path d="M116 92 L118 128" stroke="#475a6c" strokeWidth="4" />
      <ellipse cx="117" cy="130" rx="14" ry="4" fill="#16324f" />
      <path d="M44 92 L46 116" stroke="#475a6c" strokeWidth="4" />
      {foil ? (
        <path
          d="M150 88 Q 152 110 162 116 Q 172 118 182 114"
          fill="none"
          stroke="#c98f00"
          strokeWidth="5"
          strokeLinecap="round"
        />
      ) : (
        <path d="M150 90 L151 120" stroke="#475a6c" strokeWidth="4" />
      )}
    </g>
  );
}

/** Curseur de vitesse : le bateau à foils sort progressivement de l'eau. */
export function Foils() {
  const t = useIX().foils;
  const id = useId();
  const reduce = useReducedMotion();
  const [speed, setSpeed] = useState(6);

  const lift = Math.round(Math.pow(Math.min(1, Math.max(0, (speed - 8) / 20)), 1.2) * 100);
  const rise = (lift / 100) * 22;
  const wettedFoil = 100 - Math.round(lift * 0.6);

  const boat = (foil: boolean) => (
    <div className="bg-ocean-2/10 relative overflow-hidden rounded-2xl">
      <svg viewBox="0 0 240 150" className="relative z-10 h-auto w-full" aria-hidden>
        <MiniImoca rise={foil ? rise : 0} foil={foil} />
        {/* Gerbe d'eau */}
        {speed > 12 && !reduce && (
          <path
            d="M208 84 q 14 -10 26 -4"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={Math.min(1, speed / 25)}
          />
        )}
      </svg>
      <Waves className="absolute inset-x-0 bottom-0 z-20 h-[45%] opacity-80" foam={false} />
    </div>
  );

  return (
    <Frame title={t.title}>
      <label htmlFor={id} className="text-sm font-semibold">
        {t.speed} : <span className="font-mono">{speed} nœuds</span>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={30}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        aria-valuetext={`${speed} nœuds`}
        className="mt-2 w-full cursor-pointer accent-[var(--accent-strong)]"
      />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">{t.before}</p>
          {boat(false)}
          <p className="text-muted mt-2 font-mono text-xs">{t.wetted} : 100 %</p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">{t.after}</p>
          {boat(true)}
          <p className="text-muted mt-2 font-mono text-xs">
            {t.wetted} : {wettedFoil} %
          </p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed" aria-live="polite">
        {t.explain(lift)}
      </p>
      <p className="text-muted mt-1 text-xs">{t.note}</p>
    </Frame>
  );
}
