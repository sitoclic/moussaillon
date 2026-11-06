import { cn } from "@/lib/cn";

/**
 * Silhouette de voilier de course (monocoque, grand-voile + foc),
 * dessin original. Le bateau regarde vers la droite.
 */
export function Sailboat({
  className,
  hull = "#0b2239",
  sail = "#fffdf8",
  accent = "#f2b705",
  title,
}: {
  className?: string;
  hull?: string;
  sail?: string;
  accent?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 170"
      className={cn("h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Mât */}
      <rect x="77" y="6" width="3" height="134" fill={hull} />
      {/* Grand-voile */}
      <path
        d="M76 10 Q50 70 30 132 L76 132 Z"
        fill={sail}
        stroke={hull}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M76 52 L52 52 M76 92 L40 92" stroke={hull} strokeOpacity="0.25" strokeWidth="1" />
      {/* Foc */}
      <path
        d="M81 14 L134 132 L81 132 Z"
        fill={sail}
        stroke={hull}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Bande colorée sur la grand-voile */}
      <path d="M60 104 L76 104 L76 116 L55 116 Z" fill={accent} />
      {/* Coque */}
      <path d="M14 138 L150 138 Q146 154 128 158 L30 158 Q18 152 14 138 Z" fill={hull} />
      <path d="M22 146 L142 146" stroke={accent} strokeWidth="2.5" />
    </svg>
  );
}
