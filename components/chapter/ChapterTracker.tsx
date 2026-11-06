"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { markVisited, setLast, useProgress } from "@/lib/progress";
import { useUI } from "@/components/providers/I18nProvider";

/** Barre de lecture fine en haut de l'écran. */
export function ReadingBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="no-print bg-accent fixed inset-x-0 top-16 z-40 h-1 origin-left"
    />
  );
}

/**
 * Mémorise la page pour « Reprendre où j'en étais », et coche l'escale
 * quand le lecteur atteint la fin du chapitre.
 */
export function ChapterTracker({ slug, path }: { slug: string; path: string }) {
  const ui = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const { visited } = useProgress();
  const [justDone, setJustDone] = useState(false);

  useEffect(() => {
    setLast(path);
  }, [path]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisited(slug);
          setJustDone(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [slug]);

  return (
    <div ref={ref} aria-live="polite" className="text-success min-h-6 text-center text-sm font-medium">
      {justDone || visited.includes(slug) ? `✓ ${ui.chapter.done}` : ""}
    </div>
  );
}
