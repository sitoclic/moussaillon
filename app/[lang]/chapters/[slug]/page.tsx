import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getContent } from "@/content";
import { getMdxComponents } from "@/components/mdx/getMdxComponents";
import { ARetenir } from "@/components/ui/Boxes";
import { Quiz } from "@/components/ui/Quiz";
import { Moussaillon } from "@/components/mascotte/Moussaillon";
import { CompassRose } from "@/components/decor/CompassRose";
import { ChapterTracker, ReadingBar } from "@/components/chapter/ChapterTracker";

export function generateStaticParams() {
  return locales.flatMap((lang) => getContent(lang).chapters.map((c) => ({ lang, slug: c.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/chapters/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const chapter = getContent(lang).getChapter(slug);
  if (!chapter) return {};
  return {
    title: chapter.title,
    description: chapter.teaser,
    alternates: { canonical: `/${lang}/chapters/${slug}` },
    openGraph: { title: chapter.title, description: chapter.teaser },
  };
}

export default async function ChapterPage({ params }: PageProps<"/[lang]/chapters/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const { chapters, getChapter, chapterBodies, quizzes, ui } = getContent(lang);
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const index = chapters.indexOf(chapter);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];
  const loader = chapterBodies[slug];
  const Body = loader ? (await loader()).default : null;
  const quiz = quizzes[slug];
  const path = `/${lang}/chapters/${slug}`;

  return (
    <article>
      <ReadingBar />

      {/* En-tête de l'escale */}
      <header className="chart-grid border-line relative overflow-hidden border-b">
        <CompassRose className="text-ocean-2/20 pointer-events-none absolute -right-20 -bottom-24 w-72 sm:w-96" />
        <div className="relative mx-auto max-w-4xl px-5 pt-12 pb-10 sm:pt-16 sm:pb-14">
          <p className="text-muted font-mono text-xs tracking-[0.22em] uppercase">
            {ui.chapter.stop} {chapter.number} / {chapters.length} · {chapter.place} · {chapter.coords}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.2rem,1.6rem+3vw,3.8rem)] leading-[1.05] font-semibold tracking-tight">
            {chapter.title}
          </h1>
          <p className="text-fg/85 mt-4 max-w-2xl font-serif text-xl italic">{chapter.teaser}</p>
          <p className="bg-surface text-muted mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs">
            ⏱ {ui.chapter.readingTime(chapter.minutes)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        {Body ? (
          <div className="prose-moussaillon mx-auto">
            <Body components={getMdxComponents(lang)} />
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-10 text-center">
            <Moussaillon mood="sleepy" className="w-28" />
            <p className="text-muted text-lg">{ui.chapter.soon}</p>
          </div>
        )}

        {Body && chapter.keyPoints.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl">
            <ARetenir lang={lang} points={chapter.keyPoints} />
          </div>
        )}

        {quiz && (
          <div className="mx-auto mt-10 max-w-3xl">
            <Quiz id={slug} questions={quiz} />
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">{Body && <ChapterTracker slug={slug} path={path} />}</div>

        {/* Escale précédente / suivante */}
        <nav aria-label={ui.chapter.backToMap} className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/${lang}/chapters/${prev.slug}`}
              className="group border-line bg-surface hover:border-accent rounded-2xl border p-4"
            >
              <span className="text-muted text-sm">← {ui.chapter.prev}</span>
              <span className="group-hover:text-link mt-1 block font-serif text-lg font-semibold">
                {prev.stop}
              </span>
            </Link>
          ) : (
            <Link
              href={`/${lang}#voyage`}
              className="group border-line bg-surface hover:border-accent rounded-2xl border p-4"
            >
              <span className="text-muted text-sm">← {ui.chapter.backToMap}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/${lang}/chapters/${next.slug}`}
              className="group border-accent bg-accent/10 hover:bg-accent/20 rounded-2xl border-2 p-4 text-right"
            >
              <span className="text-muted text-sm">{ui.chapter.next} →</span>
              <span className="mt-1 block font-serif text-lg font-semibold">{next.stop}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
