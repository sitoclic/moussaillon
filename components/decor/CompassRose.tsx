import { cn } from "@/lib/cn";

/** Rose des vents décorative, dans l'esprit des cartes marines. */
export function CompassRose({ className, labels = true }: { className?: string; labels?: boolean }) {
  const ticks = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg viewBox="-110 -110 220 220" className={cn("h-auto", className)} aria-hidden>
      <circle r="100" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      <circle r="92" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
      {ticks.map((a) => (
        <line
          key={a}
          x1="0"
          y1={-100}
          x2="0"
          y2={a % 90 === 0 ? -84 : a % 45 === 0 ? -88 : -95}
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth={a % 45 === 0 ? 1.4 : 0.7}
          transform={`rotate(${a})`}
        />
      ))}
      {/* Branches intermédiaires */}
      {[45, 135, 225, 315].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 -58 L7 0 L0 0 Z" fill="currentColor" fillOpacity="0.35" />
          <path d="M0 -58 L-7 0 L0 0 Z" fill="currentColor" fillOpacity="0.15" />
        </g>
      ))}
      {/* Branches cardinales */}
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 -82 L11 0 L0 0 Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M0 -82 L-11 0 L0 0 Z" fill="currentColor" fillOpacity="0.3" />
        </g>
      ))}
      <circle r="5" fill="var(--accent)" />
      {labels &&
        (
          [
            ["N", 0, -104],
            ["E", 104, 0],
            ["S", 0, 104],
            ["O", -104, 0],
          ] as const
        ).map(([l, x, y]) => (
          <text
            key={l}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontFamily="var(--font-serif)"
            fontWeight="700"
            fill="currentColor"
            stroke="var(--bg)"
            strokeWidth="5"
            paintOrder="stroke"
          >
            {l}
          </text>
        ))}
    </svg>
  );
}
