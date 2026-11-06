import { cn } from "@/lib/cn";

type Props = {
  /** Angle de la bôme / grand-voile, en degrés (positif = vers tribord). */
  main?: number;
  /** Angle du foc, en degrés (positif = vers tribord). */
  jib?: number;
  /** Les voiles faseyent (vent de face). */
  flapping?: boolean;
  /** Affiche les feux de navigation (rouge à bâbord, vert à tribord). */
  lights?: boolean;
  className?: string;
};

/**
 * Voilier vu de dessus, l'avant vers le haut, centré sur (0, 0).
 * À placer dans un <g transform="rotate(…)"> pour l'orienter.
 * Coordonnées : de -70 (avant) à +60 (arrière).
 */
export function BoatTop({ main = 20, jib = 15, flapping = false, lights = false, className }: Props) {
  // Le creux de la voile se forme sous le vent.
  const mainBelly = main >= 0 ? 1 : -1;
  return (
    <g className={cn(className)}>
      {/* Coque */}
      <path
        d="M0 -70 C 22 -48 30 -10 28 30 Q 27 52 22 60 L -22 60 Q -27 52 -28 30 C -30 -10 -22 -48 0 -70 Z"
        fill="#fffdf8"
        stroke="#0b2239"
        strokeWidth="2.5"
      />
      {/* Roof et cockpit */}
      <path d="M-14 -8 h28 v22 h-28 z" fill="#d8cdb7" stroke="#0b2239" strokeWidth="1" opacity="0.9" />
      <path d="M-17 22 h34 v28 h-34 z" fill="#ece3d0" stroke="#0b2239" strokeWidth="1" />

      {lights && (
        <>
          <circle cx="-17" cy="-36" r="5" fill="#d64545" stroke="#fff" strokeWidth="1.5" />
          <circle cx="17" cy="-36" r="5" fill="#1d9a55" stroke="#fff" strokeWidth="1.5" />
        </>
      )}

      {/* Foc : du point d'amure (avant) vers l'arrière */}
      <g transform={`rotate(${-jib} 0 -62)`} className={flapping ? "sail-flap" : undefined}>
        <path
          d={`M0 -62 Q ${mainBelly * 9} -40 0 -18`}
          fill="none"
          stroke="var(--accent-strong)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* Mât, bôme et grand-voile */}
      <g transform={`rotate(${-main} 0 -10)`} className={flapping ? "sail-flap" : undefined}>
        <path
          d={`M0 -10 Q ${mainBelly * 12} 18 0 48`}
          fill="none"
          stroke="var(--accent-strong)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line x1="0" y1="-10" x2="0" y2="48" stroke="#0b2239" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="0" cy="-10" r="3.5" fill="#0b2239" />
    </g>
  );
}
