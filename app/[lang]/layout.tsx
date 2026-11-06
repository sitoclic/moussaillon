import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, locales, SITE_URL } from "@/lib/i18n";
import { getContent } from "@/content";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { ThemeScript } from "@/components/providers/ThemeScript";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { ui } = getContent(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${ui.siteName} · la course au large expliquée à tous`,
      template: `%s · ${ui.siteName}`,
    },
    description: ui.description,
    openGraph: {
      type: "website",
      siteName: ui.siteName,
      locale: "fr_FR",
      title: `${ui.siteName} · la course au large expliquée à tous`,
      description: ui.tagline,
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#07121f" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { ui, chapters } = getContent(lang);

  return (
    <html
      lang={lang}
      data-theme="day"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <I18nProvider lang={lang}>
          <a
            href="#contenu"
            className="bg-accent text-on-accent sr-only z-[100] rounded px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {ui.skipToContent}
          </a>
          <Header
            chapters={chapters.map(({ slug, number, stop, title }) => ({ slug, number, stop, title }))}
          />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
