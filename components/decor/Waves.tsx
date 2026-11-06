import { cn } from "@/lib/cn";

/**
 * Construit une vague périodique (sinusoïde) sur 2 × `width`, pour pouvoir
 * la faire défiler en boucle par une translation de -50 %.
 */
export function wavePath({
  width = 1440,
  height = 200,
  baseline = 60,
  amplitude = 14,
  wavelength = 240,
}: {
  width?: number;
  height?: number;
  baseline?: number;
  amplitude?: number;
  wavelength?: number;
}) {
  const total = width * 2;
  let d = `M0 ${baseline} Q ${wavelength / 4} ${baseline - amplitude} ${wavelength / 2} ${baseline}`;
  for (let x = wavelength; x <= total + 0.1; x += wavelength / 2) {
    d += ` T ${x} ${baseline}`;
  }
  d += ` L ${total} ${height} L 0 ${height} Z`;
  return d;
}

type Layer = {
  color: string;
  amplitude: number;
  wavelength: number;
  baseline: number;
  /** Durée d'une boucle, en secondes. */
  speed: number;
  opacity?: number;
  reverse?: boolean;
};

const DEFAULT_LAYERS: Layer[] = [
  { color: "var(--ocean-3)", amplitude: 10, wavelength: 360, baseline: 40, speed: 34, opacity: 0.55 },
  {
    color: "var(--ocean-2)",
    amplitude: 14,
    wavelength: 288,
    baseline: 70,
    speed: 24,
    opacity: 0.85,
    reverse: true,
  },
  { color: "var(--ocean-1)", amplitude: 18, wavelength: 480, baseline: 105, speed: 18 },
];

/**
 * Mer animée en SVG : plusieurs couches de vagues qui défilent en boucle.
 * Le parent fixe la position via `className` (relative, absolute…).
 */
export function Waves({
  layers = DEFAULT_LAYERS,
  className,
  foam = true,
}: {
  layers?: Layer[];
  className?: string;
  foam?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      {layers.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 2880 200"
          preserveAspectRatio="none"
          className="animate-wave absolute inset-x-0 bottom-0 h-full w-[200%]"
          style={
            {
              "--wave-speed": `${l.speed}s`,
              animationDirection: l.reverse ? "reverse" : undefined,
              opacity: l.opacity ?? 1,
            } as React.CSSProperties
          }
        >
          <path
            d={wavePath({ amplitude: l.amplitude, wavelength: l.wavelength, baseline: l.baseline })}
            fill={l.color}
          />
          {foam && i === layers.length - 1 && (
            <path
              d={
                wavePath({ amplitude: l.amplitude, wavelength: l.wavelength, baseline: l.baseline }).split(
                  " L ",
                )[0]
              }
              fill="none"
              stroke="var(--foam)"
              strokeOpacity="0.5"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
      ))}
    </div>
  );
}
