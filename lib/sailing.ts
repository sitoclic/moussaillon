/**
 * Petite « physique » pédagogique de la voile.
 * Les valeurs de vitesse viennent d'une polaire IMAGINAIRE, inspirée
 * des ordres de grandeur d'un monocoque de course moderne : elles servent
 * à comprendre les tendances, pas à naviguer.
 */

export type AllureId =
  "zone-morte" | "pres" | "bon-plein" | "travers" | "largue" | "grand-largue" | "vent-arriere";

/** Bornes des allures, en degrés d'angle au vent réel (0 = face au vent). */
export const ALLURES: { id: AllureId; from: number; to: number }[] = [
  { id: "zone-morte", from: 0, to: 40 },
  { id: "pres", from: 40, to: 55 },
  { id: "bon-plein", from: 55, to: 75 },
  { id: "travers", from: 75, to: 105 },
  { id: "largue", from: 105, to: 135 },
  { id: "grand-largue", from: 135, to: 165 },
  { id: "vent-arriere", from: 165, to: 180.01 },
];

/** Ramène un angle entre -180 et 180. */
export function wrap180(a: number) {
  let x = ((((a + 180) % 360) + 360) % 360) - 180;
  if (x === -180) x = 180;
  return x;
}

/** Angle au vent réel (0 à 180) pour un cap donné, le vent venant du nord (0°). */
export function twaFromHeading(heading: number) {
  return Math.abs(wrap180(heading));
}

/** Côté par lequel le bateau reçoit le vent. */
export function tack(heading: number): "babord" | "tribord" | "aucun" {
  const h = wrap180(heading);
  if (Math.abs(h) < 0.5 || Math.abs(h) > 179.5) return "aucun";
  // Cap vers l'est (h > 0) : le vent du nord arrive sur le flanc gauche → bâbord amures.
  return h > 0 ? "babord" : "tribord";
}

export function allureOf(twa: number): AllureId {
  return (ALLURES.find((a) => twa >= a.from && twa < a.to) ?? ALLURES[ALLURES.length - 1]).id;
}

/** Forces de vent proposées (en nœuds) et polaire imaginaire associée. */
export const WIND_STRENGTHS = [8, 15, 25] as const;
export type WindStrength = (typeof WIND_STRENGTHS)[number];

const POLAR_ANGLES = [38, 40, 50, 60, 75, 90, 110, 130, 150, 165, 180];
const POLAR: Record<WindStrength, number[]> = {
  8: [0, 5.5, 7, 8, 9, 9.5, 10, 10, 8.5, 7, 6],
  15: [0, 8.5, 11, 13, 15.5, 17, 19, 20, 18, 15, 13],
  25: [0, 10, 13, 16, 20, 23, 26, 28, 27, 22, 18],
};

/** Vitesse indicative (nœuds) pour un angle au vent et une force de vent. */
export function boatSpeed(twa: number, tws: WindStrength): number {
  if (twa < POLAR_ANGLES[0]) return 0;
  const speeds = POLAR[tws];
  for (let i = 0; i < POLAR_ANGLES.length - 1; i++) {
    const a0 = POLAR_ANGLES[i];
    const a1 = POLAR_ANGLES[i + 1];
    if (twa >= a0 && twa <= a1) {
      const t = (twa - a0) / (a1 - a0);
      return speeds[i] + t * (speeds[i + 1] - speeds[i]);
    }
  }
  return speeds[speeds.length - 1];
}

/**
 * Réglage des voiles : angle de la bôme et du foc par rapport à l'axe du bateau,
 * en degrés, positif vers tribord. Les voiles se placent toujours sous le vent.
 */
export function sailTrim(heading: number) {
  const twa = twaFromHeading(heading);
  const side = tack(heading) === "tribord" ? -1 : 1; // sous le vent
  const flapping = twa < 38;
  const main = flapping ? 0 : Math.min(85, Math.max(5, (twa - 25) * 0.55));
  const jib = flapping ? 0 : Math.min(70, Math.max(8, (twa - 25) * 0.45));
  return { main: main * side, jib: jib * side, flapping };
}

export const KNOT_KMH = 1.852;
