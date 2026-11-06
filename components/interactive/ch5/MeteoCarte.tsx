"use client";

import { useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

type Item = "high" | "low" | "isobars" | "arrows" | "front";

const r2 = (n: number) => Math.round(n * 10) / 10;

/** Flèches de vent autour d'un centre (dépression : sens inverse des aiguilles d'une montre). */
function windArrows(cx: number, cy: number, radius: number, ccw: boolean, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const x = cx + radius * Math.cos(a);
    const y = cy - radius * Math.sin(a);
    // Tangente + petite composante vers le centre (dépression) ou vers l'extérieur (anticyclone).
    let dx = ccw ? -Math.sin(a) : Math.sin(a);
    let dy = ccw ? -Math.cos(a) : Math.cos(a);
    const inward = ccw ? 0.35 : -0.35;
    dx += -Math.cos(a) * inward;
    dy += Math.sin(a) * inward;
    const len = Math.hypot(dx, dy);
    return { x: r2(x), y: r2(y), dx: r2((dx / len) * 16), dy: r2((dy / len) * 16) };
  });
}

/** Carte météo simplifiée, avec des éléments cliquables. */
export function MeteoCarte() {
  const t = useIX().meteoCarte;
  const [item, setItem] = useState<Item | null>(null);

  const hit = (it: Item) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-label": t.items[it].label,
    "aria-pressed": item === it,
    onClick: () => setItem(it),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setItem(it);
      }
    },
    className: "cursor-pointer outline-none focus-visible:[filter:drop-shadow(0_0_4px_var(--accent))]",
  });

  const hl = (it: Item) => (item === it ? 1 : item ? 0.35 : 0.9);
  const lowArrows = windArrows(120, 105, 62, true, 8);
  const highArrows = windArrows(300, 170, 70, false, 8);

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <svg viewBox="0 0 420 270" className="bg-ocean-2/10 h-auto w-full rounded-2xl">
          <defs>
            <marker
              id="mc-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--fg)" />
            </marker>
          </defs>
          {/* Côte stylisée */}
          <path
            d="M360 0 L420 0 L420 120 Q 400 110 392 80 Q 370 60 380 30 Z"
            fill="var(--bg-deep)"
            stroke="var(--line)"
          />

          {/* Isobares */}
          <g {...hit("isobars")} opacity={hl("isobars")}>
            {[18, 34, 50, 66, 82].map((r) => (
              <ellipse
                key={`l${r}`}
                cx="120"
                cy="105"
                rx={r * 1.15}
                ry={r}
                fill="none"
                stroke="var(--ocean-2)"
                strokeWidth={item === "isobars" ? 2.4 : 1.4}
              />
            ))}
            {[40, 75, 110].map((r) => (
              <ellipse
                key={`h${r}`}
                cx="300"
                cy="170"
                rx={r * 1.25}
                ry={r * 0.85}
                fill="none"
                stroke="var(--ocean-2)"
                strokeWidth={item === "isobars" ? 2.4 : 1.4}
              />
            ))}
            <text x="196" y="44" fontSize="9" fill="var(--muted)">
              1000 hPa
            </text>
            <text x="300" y="68" fontSize="9" fill="var(--muted)">
              1025 hPa
            </text>
          </g>

          {/* Front froid */}
          <g {...hit("front")} opacity={hl("front")}>
            <path d="M150 160 Q 120 200 70 250" fill="none" stroke="#2a6fdb" strokeWidth="3.5" />
            {[0.15, 0.4, 0.65, 0.9].map((p, i) => {
              const x = 150 - p * 80;
              const y = 160 + p * 90;
              return <path key={i} d={`M${x} ${y} l9 3 l-6 7 z`} fill="#2a6fdb" />;
            })}
            <path d="M150 160 L 200 180" stroke="transparent" strokeWidth="18" />
          </g>

          {/* Flèches de vent */}
          <g {...hit("arrows")} opacity={hl("arrows")}>
            {[...lowArrows, ...highArrows].map((a, i) => (
              <line
                key={i}
                x1={a.x - a.dx / 2}
                y1={a.y - a.dy / 2}
                x2={a.x + a.dx / 2}
                y2={a.y + a.dy / 2}
                stroke="var(--fg)"
                strokeWidth="1.6"
                markerEnd="url(#mc-arrow)"
              />
            ))}
          </g>

          {/* Centres */}
          <g {...hit("low")} opacity={hl("low")}>
            <circle cx="120" cy="105" r="16" fill="#d64545" />
            <text x="120" y="111" textAnchor="middle" fontSize="17" fontWeight="800" fill="white">
              D
            </text>
          </g>
          <g {...hit("high")} opacity={hl("high")}>
            <circle cx="300" cy="170" r="16" fill="#135e8a" />
            <text x="300" y="176" textAnchor="middle" fontSize="17" fontWeight="800" fill="white">
              A
            </text>
          </g>
        </svg>

        <div aria-live="polite">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(t.items) as Item[]).map((it) => (
              <button
                key={it}
                type="button"
                onClick={() => setItem(it)}
                aria-pressed={item === it}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium",
                  item === it ? "border-accent bg-accent text-on-accent" : "border-line hover:border-fg/40",
                )}
              >
                {t.items[it].label}
              </button>
            ))}
          </div>
          <div className="bg-bg-deep/60 mt-3 rounded-2xl p-4">
            {item ? (
              <>
                <p className="font-serif text-xl font-semibold">{t.items[item].label}</p>
                <p className="mt-1 leading-relaxed">{t.items[item].text}</p>
              </>
            ) : (
              <p className="text-muted">{t.pick}</p>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
}
