import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getContent } from "@/content";
import { chiffres, type Chiffre } from "@/content/chiffres";
import { Moussaillon } from "@/components/mascotte/Moussaillon";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getContent(lang).ui.about.title, alternates: { canonical: `/${lang}/about` } };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { ui } = getContent(lang);
  const a = ui.about;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-end gap-5">
        <h1 className="flex-1 font-serif text-5xl font-semibold tracking-tight">{a.title}</h1>
        <Moussaillon mood="wink" className="w-20 shrink-0" />
      </div>

      <div className="prose-moussaillon mt-8">
        {a.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>{a.sourcesTitle}</h2>
        <p>{a.sourcesIntro}</p>
        <ul>
          {a.sources.map((s) => (
            <li key={s.name}>
              {s.url ? (
                <a href={s.url} rel="noopener noreferrer" target="_blank">
                  {s.name}
                </a>
              ) : (
                s.name
              )}
              {s.note && <span className="text-muted"> – {s.note}</span>}
            </li>
          ))}
        </ul>

        <h2>{a.figuresTitle}</h2>
        <p>{a.figuresIntro}</p>
      </div>

      <div className="border-line bg-surface mt-6 overflow-x-auto rounded-2xl border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{a.figuresTitle}</caption>
          <thead className="bg-bg-deep/60 text-muted font-mono text-xs tracking-wider uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">
                {a.colFigure}
              </th>
              <th scope="col" className="px-4 py-3">
                {a.colSource}
              </th>
              <th scope="col" className="px-4 py-3">
                {a.colDate}
              </th>
            </tr>
          </thead>
          <tbody>
            {(Object.values(chiffres) as Chiffre[]).map((c) => (
              <tr key={c.libelle} className="border-line border-t align-top">
                <td className="px-4 py-3">
                  <span className="font-semibold">{c.libelle}</span>
                  <br />
                  {c.valeur}
                  {c.statut === "a-verifier" && <span className="text-danger ml-1">({a.toCheck})</span>}
                </td>
                <td className="text-muted px-4 py-3">
                  {c.source.url ? (
                    <a
                      href={c.source.url}
                      className="text-link underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {c.source.nom}
                    </a>
                  ) : (
                    c.source.nom
                  )}
                </td>
                <td className="text-muted px-4 py-3 font-mono text-xs whitespace-nowrap">{c.verifieLe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
