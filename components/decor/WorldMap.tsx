import { LANDS, polyPath, WORLD_H, WORLD_W } from "@/lib/world";

/**
 * Planisphère stylisé en SVG. `center` permet de centrer la carte sur une
 * longitude (le monde est dessiné trois fois côte à côte pour boucler).
 * Les enfants sont dessinés dans le même repère (utilise project(lon, lat)).
 */
export function WorldMap({
  center = 0,
  latTop = 90,
  latBottom = -90,
  className,
  children,
  graticule = true,
  ...rest
}: {
  center?: number;
  latTop?: number;
  latBottom?: number;
  className?: string;
  children?: React.ReactNode;
  graticule?: boolean;
} & React.SVGProps<SVGSVGElement>) {
  const y0 = (90 - latTop) * 2;
  const h = (latTop - latBottom) * 2;
  const shift = -center * 2;
  const world = (
    <>
      {graticule && (
        <g stroke="var(--ocean-2)" strokeOpacity="0.18" strokeWidth="0.6">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`m${i}`} x1={i * 60} y1="0" x2={i * 60} y2={WORLD_H} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`p${i}`} x1="0" y1={i * 60} x2={WORLD_W} y2={i * 60} />
          ))}
        </g>
      )}
      <g
        fill="var(--bg-deep)"
        stroke="var(--fg)"
        strokeOpacity="0.35"
        strokeWidth="0.7"
        strokeLinejoin="round"
      >
        {LANDS.map((p, i) => (
          <path key={i} d={polyPath(p)} />
        ))}
      </g>
    </>
  );
  return (
    <svg viewBox={`0 ${y0} ${WORLD_W} ${h}`} className={className} {...rest}>
      <rect x="0" y={y0} width={WORLD_W} height={h} fill="var(--ocean-2)" opacity="0.14" />
      <g transform={`translate(${shift} 0)`}>
        {[-WORLD_W, 0, WORLD_W].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            {world}
          </g>
        ))}
        {children}
      </g>
    </svg>
  );
}
