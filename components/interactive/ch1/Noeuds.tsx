"use client";

import { useId, useState } from "react";
import { useIX } from "@/components/providers/I18nProvider";
import { KNOT_KMH } from "@/lib/sailing";
import { Frame } from "../Frame";

const fmt = (n: number, digits = 1) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

/** Curseur : des nœuds aux km/h, avec une comparaison terrestre. */
export function Noeuds() {
  const t = useIX().noeuds;
  const id = useId();
  const [kn, setKn] = useState(15);
  const kmh = kn * KNOT_KMH;
  const compare = t.compare.find((c) => kmh <= c.max)!;

  return (
    <Frame title={t.title}>
      <label htmlFor={id} className="text-sm font-semibold">
        {t.label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={40}
        step={1}
        value={kn}
        onChange={(e) => setKn(Number(e.target.value))}
        aria-valuetext={`${kn} nœuds, soit ${fmt(kmh)} km/h`}
        className="mt-3 h-2 w-full cursor-pointer accent-[var(--accent-strong)]"
      />
      <div className="mt-5 grid grid-cols-2 gap-3 text-center">
        <div className="bg-ocean-1 rounded-2xl p-4 text-white">
          <p className="font-mono text-4xl font-bold">{kn}</p>
          <p className="text-sm opacity-80">nœuds</p>
        </div>
        <div className="bg-bg-deep rounded-2xl p-4">
          <p className="font-mono text-4xl font-bold">{fmt(kmh)}</p>
          <p className="text-muted text-sm">{t.kmh}</p>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium" aria-live="polite">
        ≈ {compare.text}
      </p>
      <p className="text-muted mt-1 text-sm">{t.caption(kn, fmt(kn * 24 * KNOT_KMH, 0), kn * 24)}</p>
    </Frame>
  );
}
