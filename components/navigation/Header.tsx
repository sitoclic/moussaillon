"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, useUI } from "@/components/providers/I18nProvider";
import { useProgress } from "@/lib/progress";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

type NavChapter = { slug: string; number: number; stop: string; title: string };

/** En-tête : logo, menu des escales (avec progression), glossaire, thème. */
export function Header({ chapters }: { chapters: NavChapter[] }) {
  const ui = useUI();
  const lang = useLang();
  const pathname = usePathname();
  const { visited } = useProgress();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = chapters.filter((c) => visited.includes(c.slug)).length;

  // Referme le menu à chaque changement de page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <header className="no-print border-line/70 bg-bg/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 rounded-lg"
          aria-label={`${ui.siteName} – ${ui.nav.home}`}
        >
          <Logo />
          <span className="font-serif text-xl font-semibold tracking-tight">{ui.siteName}</span>
        </Link>

        <nav aria-label={ui.nav.main} className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href={`/${lang}/glossary`}
            className={cn(
              "hover:bg-fg/5 hidden rounded-full px-3 py-2 text-sm font-medium sm:inline-block",
              pathname.endsWith("/glossary") && "decoration-accent underline decoration-2 underline-offset-8",
            )}
          >
            {ui.nav.glossary}
          </Link>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="border-line bg-surface hover:border-accent flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold"
            aria-haspopup="dialog"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
            </svg>
            {ui.nav.menu}
            <span className="text-muted font-mono text-xs">
              {count}/{chapters.length}
            </span>
          </button>
          <ThemeToggle />
        </nav>
      </div>

      {/* Menu des escales : boîte de dialogue native (gère le focus et Échap) */}
      <dialog
        ref={dialogRef}
        aria-labelledby="menu-title"
        className="bg-bg text-fg backdrop:bg-ink/50 m-0 ml-auto h-dvh max-h-none w-full max-w-md p-0 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="border-line flex items-center justify-between border-b px-5 py-4">
            <h2 id="menu-title" className="font-serif text-2xl font-semibold">
              {ui.nav.menu}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="hover:bg-fg/5 grid size-11 place-items-center rounded-full"
              aria-label={ui.nav.closeMenu}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="px-5 pt-4">
            <div className="bg-line h-2 overflow-hidden rounded-full" aria-hidden>
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: `${(count / chapters.length) * 100}%` }}
              />
            </div>
            <p className="text-muted mt-2 text-sm">{ui.home.progress(count, chapters.length)}</p>
          </div>
          <ol className="flex-1 overflow-y-auto px-3 py-3">
            {chapters.map((c) => {
              const href = `/${lang}/chapters/${c.slug}`;
              const current = pathname === href;
              const done = visited.includes(c.slug);
              return (
                <li key={c.slug}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "hover:bg-fg/5 flex items-center gap-3 rounded-xl px-3 py-2.5",
                      current && "bg-accent/15",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border-2 font-mono text-xs font-bold",
                        done ? "border-accent-strong bg-accent text-on-accent" : "border-line text-muted",
                      )}
                    >
                      {done ? "✓" : c.number}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{c.stop}</span>
                      <span className="text-muted block truncate text-sm">{c.title}</span>
                    </span>
                    {done && <span className="sr-only">({ui.home.visited})</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="border-line grid grid-cols-2 gap-2 border-t p-4 text-sm font-medium">
            <Link href={`/${lang}/glossary`} className="hover:bg-fg/5 rounded-xl px-3 py-2.5">
              📖 {ui.nav.glossary}
            </Link>
            <Link href={`/${lang}/about`} className="hover:bg-fg/5 rounded-xl px-3 py-2.5">
              ⚓ {ui.nav.about}
            </Link>
          </div>
        </div>
      </dialog>
    </header>
  );
}

/** Petit logo : bouée jaune ciré. */
function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="var(--accent)" />
      <circle cx="16" cy="16" r="6" fill="var(--bg)" />
      <path d="M16 3v6M16 23v6M3 16h6M23 16h6" stroke="#d64545" strokeWidth="4" />
      <circle cx="16" cy="16" r="13" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
    </svg>
  );
}
