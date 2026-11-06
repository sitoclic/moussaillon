"use client";

import { useSyncExternalStore } from "react";
import { useUI } from "@/components/providers/I18nProvider";
import { THEME_KEY } from "@/components/providers/ThemeScript";

type Theme = "day" | "night";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day";

/** Bouton jour / quart de nuit. */
export function ThemeToggle() {
  const ui = useUI();
  const theme = useSyncExternalStore(subscribe, getTheme, () => "day" as Theme);
  const next: Theme = theme === "night" ? "day" : "night";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Pas de stockage : le choix vaut pour cette visite seulement.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "night" ? ui.theme.toDay : ui.theme.toNight}
      title={theme === "night" ? ui.theme.toDay : ui.theme.toNight}
      className="border-line bg-surface text-fg hover:border-accent grid size-11 place-items-center rounded-full border transition"
    >
      {theme === "night" ? (
        // Soleil
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.5" />
          <path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Lune
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
