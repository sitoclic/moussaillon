"use client";

import { useIX } from "@/components/providers/I18nProvider";
import { BoatTop } from "@/components/decor/BoatTop";

/** Schéma : côté au vent / côté sous le vent. */
export function AuVent() {
  const t = useIX().auVent;
  return (
    <figure className="bg-surface border-line rounded-3xl border p-4 sm:p-6">
      <svg
        viewBox="-160 -110 320 220"
        className="mx-auto h-auto w-full max-w-lg"
        role="img"
        aria-label={t.caption}
      >
        <defs>
          <marker
            id="av-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="var(--ocean-2)" />
          </marker>
        </defs>
        {/* Côtés */}
        <rect x="-160" y="-110" width="160" height="220" fill="var(--ocean-2)" opacity="0.1" />
        <rect x="0" y="-110" width="160" height="220" fill="var(--accent)" opacity="0.1" />
        {/* Flèches de vent, venant de la gauche */}
        {[-70, -20, 30, 80].map((y) => (
          <line
            key={y}
            x1="-150"
            y1={y}
            x2="-70"
            y2={y}
            stroke="var(--ocean-2)"
            strokeWidth="3"
            markerEnd="url(#av-arrow)"
            strokeLinecap="round"
          />
        ))}
        <text x="-150" y="-88" fontSize="13" fontWeight="700" fill="var(--ocean-2)">
          {t.wind}
        </text>
        {/* Bateau orienté vers le haut, voiles à droite (sous le vent) */}
        <g transform="scale(1.05)">
          <BoatTop main={30} jib={24} />
        </g>
        <text x="-80" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--fg)">
          {t.windward}
        </text>
        <text x="80" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--fg)">
          {t.leeward}
        </text>
      </svg>
      <figcaption className="text-muted mt-2 text-center text-sm">{t.caption}</figcaption>
    </figure>
  );
}
