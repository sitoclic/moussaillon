/**
 * Dessins de l'IMOCA (originaux, simplifiés), à l'échelle approximative :
 * 22 unités SVG = 1 mètre. Ligne de flottaison du profil à y = 660.
 * Coque : 18,28 m ≈ 402 unités ; mât : 29 m au-dessus de l'eau ; tirant d'eau : 4,50 m.
 */

export const PROFILE_VIEWBOX = { w: 620, h: 800 };
export const TOP_VIEWBOX = { w: 640, h: 360 };

const INK = "#0b2239";
const SAIL = "#fffdf8";
const HULL = "#f4efe4";

/** Silhouette humaine de 1,80 m (≈ 40 unités) pour l'échelle. */
function Human({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#d64545">
      <circle cx="0" cy="-36" r="4.2" />
      <path d="M-4 -31 h8 l2 15 h-3 l-1 16 h-2.5 l-0.5 -12 l-0.5 12 h-2.5 l-1 -16 h-3 z" />
    </g>
  );
}

/** Vue de profil (et écorché si `cutaway`). */
export function ImocaProfile({ cutaway = false }: { cutaway?: boolean }) {
  const dim = cutaway ? 0.25 : 1;
  return (
    <svg viewBox={`0 0 ${PROFILE_VIEWBOX.w} ${PROFILE_VIEWBOX.h}`} className="h-auto w-full" aria-hidden>
      {/* Ciel et mer */}
      <rect width="620" height="660" fill="var(--sky-2)" opacity="0.6" />
      <rect y="660" width="620" height="140" fill="var(--ocean-2)" opacity="0.28" />
      <path
        d="M0 660 Q 40 654 80 660 T 160 660 T 240 660 T 320 660 T 400 660 T 480 660 T 560 660 T 640 660"
        fill="none"
        stroke="var(--ocean-2)"
        strokeWidth="2"
      />

      <g opacity={dim}>
        {/* Grand-voile (tête carrée) */}
        <path d="M320 34 L284 40 Q 186 300 134 580 L320 578 Z" fill={SAIL} stroke={INK} strokeWidth="1.5" />
        {[140, 250, 360, 470].map((y, i) => (
          <line key={y} x1={320} y1={y} x2={288 - i * 30} y2={y + 4} stroke={INK} strokeOpacity="0.2" />
        ))}
        {/* Voile d'avant (J2) */}
        <path d="M468 616 L330 120 L372 600 Z" fill={SAIL} stroke={INK} strokeWidth="1.5" />
        {/* Étai et bout-dehors */}
        <line x1="321" y1="44" x2="532" y2="612" stroke={INK} strokeWidth="1.2" />
        <line x1="492" y1="612" x2="534" y2="610" stroke={INK} strokeWidth="3" />
        {/* Haubans et barres de flèche */}
        <line x1="321" y1="48" x2="300" y2="622" stroke={INK} strokeWidth="1" />
        <line x1="321" y1="48" x2="346" y2="622" stroke={INK} strokeWidth="1" />
        <line x1="306" y1="230" x2="338" y2="230" stroke={INK} strokeWidth="2" />
        <line x1="303" y1="400" x2="342" y2="400" stroke={INK} strokeWidth="2" />
        {/* Mât */}
        <rect x="317" y="28" width="7" height="598" fill={INK} />
        {/* Capteurs en tête de mât */}
        <line x1="320" y1="28" x2="320" y2="12" stroke={INK} strokeWidth="2" />
        <path d="M313 12 h14 M320 8 v6" stroke={INK} strokeWidth="2" />
        {/* Bôme */}
        <path d="M320 578 L132 584" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Quille, bulbe */}
      <path d="M296 650 L304 650 L303 742 L297 742 Z" fill="#475a6c" />
      <path d="M262 752 Q 300 738 344 752 Q 300 766 262 752 Z" fill="#16324f" />
      {/* Foil (vu de profil, sortant du flanc) */}
      <path
        d="M392 640 Q 398 690 412 704 Q 430 712 452 704"
        fill="none"
        stroke="#c98f00"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Safran */}
      <path d="M108 646 L120 646 L118 722 L110 722 Z" fill="#475a6c" />
      {/* Hydrogénérateur */}
      <path d="M90 636 L74 676" stroke={INK} strokeWidth="3" />
      <ellipse cx="73" cy="680" rx="6" ry="3" fill={INK} />

      {/* Coque */}
      <path
        d="M90 604 L470 596 Q 500 598 504 618 Q 500 642 482 656 L118 656 Q 94 652 90 640 Z"
        fill={HULL}
        fillOpacity={cutaway ? 0.35 : 1}
        stroke={INK}
        strokeWidth="2.5"
      />
      <path
        d="M90 640 L118 656 L482 656"
        fill="none"
        stroke="#f2b705"
        strokeWidth="4"
        opacity={cutaway ? 0.4 : 1}
      />
      {/* Roof et casquette */}
      <path
        d="M210 600 L250 584 L372 582 L390 598 Z"
        fill="#e3d9c6"
        fillOpacity={cutaway ? 0.3 : 1}
        stroke={INK}
        strokeWidth="1.5"
      />
      {!cutaway && (
        <>
          {/* Hublots */}
          {[268, 296, 324, 352].map((x) => (
            <rect key={x} x={x} y="588" width="18" height="6" rx="2" fill={INK} />
          ))}
          {/* Panneaux solaires */}
          <rect x="255" y="580" width="60" height="4" fill="#1e3a5f" />
          <rect x="400" y="594" width="50" height="3" fill="#1e3a5f" />
          {/* Winchs et moulin à café */}
          <rect x="222" y="594" width="10" height="9" rx="2" fill={INK} />
          <rect x="196" y="596" width="9" height="8" rx="2" fill={INK} />
          <rect x="252" y="590" width="5" height="14" fill={INK} />
          <path d="M246 590 h17" stroke={INK} strokeWidth="2" />
          {/* Caméra */}
          <circle cx="368" cy="586" r="4" fill={INK} />
        </>
      )}

      {cutaway && (
        <g>
          {/* Ballasts */}
          <rect x="128" y="630" width="50" height="20" rx="3" fill="var(--ocean-3)" opacity="0.8" />
          <rect x="420" y="626" width="44" height="22" rx="3" fill="var(--ocean-3)" opacity="0.8" />
          {/* Pilote (vérin vers le safran) */}
          <rect x="104" y="620" width="22" height="9" rx="2" fill="#7d8d99" stroke={INK} />
          {/* Radeau de survie */}
          <rect x="172" y="618" width="26" height="14" rx="4" fill="#f28c28" stroke={INK} />
          {/* Moteur */}
          <rect x="232" y="628" width="30" height="20" rx="3" fill="#5b6b78" stroke={INK} />
          {/* Puits de quille et vérins */}
          <rect x="288" y="616" width="24" height="36" fill="#9fb0bd" stroke={INK} />
          <line x1="278" y1="630" x2="292" y2="644" stroke="#d64545" strokeWidth="4" />
          <line x1="322" y1="630" x2="308" y2="644" stroke="#d64545" strokeWidth="4" />
          {/* Bannette (siège-baquet) */}
          <path d="M326 618 q 6 18 20 18 h 4 v 10 h -26 z" fill="#d64545" opacity="0.85" stroke={INK} />
          {/* Table à cartes et écrans */}
          <rect x="360" y="614" width="30" height="5" fill={INK} />
          <rect x="362" y="602" width="12" height="10" fill="#16324f" stroke="#f2b705" />
          <rect x="376" y="602" width="12" height="10" fill="#16324f" stroke="#f2b705" />
          {/* Sacs de voiles */}
          <ellipse cx="455" cy="616" rx="14" ry="8" fill="#e3d9c6" stroke={INK} />
        </g>
      )}

      <Human x={186} y={600} />
    </svg>
  );
}

