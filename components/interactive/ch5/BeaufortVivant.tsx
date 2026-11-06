"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { BeaufortLevel } from "@/content/fr/beaufort";
import { useIX } from "@/components/providers/I18nProvider";
import { wavePath } from "@/components/decor/Waves";
import { Sailboat } from "@/components/decor/Sailboat";
import { KNOT_KMH } from "@/lib/sailing";
import { Frame } from "../Frame";
import { cn } from "@/lib/cn";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Interpole deux couleurs hexadécimales. */
function mix(c1: string, c2: string, t: number) {
  const p = (c: string, i: number) => parseInt(c.slice(1 + i * 2, 3 + i * 2), 16);
  const ch = [0, 1, 2].map((i) =>
    Math.round(lerp(p(c1, i), p(c2, i), t))
      .toString(16)
      .padStart(2, "0"),
  );
  return `#${ch.join("")}`;
}

/**
 * Bruit de vent et de vagues généré par le navigateur (Web Audio),
 * sans aucun fichier son. Coupé par défaut.
 */
function useSeaSound(on: boolean, force: number) {
  const ctxRef = useRef<{ ctx: AudioContext; gain: GainNode; filter: BiquadFilterNode } | null>(null);

  useEffect(() => {
    if (!on) {
      ctxRef.current?.ctx.close();
      ctxRef.current = null;
      return;
    }
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Bruit « brun » : plus doux que le bruit blanc, proche du ressac.
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    ctxRef.current = { ctx, gain, filter };
    return () => {
      ctx.close();
      ctxRef.current = null;
    };
  }, [on]);

  useEffect(() => {
    const s = ctxRef.current;
    if (!s) return;
    const now = s.ctx.currentTime;
    s.gain.gain.linearRampToValueAtTime(0.05 + force * 0.05, now + 0.4);
    s.filter.frequency.linearRampToValueAtTime(300 + force * 180, now + 0.4);
  }, [force, on]);
}

