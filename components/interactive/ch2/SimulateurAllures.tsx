"use client";

import { useCallback, useId, useRef, useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { BoatTop } from "@/components/decor/BoatTop";
import {
  ALLURES,
  allureOf,
  boatSpeed,
  KNOT_KMH,
  sailTrim,
  tack,
  twaFromHeading,
  WIND_STRENGTHS,
  wrap180,
  type AllureId,
  type WindStrength,
} from "@/lib/sailing";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

const SECTOR_COLORS: Record<AllureId, string> = {
  "zone-morte": "#d64545",
  pres: "#135e8a",
  "bon-plein": "#2a78a6",
  travers: "#3f8fb8",
  largue: "#c98f00",
  "grand-largue": "#e0a400",
  "vent-arriere": "#f2b705",
};

/** Point sur un cercle : angle en degrés depuis le haut, sens horaire. */
function polar(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  // Arrondi : évite les écarts de calcul entre serveur et navigateur.
  return [Math.round(r * Math.sin(a) * 100) / 100, Math.round(-r * Math.cos(a) * 100) / 100];
}

/** Secteur d'anneau entre deux angles. */
function ring(r1: number, r2: number, a0: number, a1: number) {
  const [x0, y0] = polar(r2, a0);
  const [x1, y1] = polar(r2, a1);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r1, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0} A${r2} ${r2} 0 ${large} ${sweep} ${x1} ${y1} L${x2} ${y2} A${r1} ${r1} 0 ${large} ${1 - sweep} ${x3} ${y3} Z`;
}

const fmt = (n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

/**
 * Simulateur d'allures : on fait tourner le bateau par rapport au vent,
 * et l'on voit l'allure, le réglage des voiles et la vitesse (polaire).
 */
export function SimulateurAllures() {
  const t = useIX().allures;
  const sliderId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const [heading, setHeading] = useState(60);
  const [tws, setTws] = useState<WindStrength>(15);

  const twa = Math.round(twaFromHeading(heading));
  const allure = allureOf(twa);
  const side = tack(heading);
  const speed = boatSpeed(twa, tws);
  const trim = sailTrim(heading);
  const valueText = t.valueText(t.names[allure], twa, t.tack[side], fmt(speed));

  const setFromPointer = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < 8) return;
    setHeading(Math.round((Math.atan2(dx, -dy) * 180) / Math.PI));
  }, []);

  function onKey(e: React.KeyboardEvent) {
    const step = e.shiftKey || e.key === "PageUp" || e.key === "PageDown" ? 15 : 5;
    if (["ArrowRight", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      setHeading((h) => wrap180(h + step));
    } else if (["ArrowLeft", "ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      setHeading((h) => wrap180(h - step));
    }
  }

  return (
    <Frame title={t.title} intro={t.help}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* La rose des allures */}
        <div className="mx-auto w-full max-w-[460px]">
          <svg
            ref={svgRef}
            viewBox="-150 -160 300 310"
            className="h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing"
            role="slider"
            tabIndex={0}
            aria-label={t.slider}
            aria-valuemin={-180}
            aria-valuemax={180}
            aria-valuenow={Math.round(wrap180(heading))}
            aria-valuetext={valueText}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as Element).setPointerCapture?.(e.pointerId);
              setFromPointer(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => dragging.current && setFromPointer(e.clientX, e.clientY)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* Mer */}
            <circle r="132" fill="var(--ocean-2)" opacity="0.12" />

            {/* Secteurs des allures, des deux côtés */}
            {ALLURES.map((a) => (
              <g key={a.id} opacity={a.id === allure ? 0.95 : 0.35}>
                <path d={ring(112, 132, a.from, Math.min(a.to, 180))} fill={SECTOR_COLORS[a.id]} />
                <path d={ring(112, 132, -Math.min(a.to, 180), -a.from)} fill={SECTOR_COLORS[a.id]} />
              </g>
            ))}
            {/* Graduations */}
            {Array.from({ length: 36 }, (_, i) => i * 10).map((d) => {
              const [x1, y1] = polar(112, d);
              const [x2, y2] = polar(d % 30 === 0 ? 104 : 108, d);
              return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fg)" strokeOpacity="0.35" />;
            })}

            {/* Vent qui vient du haut */}
            <g aria-hidden>
              {[-24, 0, 24].map((x) => (
                <g key={x}>
                  <line
                    x1={x}
                    y1={-158}
                    x2={x}
                    y2={-138}
                    stroke="var(--ocean-2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path d={`M${x - 5} -141 L${x} -133 L${x + 5} -141 Z`} fill="var(--ocean-2)" />
                </g>
              ))}
              <text x="34" y="-144" fontSize="12" fontWeight="700" fill="var(--ocean-2)">
                {t.wind} · {tws} {t.knots}
              </text>
            </g>

            {/* Le bateau */}
            <g style={{ transform: `rotate(${heading}deg)`, transformOrigin: "0 0" }}>
              <g transform="scale(1.25)">
                <BoatTop main={trim.main} jib={trim.jib} flapping={trim.flapping} />
              </g>
              {/* Poignée à l'avant */}
              <circle cy="-104" r="9" fill="var(--accent)" stroke="var(--fg)" strokeWidth="2" />
              <path d="M-4 -104 h8 M0 -108 v8" stroke="var(--fg)" strokeWidth="2" />
            </g>

            {/* Nom de l'allure */}
            <text
              y="146"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="var(--fg)"
              fontFamily="var(--font-serif)"
            >
              {t.names[allure]}
            </text>
          </svg>
        </div>

        {/* Lecture et polaire */}
        <div className="flex flex-col gap-4">
          <div aria-live="polite" className="bg-ocean-1 rounded-2xl p-4 text-[#f3ecdf]">
            <p className="font-serif text-3xl font-semibold text-white">{t.names[allure]}</p>
            <p className="mt-1 text-sm opacity-85">
              {t.angle} : <strong className="font-mono">{twa}°</strong>
              {t.tack[side] && <> · {t.tack[side]}</>}
            </p>
            <p className="mt-2">
              {t.speed} : <strong className="text-cire font-mono text-2xl">{fmt(speed)}</strong> {t.knots}{" "}
              <span className="text-sm opacity-80">({fmt(speed * KNOT_KMH)} km/h)</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed opacity-90">{t.tips[allure]}</p>
          </div>

          <div>
            <label htmlFor={sliderId} className="text-sm font-semibold">
              {t.slider}
            </label>
            <input
              id={sliderId}
              type="range"
              min={-180}
              max={180}
              step={1}
              value={Math.round(wrap180(heading))}
              onChange={(e) => setHeading(Number(e.target.value))}
              aria-valuetext={valueText}
              className="mt-2 w-full cursor-pointer accent-[var(--accent-strong)]"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-semibold">{t.windStrength}</legend>
            <div className="mt-2 flex gap-2">
              {WIND_STRENGTHS.map((w) => (
                <button
                  key={w}
                  type="button"
                  aria-pressed={tws === w}
                  onClick={() => setTws(w)}
                  className={cn(
                    "min-h-11 flex-1 rounded-xl border-2 px-3 font-mono text-sm font-bold transition",
                    tws === w ? "border-accent bg-accent text-on-accent" : "border-line hover:border-fg/40",
                  )}
                >
                  {w} {t.knots}
                </button>
              ))}
            </div>
          </fieldset>

          <Polar twa={twa} tws={tws} title={t.polarTitle} caption={t.polarCaption} knots={t.knots} />
        </div>
      </div>
    </Frame>
  );
}

/** Diagramme polaire : vitesse selon l'angle au vent, pour les 3 forces de vent. */
function Polar({
  twa,
  tws,
  title,
  caption,
  knots,
}: {
  twa: number;
  tws: WindStrength;
  title: string;
  caption: string;
  knots: string;
}) {
  const scale = 3.4; // px par nœud
  const curve = (w: WindStrength) => {
    const pts: string[] = [];
    for (let a = 38; a <= 180; a += 2) {
      const [x, y] = polar(boatSpeed(a, w) * scale, a);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M0,0 L${pts.join(" L")}`;
  };
  const [px, py] = polar(boatSpeed(twa, tws) * scale, twa);

  return (
    <figure className="border-line rounded-2xl border p-3">
      <p className="text-sm font-semibold">{title}</p>
      <svg
        viewBox="-10 -105 115 210"
        className="mx-auto mt-1 h-auto w-full max-w-[170px]"
        role="img"
        aria-label={caption}
      >
        {[10, 20, 30].map((k) => (
          <g key={k}>
            <path
              d={`M0 ${-k * scale} A ${k * scale} ${k * scale} 0 0 1 0 ${k * scale}`}
              fill="none"
              stroke="var(--fg)"
              strokeOpacity="0.15"
            />
            <text x="2" y={-k * scale + 9} fontSize="7" fill="var(--muted)">
              {k} {knots}
            </text>
          </g>
        ))}
        <line x1="0" y1="-104" x2="0" y2="104" stroke="var(--fg)" strokeOpacity="0.3" />
        {/* Zone morte */}
        <path
          d={`M0 0 L${polar(102, 0)[0]} ${polar(102, 0)[1]} A102 102 0 0 1 ${polar(102, 38).join(" ")} Z`}
          fill="#d64545"
          opacity="0.12"
        />
        {WIND_STRENGTHS.map((w) => (
          <path
            key={w}
            d={curve(w)}
            fill="none"
            stroke={w === tws ? "var(--ocean-2)" : "var(--fg)"}
            strokeOpacity={w === tws ? 1 : 0.25}
            strokeWidth={w === tws ? 2.5 : 1.2}
          />
        ))}
        <line
          x1="0"
          y1="0"
          x2={px}
          y2={py}
          stroke="var(--accent-strong)"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <circle cx={px} cy={py} r="5" fill="var(--accent)" stroke="var(--fg)" strokeWidth="1.5" />
      </svg>
      <figcaption className="text-muted mt-1 text-xs leading-relaxed">{caption}</figcaption>
    </figure>
  );
}
