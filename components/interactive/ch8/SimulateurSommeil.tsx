"use client";

import { useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { Moussaillon } from "@/components/mascotte/Moussaillon";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLOT = 20; // minutes par case
const SLOTS = (24 * 60) / SLOT; // 72 cases
const fmt = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, "0")}h${String(min % 60).padStart(2, "0")}`;

/**
 * Modèle volontairement simple : la fatigue monte quand on est éveillé,
 * baisse quand on dort (moins vite pendant les premières minutes, le temps
 * de s'endormir). Les longs sommeils d'affilée laissent le bateau sans surveillance.
 */
function simulate(sleep: boolean[]) {
  let f = 45;
  const curve: number[] = [];
  let longest = 0;
  let run = 0;
  sleep.forEach((s, k) => {
    if (s) {
      run += 1;
      f -= run === 1 ? 3 : 7;
    } else {
      run = 0;
      f += 2;
    }
    longest = Math.max(longest, run);
    f = Math.max(0, Math.min(100, f));
    curve[k] = f;
  });
  const total = sleep.filter(Boolean).length * SLOT;
  return { curve, max: Math.max(...curve), end: curve[curve.length - 1], total, longest: longest * SLOT };
}

const presetSkipper = () =>
  Array.from({ length: SLOTS }, (_, k) => {
    // Siestes de 20 à 40 minutes, plus nombreuses la nuit.
    const night = k < 18 || k >= 63;
    return night ? k % 4 === 0 || k % 4 === 1 : k % 9 === 4;
  });
const presetLand = () => Array.from({ length: SLOTS }, (_, k) => k < 21 || k >= 69);

/** Simulateur : placer ses siestes sur 24 h et voir la jauge de fatigue. */
export function SimulateurSommeil() {
  const t = useIX().sommeil;
  const [sleep, setSleep] = useState<boolean[]>(() => Array(SLOTS).fill(false));
  const { curve, max, end, total, longest } = simulate(sleep);
  const anySleep = total > 0;

  const risks: string[] = [];
  if (longest > 60) risks.push(t.riskLong);
  if (max > 85) risks.push(t.riskTired);
  if (total < 180 && anySleep) risks.push(t.riskTooLittle);
  if (!anySleep) risks.push(t.riskNone);
  const good = anySleep && risks.length === 0;

  const toggle = (k: number) => setSleep((s) => s.map((v, j) => (j === k ? !v : v)));

  // Courbe de fatigue (sparkline)
  const W = 360;
  const H = 70;
  const pts = curve.map((v, k) => `${((k + 1) / SLOTS) * W},${H - (v / 100) * H}`).join(" ");

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setSleep(presetLand())}>
          {t.presetLand}
        </Button>
        <Button variant="secondary" onClick={() => setSleep(presetSkipper())}>
          {t.presetSkipper}
        </Button>
        <Button variant="ghost" onClick={() => setSleep(Array(SLOTS).fill(false))}>
          {t.clear}
        </Button>
      </div>

      {/* Grille de 24 h : 6 lignes de 4 heures, cases de 20 minutes */}
      <div className="mt-4 space-y-1.5" role="group" aria-label={t.gridLabel}>
        {Array.from({ length: 6 }, (_, row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="text-muted w-12 shrink-0 text-xs tabular-nums">{fmt(row * 240)}</span>
            <div className="grid flex-1 grid-cols-12 gap-0.5">
              {Array.from({ length: 12 }, (_, col) => {
                const k = row * 12 + col;
                const start = k * SLOT;
                const night = start < 6 * 60 || start >= 21 * 60;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={sleep[k]}
                    aria-label={`${fmt(start)}–${fmt(start + SLOT)} : ${sleep[k] ? t.asleep : t.awake}`}
                    onClick={() => toggle(k)}
                    className={cn(
                      "h-8 rounded-sm border transition sm:h-9",
                      sleep[k]
                        ? "border-ocean-2 bg-ocean-2"
                        : night
                          ? "border-line bg-ocean-1/15 hover:bg-ocean-2/30"
                          : "border-line bg-accent/10 hover:bg-ocean-2/30",
                      col % 3 === 0 && "ml-0.5",
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <p className="text-muted flex flex-wrap gap-4 pt-1 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-ocean-2 inline-block size-3 rounded-sm" aria-hidden /> {t.legendSleep}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-ocean-1/15 border-line inline-block size-3 rounded-sm border" aria-hidden />{" "}
            {t.legendNight}
          </span>
        </p>
      </div>

      {/* Jauge et bilan */}
      <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold">{t.fatigue}</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="bg-bg-deep/60 mt-1 h-auto w-full rounded-xl" aria-hidden>
            <rect x="0" y="0" width={W} height={H * 0.15} fill="#d64545" opacity="0.15" />
            <polyline points={pts} fill="none" stroke="var(--accent-strong)" strokeWidth="2.5" />
          </svg>
          <div className="mt-2 flex items-center gap-3">
            <div className="bg-line h-3 flex-1 overflow-hidden rounded-full" aria-hidden>
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  end > 85 ? "bg-danger" : end > 60 ? "bg-accent" : "bg-success",
                )}
                style={{ width: `${end}%` }}
              />
            </div>
            <span className="font-mono text-sm">{Math.round(end)} %</span>
          </div>
          <p className="text-muted mt-1 text-xs">{t.modelNote}</p>
        </div>
        <div aria-live="polite" className="flex items-start gap-3">
          <Moussaillon mood={good ? "happy" : max > 85 ? "sleepy" : "curious"} className="w-16 shrink-0" />
          <div className="text-sm">
            <p>
              {t.total} :{" "}
              <strong className="font-mono">
                {Math.floor(total / 60)} h {String(total % 60).padStart(2, "0")}
              </strong>
            </p>
            <p>
              {t.longest} : <strong className="font-mono">{longest} min</strong>
            </p>
            {good ? (
              <p className="text-success mt-2 font-semibold">{t.good}</p>
            ) : (
              <ul className="text-danger mt-2 space-y-1">
                {risks.map((r) => (
                  <li key={r}>⚠ {r}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
}