/** Curseur de force 0 à 12 qui transforme la mer, le ciel et le bateau. */
export function BeaufortVivant({ levels }: { levels: BeaufortLevel[] }) {
  const t = useIX().beaufort;
  const id = useId();
  const reduce = useReducedMotion();
  const [force, setForce] = useState(3);
  const [sound, setSound] = useState(false);
  useSeaSound(sound, force);

  const lvl = levels[force];
  const f = force / 12;
  const [kMin, kMax] = lvl.knots;
  const windText = kMax === null ? `≥ ${kMin} ${t.knots}` : `${kMin}–${kMax} ${t.knots}`;
  const kmhText =
    kMax === null
      ? `≥ ${Math.round(kMin * KNOT_KMH)} ${t.kmh}`
      : `${Math.round(kMin * KNOT_KMH)}–${Math.round(kMax * KNOT_KMH)} ${t.kmh}`;

  // Paramètres visuels
  const skyTop = mix("#cfe8f5", "#3a4550", Math.pow(f, 0.9));
  const skyBottom = mix("#eef6f4", "#6b767f", Math.pow(f, 0.9));
  const sea1 = mix("#3f8fb8", "#4b5e6a", f);
  const sea2 = mix("#135e8a", "#2e3e49", f);
  const sea3 = mix("#0a3352", "#1a2730", f);
  const amp = (k: number) => (force === 0 ? 0.5 : lerp(2, 38, Math.pow(f, 1.2)) * k);
  const speed = (base: number) => (reduce ? 0 : lerp(base * 2.2, base * 0.35, f));
  const heel = force === 0 ? 0 : Math.min(30, force * 3);
  const foamCount = force < 3 ? 0 : Math.round((force - 2) * 3);
  const cloudCount = Math.min(6, Math.floor(force / 2));
  const rain = force >= 9;

  const layer = (k: number, baseline: number, wl: number, color: string, dur: number, rev = false) => (
    <svg
      viewBox="0 0 2880 200"
      preserveAspectRatio="none"
      className={cn("absolute inset-x-0 bottom-0 h-full w-[200%]", !reduce && "animate-wave")}
      style={
        {
          "--wave-speed": `${dur}s`,
          animationDirection: rev ? "reverse" : undefined,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <path d={wavePath({ amplitude: amp(k), wavelength: wl, baseline })} fill={color} />
    </svg>
  );

  return (
    <Frame title={t.title} intro={t.intro}>
      <div
        className="relative h-64 overflow-hidden rounded-2xl sm:h-80"
        style={{
          background: `linear-gradient(180deg, ${skyTop}, ${skyBottom})`,
          transition: "background 0.6s",
        }}
        aria-hidden
      >
        {/* Nuages */}
        {Array.from({ length: cloudCount }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-md"
            style={{
              top: `${6 + (i % 3) * 9}%`,
              left: `${(i * 17 + 5) % 90}%`,
              width: `${18 + (i % 2) * 10}%`,
              height: "14%",
              background: mix("#ffffff", "#59636b", f),
              opacity: 0.85,
            }}
          />
        ))}
        {/* Pluie */}
        {rain && (
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(105deg, transparent 0 9px, rgba(255,255,255,.55) 9px 10px)",
            }}
          />
        )}
        {/* Mer */}
        <div className="absolute inset-x-0 bottom-0 h-[58%]">
          {layer(0.5, 70, 360, sea1, speed(30))}
          {layer(0.8, 100, 288, sea2, speed(22), true)}
        </div>
        {/* Bateau */}
        <div
          className="animate-bob absolute bottom-[26%] left-[42%] w-16 sm:w-20"
          style={{ animationDuration: `${lerp(5, 1.4, f)}s` }}
        >
          <div
            style={{
              transform: `rotate(${heel}deg)`,
              transition: "transform .6s",
              transformOrigin: "50% 90%",
            }}
          >
            <Sailboat />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[34%]">
          {layer(1, 110, 480, sea3, speed(16))}
          {/* Écume */}
          {Array.from({ length: foamCount }, (_, i) => (
            <span
              key={i}
              className="absolute h-1.5 rounded-full bg-white/80"
              style={{
                left: `${(i * 37) % 97}%`,
                top: `${20 + ((i * 23) % 60)}%`,
                width: `${12 + (i % 4) * 8}px`,
                opacity: 0.6 + (i % 3) * 0.15,
              }}
            />
          ))}
        </div>
        {/* Traînées d'embruns */}
        {force >= 7 &&
          Array.from({ length: force - 5 }, (_, i) => (
            <span
              key={i}
              className="absolute h-px bg-white/70"
              style={{ top: `${45 + i * 5}%`, left: `${(i * 29) % 80}%`, width: `${20 + i * 4}%` }}
            />
          ))}
        <span className="absolute top-3 left-3 rounded-full bg-black/35 px-3 py-1 font-mono text-sm font-bold text-white">
          {t.force} {force}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <label htmlFor={id} className="sr-only">
          {t.slider}
        </label>
        <span className="font-mono text-sm" aria-hidden>
          0
        </span>
        <input
          id={id}
          type="range"
          min={0}
          max={12}
          step={1}
          value={force}
          onChange={(e) => setForce(Number(e.target.value))}
          aria-valuetext={`${t.force} ${force} : ${lvl.name}, ${windText}`}
          className="w-full cursor-pointer accent-[var(--accent-strong)]"
        />
        <span className="font-mono text-sm" aria-hidden>
          12
        </span>
        <button
          type="button"
          onClick={() => setSound((s) => !s)}
          aria-pressed={sound}
          aria-label={sound ? t.soundOn : t.soundOff}
          title={sound ? t.soundOn : t.soundOff}
          className="border-line hover:border-accent grid size-11 shrink-0 place-items-center rounded-full border-2"
        >
          {sound ? "🔊" : "🔇"}
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.4fr]" aria-live="polite">
        <div className="bg-ocean-1 rounded-2xl p-4 text-[#f3ecdf]">
          <p className="text-cire font-mono text-xs tracking-widest uppercase">
            {t.force} {force}
          </p>
          <p className="font-serif text-2xl font-semibold text-white">{lvl.name}</p>
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="opacity-75">{t.wind}</dt>
              <dd className="text-right font-mono">
                {windText}
                <br />
                {kmhText}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="opacity-75">{t.waves}</dt>
              <dd className="font-mono">{lvl.waves}</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-2">
          <p>
            <span className="text-muted font-mono text-xs tracking-widest uppercase">{t.sea} · </span>
            {lvl.sea}
          </p>
          <p>
            <span className="text-muted font-mono text-xs tracking-widest uppercase">{t.skipper} · </span>
            {lvl.skipper}
          </p>
        </div>
      </div>
    </Frame>
  );
}