/** Vue de dessus. */
export function ImocaTop() {
  return (
    <svg viewBox={`0 0 ${TOP_VIEWBOX.w} ${TOP_VIEWBOX.h}`} className="h-auto w-full" aria-hidden>
      <rect width="640" height="360" fill="var(--ocean-2)" opacity="0.18" />
      {/* Foils : l'un sorti (au vent), l'autre rentré */}
      <path d="M392 118 Q 396 70 430 52" fill="none" stroke="#c98f00" strokeWidth="9" strokeLinecap="round" />
      <path
        d="M392 242 Q 396 258 404 264"
        fill="none"
        stroke="#c98f00"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Safrans */}
      <rect x="104" y="128" width="16" height="6" fill="#475a6c" />
      <rect x="104" y="226" width="16" height="6" fill="#475a6c" />
      {/* Hydrogénérateurs */}
      <path d="M100 140 L84 136 M100 220 L84 224" stroke="#0b2239" strokeWidth="3" />
      {/* Coque */}
      <path
        d="M100 116 C 260 106 420 118 492 160 Q 510 180 492 200 C 420 242 260 254 100 244 Z"
        fill={HULL}
        stroke={INK}
        strokeWidth="2.5"
      />
      {/* Bout-dehors */}
      <line x1="500" y1="180" x2="542" y2="180" stroke={INK} strokeWidth="4" />
      {/* Étai */}
      <line x1="330" y1="180" x2="540" y2="180" stroke={INK} strokeWidth="1" strokeDasharray="4 3" />
      {/* Roof avec panneaux solaires */}
      <rect x="236" y="142" width="120" height="76" rx="14" fill="#e3d9c6" stroke={INK} strokeWidth="1.5" />
      <rect x="252" y="150" width="40" height="22" fill="#1e3a5f" />
      <rect x="252" y="188" width="40" height="22" fill="#1e3a5f" />
      {/* Cockpit */}
      <rect x="128" y="146" width="104" height="68" rx="10" fill="#d8cdb7" stroke={INK} strokeWidth="1.5" />
      {/* Winchs */}
      {[
        [150, 156],
        [150, 204],
        [200, 156],
        [200, 204],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={INK} />
      ))}
      {/* Moulin à café */}
      <circle cx="176" cy="180" r="9" fill="#5b6b78" stroke={INK} strokeWidth="2" />
      <path d="M166 180 h20" stroke={INK} strokeWidth="2" />
      {/* Bôme */}
      <line
        x1="330"
        y1="180"
        x2="140"
        y2="180"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Haubans */}
      <line x1="330" y1="180" x2="318" y2="124" stroke={INK} strokeWidth="1.2" />
      <line x1="330" y1="180" x2="318" y2="236" stroke={INK} strokeWidth="1.2" />
      {/* Mât */}
      <circle cx="330" cy="180" r="7" fill={INK} />
      {/* Quille (sous la coque, en pointillés) */}
      <ellipse cx="300" cy="180" rx="44" ry="8" fill="none" stroke="#16324f" strokeDasharray="4 3" />
    </svg>
  );
}

