"use client";

import { useRef, useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { WorldMap } from "@/components/decor/WorldMap";
import { distanceNm, formatCoord, project } from "@/lib/world";
import { Frame } from "../Frame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Toucher la carte donne la latitude et la longitude ; des missions à remplir. */
export function Coordonnees() {
  const t = useIX().coordonnees;
  const svgRef = useRef<SVGSVGElement>(null);
  const [pt, setPt] = useState<[number, number] | null>(null); // [lon, lat]
  const [mission, setMission] = useState(0);
  const m = t.missions[mission];
  const dist = pt ? Math.round(distanceNm(pt, [m.lon, m.lat])) : null;
  const found = dist !== null && dist < 500;

  function fromEvent(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const lon = ((clientX - r.left) / r.width) * 360 - 180;
    const lat = 90 - ((clientY - r.top) / r.height) * 180;
    setPt([Math.round(lon), Math.round(lat)]);
  }

  function onKey(e: React.KeyboardEvent) {
    const [lon, lat] = pt ?? [0, 0];
    const step = e.shiftKey ? 10 : 2;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const mv = moves[e.key];
    if (!mv) return;
    e.preventDefault();
    setPt([Math.max(-180, Math.min(180, lon + mv[0])), Math.max(-90, Math.min(90, lat + mv[1]))]);
  }

  const latText = pt ? formatCoord(pt[1], t.north, t.south) : "—";
  const lonText = pt ? formatCoord(pt[0], t.east, t.west) : "—";
  const [px, py] = pt ? project(pt[0], pt[1]) : [0, 0];

  return (
    <Frame title={t.title} intro={t.intro}>
      <p className="bg-accent/20 rounded-xl px-4 py-2 font-semibold">🎯 {m.label}</p>
      <WorldMap
        ref={svgRef}
        className="mt-3 h-auto w-full cursor-crosshair touch-manipulation rounded-xl"
        role="application"
        tabIndex={0}
        aria-label={`${t.title}. ${t.lat} ${latText}, ${t.lon} ${lonText}`}
        onClick={(e) => fromEvent(e.clientX, e.clientY)}
        onKeyDown={onKey}
      >
        {/* Équateur et Greenwich */}
        <line x1="0" y1="180" x2="720" y2="180" stroke="#d64545" strokeWidth="1.4" strokeDasharray="6 4" />
        <line x1="360" y1="0" x2="360" y2="360" stroke="#1d9a55" strokeWidth="1.4" strokeDasharray="6 4" />
        <text x="6" y="176" fontSize="11" fill="#d64545" fontWeight="700">
          {t.equator} 0°
        </text>
        <text x="364" y="14" fontSize="11" fill="#1d9a55" fontWeight="700">
          {t.greenwich} 0°
        </text>
        {pt && (
          <g>
            <line x1={px} y1="0" x2={px} y2="360" stroke="var(--accent-strong)" strokeWidth="0.8" />
            <line x1="0" y1={py} x2="720" y2={py} stroke="var(--accent-strong)" strokeWidth="0.8" />
            <circle cx={px} cy={py} r="6" fill="var(--accent)" stroke="var(--fg)" strokeWidth="2" />
          </g>
        )}
      </WorldMap>

      <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        <div className="bg-ocean-1 rounded-2xl p-3 text-center text-white">
          <p className="text-xs opacity-75">{t.lat}</p>
          <p className="font-mono text-xl font-bold">{latText}</p>
        </div>
        <div className="bg-ocean-1 rounded-2xl p-3 text-center text-white">
          <p className="text-xs opacity-75">{t.lon}</p>
          <p className="font-mono text-xl font-bold">{lonText}</p>
        </div>
      </div>
      <div aria-live="polite" className="mt-3 min-h-12">
        {dist !== null && (
          <p className={cn("font-semibold", found ? "text-success" : "text-muted")}>
            {found ? t.found : t.close(dist)}
          </p>
        )}
        {found && (
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => {
              setMission((x) => (x + 1) % t.missions.length);
              setPt(null);
            }}
          >
            {t.next}
          </Button>
        )}
      </div>
    </Frame>
  );
}
