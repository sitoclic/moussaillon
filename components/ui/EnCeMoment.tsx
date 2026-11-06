import type { Locale } from "@/lib/i18n";
import { getContent } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Encadré « En ce moment », alimenté par content/<langue>/actualites.ts.
 */
export function EnCeMoment({ lang, className }: { lang: Locale; className?: string }) {
  const { actualites, ui } = getContent(lang);
  const date = new Date(actualites.updatedAt + "T12:00:00Z").toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <section
      aria-labelledby="en-ce-moment"
      className={cn("bg-ocean-1 relative overflow-hidden rounded-3xl p-6 text-[#f3ecdf] sm:p-8", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="en-ce-moment"
          className="flex items-center gap-3 font-serif text-3xl font-semibold text-white"
        >
          <span className="relative flex size-3" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6b5e] opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-[#ff6b5e]" />
          </span>
          {ui.news.title}
        </h2>
        <p className="font-mono text-xs opacity-70">
          {ui.news.updated} {date}
        </p>
      </div>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {actualites.items.map((item) => (
          <li key={item.title} className="rounded-2xl bg-white/7 p-4 ring-1 ring-white/10">
            <p className="text-cire font-mono text-[0.68rem] font-bold tracking-[0.18em] uppercase">
              {item.tag}
            </p>
            <p className="mt-1 font-serif text-lg leading-snug font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-relaxed opacity-90">{item.text}</p>
            {item.link && (
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cire mt-2 inline-block text-sm font-semibold underline underline-offset-2"
              >
                {item.link.label} ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
