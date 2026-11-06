"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLang, useUI } from "@/components/providers/I18nProvider";

type Props = {
  id: string;
  term: string;
  definition: string;
  children: React.ReactNode;
};

const WIDTH = 288; // largeur de l'infobulle en px

/**
 * Mot technique souligné en pointillés.
 * Survol (souris), focus (clavier) ou toucher (mobile) : la définition s'affiche.
 * Échap ou un toucher ailleurs la referme.
 */
export function TermTip({ id, term, definition, children }: Props) {
  const ui = useUI();
  const lang = useLang();
  const tipId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; above: boolean } | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const place = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const w = Math.min(WIDTH, vw - 16);
    let left = r.left + r.width / 2 - w / 2;
    left = Math.max(8, Math.min(left, vw - w - 8));
    const above = r.bottom + 180 > window.innerHeight && r.top > 200;
    setPos({ top: above ? r.top - 8 : r.bottom + 8, left, above });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPinned(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !tipRef.current?.contains(t)) {
        setOpen(false);
        setPinned(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    if (pinned) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="decoration-accent-strong cursor-help rounded-sm font-[inherit] text-inherit underline decoration-dotted decoration-2 underline-offset-[5px] hover:decoration-solid"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onClick={() => {
          // Un clic (ou un toucher) épingle la bulle ; un second clic la referme.
          if (open && pinned) {
            setOpen(false);
            setPinned(false);
          } else {
            setOpen(true);
            setPinned(true);
          }
        }}
        onPointerEnter={(e) => e.pointerType === "mouse" && show()}
        onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
        onFocus={show}
        onBlur={hideSoon}
      >
        {children}
      </button>
      {open &&
        pos &&
        createPortal(
          <div
            ref={tipRef}
            id={tipId}
            role="tooltip"
            onPointerEnter={show}
            onPointerLeave={hideSoon}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: Math.min(WIDTH, window.innerWidth - 16),
              transform: pos.above ? "translateY(-100%)" : undefined,
            }}
            className="border-line bg-surface text-fg z-[90] rounded-xl border p-4 text-left text-[0.95rem] leading-snug shadow-[0_18px_40px_-12px_rgb(var(--shadow)/0.45)]"
          >
            <p className="font-serif text-lg font-semibold">{term}</p>
            <p className="text-fg/90 mt-1">{definition}</p>
            <Link
              href={`/${lang}/glossary#${id}`}
              className="text-link mt-2 inline-block text-sm font-medium underline underline-offset-2"
            >
              {ui.term.seeGlossary} →
            </Link>
          </div>,
          document.body,
        )}
    </>
  );
}