/**
 * Positions des points cliquables, en pourcentage de la largeur / hauteur du dessin.
 * (x, y) : position du bouton. (ax, ay) : point exact de la pièce, relié par un trait
 * quand le bouton est décalé pour ne pas en chevaucher un autre.
 * Clé = identifiant de la pièce (content/fr/imoca.ts).
 */
export type Spot = { x: number; y: number; ax?: number; ay?: number };

const at =
  (vb: { w: number; h: number }) =>
  (x: number, y: number, ax?: number, ay?: number): Spot => ({
    x: (x / vb.w) * 100,
    y: (y / vb.h) * 100,
    ...(ax !== undefined && ay !== undefined ? { ax: (ax / vb.w) * 100, ay: (ay / vb.h) * 100 } : {}),
  });
const P = at(PROFILE_VIEWBOX);
const T = at(TOP_VIEWBOX);

export const HOTSPOTS: Record<"profil" | "dessus" | "ecorche", Record<string, Spot>> = {
  profil: {
    electronique: P(320, 14),
    "mat-aile": P(352, 120, 322, 120),
    mat: P(320, 300),
    "grand-voile": P(236, 380),
    haubans: P(336, 440),
    etai: P(436, 330),
    "voiles-avant": P(400, 520),
    bome: P(90, 455, 180, 582),
    moulin: P(70, 505, 254, 592),
    winchs: P(52, 550, 226, 598),
    cockpit: P(36, 600, 160, 600),
    roof: P(585, 470, 312, 588),
    cameras: P(585, 520, 368, 586),
    solaire: P(585, 570, 425, 595),
    etrave: P(585, 630, 502, 625),
    coque: P(400, 642),
    hydro: P(52, 690, 74, 678),
    safrans: P(114, 712),
    quille: P(300, 700),
    foils: P(452, 704),
    derives: P(400, 730),
    bulbe: P(300, 776),
  },
  dessus: {
    safrans: T(100, 36, 112, 131),
    winchs: T(170, 36, 200, 156),
    solaire: T(240, 36, 272, 161),
    haubans: T(310, 36, 318, 124),
    roof: T(370, 36, 340, 150),
    foils: T(440, 36, 428, 56),
    etrave: T(600, 120, 502, 178),
    hydro: T(60, 322, 84, 224),
    cockpit: T(140, 322, 150, 204),
    moulin: T(210, 322, 176, 180),
    bome: T(270, 322, 250, 180),
    quille: T(330, 322, 300, 188),
    mat: T(390, 322, 330, 180),
    etai: T(450, 322, 440, 180),
    coque: T(520, 322, 430, 225),
  },
  ecorche: {
    pilote: P(60, 560, 115, 624),
    ballasts: P(130, 520, 153, 640),
    survie: P(190, 490, 185, 625),
    moteur: P(240, 550, 247, 638),
    verins: P(290, 520, 300, 634),
    bannette: P(370, 560, 336, 630),
    "table-a-cartes": P(440, 520, 375, 607),
    quille: P(300, 700),
    bulbe: P(300, 776),
  },
};
