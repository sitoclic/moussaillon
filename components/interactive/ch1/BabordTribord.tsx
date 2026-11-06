"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useIX } from "@/components/providers/I18nProvider";
import { BoatTop } from "@/components/decor/BoatTop";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Zone = "babord" | "tribord" | "proue" | "poupe";
const ZONES: Zone[] = ["babord", "tribord", "proue", "poupe"];

/** Centre de chaque zone, dans le repère du bateau (avant vers le haut). */
const CENTERS: Record<Zone, [number, number]> = {
  proue: [0, -55],
  poupe: [0, 50],
  babord: [-22, 0],
  tribord: [22, 0],
};

/** Formes cliquables, dans le repère du bateau. */
const SHAPES: Record<Zone, string> = {
  proue: "M0 -78 L34 -36 L-34 -36 Z",
  poupe: "M-34 36 L34 36 L34 68 L-34 68 Z",
  babord: "M0 -36 L-40 -36 L-40 36 L0 36 Z",
  tribord: "M0 -36 L40 -36 L40 36 L0 36 Z",
};

function pick<T>(list: T[], not?: T): T {
  const pool = list.filter((x) => x !== not);
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Direction (sur l'écran) d'un point du bateau après rotation, en 8 secteurs. */
function screenDir([x, y]: [number, number], rotation: number) {
  const r = (rotation * Math.PI) / 180;
  const sx = x * Math.cos(r) - y * Math.sin(r);
  const sy = x * Math.sin(r) + y * Math.cos(r);
  // 0 = haut, sens horaire
  const deg = ((Math.atan2(sx, -sy) * 180) / Math.PI + 360) % 360;
  return Math.round(deg / 45) % 8;
}

/** Jeu : retrouver bâbord, tribord, la proue et la poupe sur un bateau qui tourne. */
export function BabordTribord() {
  const t = useIX().babordTribord;
  const reduce = useReducedMotion();
  // Valeurs de départ fixes (identiques au rendu serveur), puis tirées au hasard.
  const [rotation, setRotation] = useState(150);
  const [target, setTarget] = useState<Zone>("tribord");
  const [answer, setAnswer] = useState<Zone | null>(null);
  const [streak, setStreak] = useState(0);
  const [help, setHelp] = useState(false);

  const correct = answer === target;
  const revealed = answer !== null || help;

  function choose(z: Zone) {
    if (answer) return;
    setAnswer(z);
    setStreak((s) => (z === target ? s + 1 : 0));
  }

  function next() {
    setAnswer(null);
    setTarget((prev) => pick(ZONES, prev));
    setRotation((prev) => {
      let r = prev;
      while (Math.abs(r - prev) < 60) r = Math.floor(Math.random() * 12) * 30;
      return r;
    });
  }

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="grid items-start gap-6 md:grid-cols-[1fr_1fr]">
        <div className="relative mx-auto w-full max-w-[340px]">
          <svg viewBox="-110 -110 220 220" className="h-auto w-full touch-manipulation select-none">
            {/* Mer */}
            <circle r="106" fill="var(--ocean-2)" opacity="0.18" />
            <circle r="106" fill="none" stroke="var(--ocean-2)" strokeOpacity="0.3" strokeDasharray="3 5" />
            <g
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "0 0",
                transition: reduce ? "none" : "transform 0.7s cubic-bezier(.3,1.3,.5,1)",
              }}
            >
              <BoatTop main={0} jib={0} lights={revealed} />
              {/* Flèche « regard vers l'avant » */}
              {revealed && (
                <g opacity="0.7">
                  <path d="M0 -84 l-6 9 h12 z" fill="var(--fg)" />
                </g>
              )}
              {/* Zones cliquables */}
              {ZONES.map((z) => {
                const isAnswer = answer === z;
                const isTarget = answer !== null && z === target;
                return (
                  <path
                    key={z}
                    d={SHAPES[z]}
                    role="button"
                    tabIndex={answer ? -1 : 0}
                    aria-label={t.zoneLabel(t.dirs[screenDir(CENTERS[z], rotation)])}
                    onClick={() => choose(z)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        choose(z);
                      }
                    }}
                    className={cn(
                      "cursor-pointer transition-[fill-opacity] outline-none focus-visible:stroke-[var(--accent-strong)] focus-visible:stroke-[3]",
                      !answer && "hover:[fill-opacity:0.25]",
                    )}
                    fill={isTarget ? "#1d9a55" : isAnswer ? "#d64545" : "var(--accent)"}
                    fillOpacity={isTarget || isAnswer ? 0.45 : 0}
                    stroke="transparent"
                  />
                );
              })}
              {/* Repères textuels */}
              {revealed &&
                ZONES.map((z) => {
                  const [x, y] = CENTERS[z];
                  return (
                    <text
                      key={z}
                      x={x * (z === "babord" || z === "tribord" ? 2.6 : 1)}
                      y={y * (z === "proue" ? 1.35 : z === "poupe" ? 1.6 : 1)}
                      transform={`rotate(${-rotation} ${x * (z === "babord" || z === "tribord" ? 2.6 : 1)} ${y * (z === "proue" ? 1.35 : z === "poupe" ? 1.6 : 1)})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--fg)"
                      stroke="var(--surface)"
                      strokeWidth="4"
                      paintOrder="stroke"
                      pointerEvents="none"
                    >
                      {t.names[z]}
                    </text>
                  );
                })}
            </g>
          </svg>
        </div>

        <div>
          <p className="font-serif text-3xl font-semibold" aria-live="polite">
            {t.targets[target]}
          </p>
          <div aria-live="polite" className="mt-4 min-h-28">
            {answer && (
              <div className={cn("rounded-xl p-4", correct ? "bg-success/12" : "bg-danger/10")}>
                <p className={cn("font-semibold", correct ? "text-success" : "text-danger")}>
                  {correct ? t.right : t.wrong(t.names[answer])}
                </p>
                <p className="mt-1 leading-relaxed">
                  {target === "proue" || target === "poupe" ? t.explainEnds : t.explainSide}
                </p>
                <p className="text-muted mt-2 text-sm leading-relaxed">{t.lights}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={next} disabled={!answer}>
              {t.next}
            </Button>
            <Button variant="ghost" onClick={() => setHelp((h) => !h)} aria-pressed={help}>
              {help ? t.hideHelp : t.showHelp}
            </Button>
          </div>
          <p className="text-muted mt-3 font-mono text-xs">{t.streak(streak)}</p>
        </div>
      </div>
    </Frame>
  );
}
