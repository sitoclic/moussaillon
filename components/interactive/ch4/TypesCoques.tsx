/** Monocoque, catamaran, trimaran vus de face (schéma statique). */
export function TypesCoques({
  labels,
}: {
  labels: { mono: string; cata: string; tri: string; caption: string };
}) {
  const hull = (x: number, w: number, h: number, keel = false) => (
    <g>
      <path
        d={`M${x - w / 2} 70 L${x + w / 2} 70 Q${x + w / 2 - 2} ${70 + h} ${x} ${72 + h} Q${x - w / 2 + 2} ${70 + h} ${x - w / 2} 70 Z`}
        fill="#fffdf8"
        stroke="#0b2239"
        strokeWidth="2"
      />
      {keel && (
        <>
          <line x1={x} y1={72 + h} x2={x} y2={110} stroke="#475a6c" strokeWidth="3" />
          <ellipse cx={x} cy="111" rx="7" ry="4" fill="#16324f" />
        </>
      )}
    </g>
  );
  const mast = (x: number) => <line x1={x} y1="10" x2={x} y2="70" stroke="#0b2239" strokeWidth="2.5" />;
  const water = <rect x="0" y="80" width="140" height="40" fill="var(--ocean-2)" opacity="0.2" />;

  return (
    <figure className="bg-surface border-line rounded-3xl border p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <svg viewBox="0 0 140 120" className="h-auto w-full" aria-hidden>
            {water}
            {mast(70)}
            {hull(70, 34, 14, true)}
          </svg>
          <p className="mt-1 text-sm font-semibold">{labels.mono}</p>
        </div>
        <div>
          <svg viewBox="0 0 140 120" className="h-auto w-full" aria-hidden>
            {water}
            <rect x="34" y="62" width="72" height="5" fill="#0b2239" />
            {mast(70)}
            {hull(34, 18, 12)}
            {hull(106, 18, 12)}
          </svg>
          <p className="mt-1 text-sm font-semibold">{labels.cata}</p>
        </div>
        <div>
          <svg viewBox="0 0 140 120" className="h-auto w-full" aria-hidden>
            {water}
            <rect x="16" y="62" width="108" height="5" fill="#0b2239" />
            {mast(70)}
            {hull(70, 24, 16)}
            {hull(16, 14, 9)}
            {hull(124, 14, 9)}
          </svg>
          <p className="mt-1 text-sm font-semibold">{labels.tri}</p>
        </div>
      </div>
      <figcaption className="text-muted mt-3 text-sm leading-relaxed">{labels.caption}</figcaption>
    </figure>
  );
}
