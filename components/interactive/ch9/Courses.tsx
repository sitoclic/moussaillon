"use client";

import { useState } from "react";
import type { Race } from "@/content/fr/courses";
import { useIX } from "@/components/providers/I18nProvider";
import { WorldMap } from "@/components/decor/WorldMap";
import { project, WORLD_W } from "@/lib/world";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

const toPath = (pts: Array<[number, number]>) =>
  pts.map(([lon, lat], i) => `${i ? "L" : "M"}${project(lon, lat).join(" ")}`).join(" ");

/** Mini-carte d'une course, recadrée sur sa zone. */
function MiniCarte({ race, label }: { race: Race; label: string }) {
  const [lonMin, lonMax, latTop, latBottom] = race.frame;
  const d = toPath(race.path);
  const [sx, sy] = project(race.path[0][0], race.path[0][1]);
  const last = race.path[race.path.length - 1];
  const [ex, ey] = project(last[0], last[1]);
  return (
    <WorldMap
      lonMin={lonMin}
      lonMax={lonMax}
      latTop={latTop}
      latBottom={latBottom}
      graticule={false}
      className="h-auto w-full rounded-xl"
      role="img"
      aria-label={label}
    >
      {[0, -WORLD_W].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <path
            d={d}
            fill="none"
            stroke="var(--accent-strong)"
            strokeWidth={lonMax - lonMin > 200 ? 2.4 : 1.6}
            strokeLinejoin="round"
          />
          <circle cx={sx} cy={sy} r={lonMax - lonMin > 200 ? 4.5 : 2.2} fill="var(--fg)" />
          <circle
            cx={ex}
            cy={ey}
            r={lonMax - lonMin > 200 ? 4.5 : 2.2}
            fill="var(--accent)"
            stroke="var(--fg)"
            strokeWidth="0.8"
          />
        </g>
      ))}
    </WorldMap>
  );
}

/** Les grandes courses : une fiche et une mini-carte pour chacune. */
export function Courses({ races }: { races: Race[] }) {
  const t = useIX().courses;
  const [id, setId] = useState(races[0].id);
  const race = races.find((r) => r.id === id)!;

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.title}>
        {races.map((r) => (
          <button
            key={r.id}
            type="button"
            aria-pressed={r.id === id}
            onClick={() => setId(r.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition",
              r.id === id ? "border-accent bg-accent text-on-accent" : "border-line hover:border-fg/40",
            )}
          >
            {r.name.split(" (")[0].split(" – ")[0]}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]" aria-live="polite">
        <div>
          <MiniCarte race={race} label={`${t.mapOf} ${race.name} : ${race.route}`} />
          <p className="text-muted mt-1 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="bg-fg inline-block size-2 rounded-full" aria-hidden /> {t.start}
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-accent inline-block size-2 rounded-full" aria-hidden /> {t.finish}
            </span>
          </p>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold">{race.name}</h3>
          <dl className="mt-3 space-y-2 text-[0.97rem]">
            {(
              [
                [t.route, race.route],
                [t.rhythm, race.rhythm],
                [t.crew, race.crew],
                [t.classes, race.classes],
                [t.since, race.since],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="border-line grid grid-cols-[7.5rem_1fr] gap-2 border-b pb-2">
                <dt className="text-muted font-medium">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="border-accent mt-3 border-l-4 pl-3 italic">{race.fact}</p>
        </div>
      </div>
    </Frame>
  );
}
