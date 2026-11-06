"use client";

import { useId, useState } from "react";
import type { RaceClass } from "@/content/fr/classes";
import { useIX } from "@/components/providers/I18nProvider";
import { Frame } from "../Frame";
import { CLASS_COLORS } from "./Silhouettes";

/** Comparateur : deux classes face à face, avec leurs empreintes vues de dessus à l'échelle. */
export function Comparateur({ classes }: { classes: RaceClass[] }) {
  const t = useIX().comparateur;
  const id = useId();
  const [a, setA] = useState<RaceClass["id"]>("class40");
  const [b, setB] = useState<RaceClass["id"]>("ultim");
  const A = classes.find((c) => c.id === a)!;
  const B = classes.find((c) => c.id === b)!;

  const rows: Array<{
    label: string;
    get: (c: RaceClass) => React.ReactNode;
    num?: (c: RaceClass) => number;
  }> = [
    { label: t.rows.length, get: (c) => c.lengthLabel, num: (c) => c.length },
    { label: t.rows.beam, get: (c) => c.beamLabel, num: (c) => c.beam },
    { label: t.rows.mast, get: (c) => c.mastLabel, num: (c) => c.mast },
    { label: t.rows.hulls, get: (c) => (c.hulls === 1 ? t.mono : t.tri) },
    { label: t.rows.speed, get: (c) => c.topSpeed },
    { label: t.rows.price, get: (c) => c.price },
    { label: t.rows.crew, get: (c) => c.crew },
    { label: t.rows.foils, get: (c) => c.foils },
    { label: t.rows.races, get: (c) => c.races.join(", ") },
  ];

  const select = (value: string, onChange: (v: RaceClass["id"]) => void, label: string, sid: string) => (
    <div className="flex-1">
      <label htmlFor={sid} className="text-muted text-xs font-semibold tracking-wider uppercase">
        {label}
      </label>
      <select
        id={sid}
        value={value}
        onChange={(e) => onChange(e.target.value as RaceClass["id"])}
        className="border-line bg-surface mt-1 h-11 w-full rounded-xl border-2 px-3 font-semibold"
      >
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );

  // Empreinte vue de dessus, à l'échelle (1 unité = 1 m).
  const footprint = (c: RaceClass, x: number) => {
    const color = CLASS_COLORS[c.id];
    const y0 = 12 - c.beam / 2;
    if (c.hulls === 1) {
      return (
        <path
          d={`M${x} ${y0 + c.beam * 0.08} L${x + c.length * 0.62} ${y0} Q${x + c.length} ${12 - c.beam * 0.1} ${x + c.length} 12 Q${x + c.length} ${12 + c.beam * 0.1} ${x + c.length * 0.62} ${y0 + c.beam} L${x} ${y0 + c.beam * 0.92} Z`}
          fill={color}
          fillOpacity="0.85"
        />
      );
    }
    const hw = Math.max(0.6, c.beam * 0.1);
    const fl = c.length * 0.78;
    return (
      <g fill={color} fillOpacity="0.85">
        <rect x={x} y={12 - hw / 2} width={c.length} height={hw} rx={hw / 2} />
        <rect x={x + c.length * 0.1} y={y0} width={fl} height={hw * 0.7} rx={hw / 3} />
        <rect x={x + c.length * 0.1} y={y0 + c.beam - hw * 0.7} width={fl} height={hw * 0.7} rx={hw / 3} />
        <rect x={x + c.length * 0.3} y={y0} width={0.4} height={c.beam} />
        <rect x={x + c.length * 0.62} y={y0} width={0.4} height={c.beam} />
      </g>
    );
  };

  return (
    <Frame title={t.title} intro={t.intro}>
      <div className="flex flex-col gap-3 sm:flex-row">
        {select(a, setA, t.first, `${id}-a`)}
        {select(b, setB, t.second, `${id}-b`)}
      </div>

      {/* Empreintes au sol, à l'échelle */}
      <figure className="mt-5">
        <svg
          viewBox="0 0 70 27.5"
          className="bg-ocean-2/10 h-auto w-full rounded-2xl"
          role="img"
          aria-label={t.footprintAria(A.name, B.name)}
        >
          {footprint(A, 2)}
          {footprint(B, 36)}
          <text x="2" y="26.6" fontSize="1.4" fill="var(--fg)" fontWeight="700">
            {A.name}
          </text>
          <text x="36" y="26.6" fontSize="1.4" fill="var(--fg)" fontWeight="700">
            {B.name}
          </text>
          {/* Un humain vu de dessus, pour l'échelle */}
          <circle cx="68" cy="2" r="0.3" fill="var(--fg)" />
        </svg>
        <figcaption className="text-muted mt-1 text-xs">{t.footprint}</figcaption>
      </figure>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="sr-only">{t.title}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 py-2" />
              {[A, B].map((c) => (
                <th key={c.id} scope="col" className="py-2 font-serif text-lg">
                  <span
                    className="mr-2 inline-block size-3 rounded-full"
                    style={{ background: CLASS_COLORS[c.id] }}
                    aria-hidden
                  />
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const max = r.num ? Math.max(r.num(A), r.num(B)) : 0;
              return (
                <tr key={r.label} className="border-line border-t align-top">
                  <th scope="row" className="text-muted py-2.5 pr-3 font-medium">
                    {r.label}
                  </th>
                  {[A, B].map((c) => (
                    <td key={c.id} className="py-2.5 pr-3">
                      {r.get(c)}
                      {r.num && (
                        <span className="bg-line mt-1.5 block h-1.5 overflow-hidden rounded-full" aria-hidden>
                          <span
                            className="block h-full rounded-full transition-all duration-500"
                            style={{ width: `${(r.num(c) / max) * 100}%`, background: CLASS_COLORS[c.id] }}
                          />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr className="border-line border-t align-top">
              <th scope="row" className="text-muted py-2.5 pr-3 font-medium">
                {t.rows.pitch}
              </th>
              {[A, B].map((c) => (
                <td key={c.id} className="py-2.5 pr-3 italic">
                  {c.pitch}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-muted mt-3 text-xs">{t.note}</p>
    </Frame>
  );
}
