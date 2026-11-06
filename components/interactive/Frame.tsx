import { cn } from "@/lib/cn";

/**
 * Cadre commun aux interactions : titre, consigne, contenu.
 * Le petit badge « À toi de jouer » signale qu'on peut manipuler.
 */
export function Frame({
  title,
  intro,
  children,
  className,
  badge = "À toi de jouer",
}: {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  badge?: string | null;
}) {
  return (
    <figure
      className={cn(
        "not-prose border-fg/10 bg-surface relative rounded-3xl border-2 p-4 shadow-[0_20px_50px_-30px_rgb(var(--shadow)/0.5)] sm:p-6",
        className,
      )}
    >
      <figcaption className="mb-4">
        {badge && (
          <span className="bg-accent text-on-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.68rem] font-bold tracking-[0.16em] uppercase">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
              <path d="M9 3a2 2 0 0 1 2 2v6.1l.9-.2a2 2 0 0 1 2.3 1.3l.1.3.8-.2a2 2 0 0 1 2.3 1.4l.1.2.4-.1a2 2 0 0 1 2.4 1.9V18a5 5 0 0 1-5 5h-2.6a5 5 0 0 1-4-2l-3.4-4.6a1.8 1.8 0 0 1 2.6-2.4L7 15V5a2 2 0 0 1 2-2Z" />
            </svg>
            {badge}
          </span>
        )}
        <span className="mt-2 block font-serif text-2xl leading-tight font-semibold">{title}</span>
        {intro && <span className="text-muted mt-1.5 block text-[0.98rem] leading-relaxed">{intro}</span>}
      </figcaption>
      {children}
    </figure>
  );
}
