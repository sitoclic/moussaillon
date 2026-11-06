import { cn } from "@/lib/cn";

export type Mood = "happy" | "curious" | "wow" | "wink" | "sleepy";

type Props = {
  mood?: Mood;
  /** Lève le bras pour saluer. */
  wave?: boolean;
  className?: string;
  /** Texte alternatif ; vide = décoratif. */
  title?: string;
};

/**
 * Le Moussaillon : petit marin original en ciré jaune et bonnet rouge.
 * Entièrement dessiné en SVG, il change d'expression selon `mood`.
 */
export function Moussaillon({ mood = "happy", wave = false, className, title }: Props) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 120 150"
      className={cn("h-auto", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
    >
      {/* Ombre au sol */}
      <ellipse cx="60" cy="144" rx="30" ry="4" fill="#0b2239" opacity="0.12" />

      {/* Bottes */}
      <rect x="40" y="128" width="16" height="13" rx="5" fill="#16324f" />
      <rect x="64" y="128" width="16" height="13" rx="5" fill="#16324f" />

      {/* Bras gauche (à l'écran) */}
      <path d="M38 88 Q26 104 30 118" stroke="#e0a400" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="119" r="6" fill="#f6cfa8" />

      {/* Bras droit : le long du corps, ou levé pour saluer */}
      {wave ? (
        <g>
          <path
            d="M82 88 Q98 78 100 60"
            stroke="#e0a400"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="100" cy="57" r="6" fill="#f6cfa8" />
        </g>
      ) : (
        <g>
          <path
            d="M82 88 Q94 104 90 118"
            stroke="#e0a400"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="90" cy="119" r="6" fill="#f6cfa8" />
        </g>
      )}

      {/* Ciré */}
      <path
        d="M40 80 Q60 72 80 80 L90 128 Q60 136 30 128 Z"
        fill="#f2b705"
        stroke="#c98f00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Fermeture et boutons */}
      <path d="M60 82 L60 132" stroke="#c98f00" strokeWidth="1.5" />
      <circle cx="64" cy="94" r="2" fill="#16324f" />
      <circle cx="64" cy="106" r="2" fill="#16324f" />
      <circle cx="64" cy="118" r="2" fill="#16324f" />
      {/* Poche */}
      <path d="M38 110 h12 v8 h-12 z" fill="none" stroke="#c98f00" strokeWidth="1.3" />
      {/* Col */}
      <path d="M44 79 L60 90 L76 79 Q60 74 44 79 Z" fill="#ffd23f" stroke="#c98f00" strokeWidth="1.3" />

      {/* Tête */}
      <circle cx="60" cy="52" r="25" fill="#f6cfa8" />
      {/* Joues */}
      <ellipse cx="44" cy="60" rx="4.5" ry="3" fill="#ef8f7d" opacity="0.55" />
      <ellipse cx="76" cy="60" rx="4.5" ry="3" fill="#ef8f7d" opacity="0.55" />

      {/* Bonnet */}
      <path d="M34 46 Q36 18 60 17 Q84 18 86 46 Z" fill="#d64545" />
      <rect x="32" y="40" width="56" height="10" rx="5" fill="#b53434" />
      <path d="M44 40v10M52 40v10M60 40v10M68 40v10M76 40v10" stroke="#9e2b2b" strokeWidth="1.2" />
      <circle cx="60" cy="15" r="6" fill="#fff6e6" stroke="#e8dcc4" strokeWidth="1" />

      <Face mood={mood} />
    </svg>
  );
}

function Face({ mood }: { mood: Mood }) {
  const ink = "#16324f";
  switch (mood) {
    case "curious":
      return (
        <g>
          <path d="M45 55 q4 -4 8 -1" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M67 53 q4 -2 8 1" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="60" r="2.6" fill={ink} />
          <circle cx="71" cy="59" r="2.6" fill={ink} />
          <ellipse cx="62" cy="69" rx="3" ry="2.6" fill={ink} />
        </g>
      );
    case "wow":
      return (
        <g>
          <circle cx="50" cy="58" r="3.4" fill={ink} />
          <circle cx="70" cy="58" r="3.4" fill={ink} />
          <circle cx="51" cy="57" r="1" fill="#fff" />
          <circle cx="71" cy="57" r="1" fill="#fff" />
          <ellipse cx="60" cy="69" rx="4" ry="5" fill={ink} />
        </g>
      );
    case "wink":
      return (
        <g>
          <circle cx="50" cy="58" r="2.6" fill={ink} />
          <path d="M66 58 q4 3 8 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M52 66 q8 7 16 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      );
    case "sleepy":
      return (
        <g>
          <path d="M46 58 q4 3 8 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M66 58 q4 3 8 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="68" rx="3" ry="2" fill={ink} />
        </g>
      );
    default:
      return (
        <g>
          <circle cx="50" cy="58" r="2.6" fill={ink} />
          <circle cx="70" cy="58" r="2.6" fill={ink} />
          <path d="M52 66 q8 7 16 0" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </g>
      );
  }
}
