"use client";

import { useIX } from "@/components/providers/I18nProvider";

/** Schéma animé : l'air qui contourne une aile, puis une voile. */
export function VoileAile() {
  const t = useIX().voileAile;
  const flow = (d: string, fast: boolean, i: number) => (
    <path
      key={i}
      d={d}
      fill="none"
      stroke={fast ? "var(--ocean-2)" : "var(--ocean-3)"}
      strokeWidth="2"
      strokeDasharray="6 10"
      strokeLinecap="round"
      className="flow-line"
      style={{ animationDuration: fast ? "0.9s" : "1.8s" }}
    />
  );

  return (
    <figure className="bg-surface border-line rounded-3xl border p-4 sm:p-6">
      <p className="font-serif text-2xl font-semibold">{t.title}</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {/* Aile d'avion, de profil */}
        <div>
          <svg
            viewBox="0 0 300 170"
            className="h-auto w-full"
            role="img"
            aria-label={`${t.wing}. ${t.caption}`}
          >
            {flow("M0 52 C 80 52 110 30 160 30 S 260 60 300 62", true, 1)}
            {flow("M0 72 C 70 72 100 54 160 54 S 250 76 300 78", true, 2)}
            {flow("M0 118 C 80 118 120 112 160 112 S 250 104 300 102", false, 3)}
            {flow("M0 140 C 80 140 120 136 160 136 S 250 128 300 126", false, 4)}
            <path d="M70 96 C 90 70 170 66 250 92 C 170 104 100 106 70 96 Z" fill="#0b2239" />
            <line x1="160" y1="80" x2="160" y2="18" stroke="var(--accent-strong)" strokeWidth="4" />
            <path d="M152 26 L160 10 L168 26 Z" fill="var(--accent-strong)" />
            <text x="172" y="22" fontSize="12" fontWeight="700" fill="var(--fg)">
              {t.lift}
            </text>
          </svg>
          <p className="text-center text-sm font-semibold">{t.wing}</p>
        </div>
        {/* Voile vue de dessus */}
        <div>
          <svg
            viewBox="0 0 300 170"
            className="h-auto w-full"
            role="img"
            aria-label={`${t.sail}. ${t.caption}`}
          >
            {flow("M0 40 C 90 40 120 30 170 34 S 260 70 300 76", true, 5)}
            {flow("M0 60 C 80 60 120 52 170 56 S 250 86 300 92", true, 6)}
            {flow("M0 120 C 90 120 130 108 180 108 S 260 118 300 120", false, 7)}
            {flow("M0 142 C 90 142 130 134 180 134 S 260 140 300 142", false, 8)}
            <path
              d="M70 100 Q 150 60 250 100"
              fill="none"
              stroke="var(--accent-strong)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle cx="70" cy="100" r="5" fill="#0b2239" />
            <line x1="160" y1="80" x2="160" y2="18" stroke="var(--accent-strong)" strokeWidth="4" />
            <path d="M152 26 L160 10 L168 26 Z" fill="var(--accent-strong)" />
            <text x="172" y="22" fontSize="12" fontWeight="700" fill="var(--fg)">
              {t.lift}
            </text>
          </svg>
          <p className="text-center text-sm font-semibold">{t.sail}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <span className="bg-ocean-2 inline-block h-1 w-6 rounded" aria-hidden /> {t.fast}
        </p>
        <p className="flex items-center gap-2">
          <span className="bg-ocean-3 inline-block h-1 w-6 rounded" aria-hidden /> {t.slow}
        </p>
      </div>
      <figcaption className="text-muted mt-3 text-sm leading-relaxed">{t.caption}</figcaption>
    </figure>
  );
}
