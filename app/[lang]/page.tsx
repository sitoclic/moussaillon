import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getContent } from "@/content";
import { Hero } from "@/components/home/Hero";
import { VoyageMap } from "@/components/home/VoyageMap";
import { Moussaillon } from "@/components/mascotte/Moussaillon";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { chapters, ui } = getContent(lang);

  return (
    <>
      <Hero />

      {/* Le moussaillon se présente */}
      <section className="bg-ocean-1 relative text-[#f3ecdf]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 py-16 sm:flex-row sm:gap-10 sm:py-20">
          <Moussaillon
            wave
            mood="happy"
            className="w-32 shrink-0 sm:w-40"
            title="Le Moussaillon, ta mascotte"
          />
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="font-serif text-3xl font-semibold text-white">{ui.home.helloTitle}</p>
            {ui.home.hello.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <VoyageMap
        stops={chapters.map(({ slug, number, stop, title, teaser, minutes, place, coords }) => ({
          slug,
          number,
          stop,
          title,
          teaser,
          minutes,
          place,
          coords,
        }))}
      />
    </>
  );
}
