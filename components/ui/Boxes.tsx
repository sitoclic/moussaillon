import type { Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { Moussaillon, type Mood } from "@/components/mascotte/Moussaillon";
import { cn } from "@/lib/cn";

type BoxProps = { lang: Locale; children: React.ReactNode; title?: string };

/** Encadré « Astuce de pro » : une vraie technique de skipper. */
export function Astuce({ lang, title, children }: BoxProps) {
  const { ui } = getContent(lang);
  return (
    <aside className="border-ocean-2/70 bg-surface night:border-accent/50 relative overflow-hidden rounded-2xl border-2 p-5 pl-6 sm:p-6 sm:pl-8">
      <span aria-hidden className="bg-ocean-2 night:bg-accent absolute inset-y-0 left-0 w-2" />
      <p className="text-ocean-2 night:text-accent flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.18em] uppercase">
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 12l4-6" strokeLinecap="round" />
        </svg>
        {ui.boxes.proTip}
      </p>
      {title && <p className="mt-2 font-serif text-xl font-semibold">{title}</p>}
      <div className="mt-2 space-y-3 [&_p]:leading-relaxed">{children}</div>
    </aside>
  );
}

/** Bulle de la mascotte : un conseil ou une question de débutant. */
export function Bulle({
  lang,
  children,
  title,
  type = "conseil",
  mood,
}: BoxProps & { type?: "conseil" | "question"; mood?: Mood }) {
  const { ui } = getContent(lang);
  const label = title ?? (type === "question" ? ui.boxes.mascotQuestion : ui.boxes.mascotTip);
  return (
    <aside className="flex items-start gap-3 sm:gap-5">
      <Moussaillon
        mood={mood ?? (type === "question" ? "curious" : "wink")}
        className="w-16 shrink-0 sm:w-24"
      />
      <div
        className={cn(
          "border-accent bg-surface relative flex-1 rounded-2xl border-2 p-4 sm:p-5",
          "before:border-accent before:bg-surface before:absolute before:top-5 before:-left-[11px] before:size-5 before:rotate-45 before:border-b-2 before:border-l-2 before:content-['']",
        )}
      >
        <div className="relative">
          <p className="font-serif text-base font-semibold italic">{label}</p>
          <div className="mt-1 space-y-3 [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    </aside>
  );
}

/** « Pour comparer, à terre » : une équivalence parlante. */
export function ATerre({ lang, children }: BoxProps) {
  const { ui } = getContent(lang);
  return (
    <aside className="border-line bg-bg-deep/60 rounded-2xl border border-dashed p-5">
      <p className="text-muted font-mono text-xs font-semibold tracking-[0.18em] uppercase">
        {ui.boxes.landComparison}
      </p>
      <div className="[&_strong]:text-ocean-2 night:[&_strong]:text-accent mt-2 text-lg leading-relaxed">
        {children}
      </div>
    </aside>
  );
}

/** « Ce qu'il faut retenir » en fin de chapitre. */
export function ARetenir({ lang, points }: { lang: Locale; points: React.ReactNode[] }) {
  const { ui } = getContent(lang);
  if (!points.length) return null;
  return (
    <section
      aria-labelledby="a-retenir"
      className="bg-ocean-1 relative rounded-3xl p-6 text-[#f3ecdf] sm:p-8"
    >
      <h2 id="a-retenir" className="font-serif text-2xl font-semibold sm:text-3xl">
        {ui.chapter.keyPoints}
      </h2>
      <ol className="mt-5 space-y-3">
        {points.map((p, i) => (
          <li key={i} className="flex gap-4">
            <span
              aria-hidden
              className="bg-cire text-ink grid size-8 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
            >
              {i + 1}
            </span>
            <span className="pt-1 leading-relaxed">{p}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
