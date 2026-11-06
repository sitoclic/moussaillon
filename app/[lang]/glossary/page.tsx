import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getContent } from "@/content";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";
import { Moussaillon } from "@/components/mascotte/Moussaillon";

export async function generateMetadata({ params }: PageProps<"/[lang]/glossary">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { ui } = getContent(lang);
  return {
    title: ui.glossary.title,
    description: ui.glossary.intro,
    alternates: { canonical: `/${lang}/glossary` },
  };
}

export default async function GlossaryPage({ params }: PageProps<"/[lang]/glossary">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { glossary, ui } = getContent(lang);

  return (
    <div className="mx-auto max-w-5xl px-5 pt-12 pb-10">
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <p className="text-muted font-mono text-xs tracking-[0.22em] uppercase">
            {ui.glossary.kicker(glossary.length)}
          </p>
          <h1 className="mt-2 font-serif text-5xl font-semibold tracking-tight">{ui.glossary.title}</h1>
          <p className="text-fg/85 mt-3 max-w-2xl text-lg leading-relaxed">{ui.glossary.intro}</p>
        </div>
        <Moussaillon mood="curious" className="hidden w-24 shrink-0 sm:block" />
      </div>
      <div className="mt-8">
        <GlossaryBrowser entries={glossary} />
      </div>
    </div>
  );
}
