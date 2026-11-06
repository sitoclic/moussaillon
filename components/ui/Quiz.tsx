"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { QuizQuestion } from "@/content/types";
import { useUI } from "@/components/providers/I18nProvider";
import { saveQuizScore, useProgress } from "@/lib/progress";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import { Moussaillon } from "@/components/mascotte/Moussaillon";

type Props = {
  /** Identifiant pour mémoriser le meilleur score. */
  id: string;
  questions: QuizQuestion[];
  title?: string;
  /** Appelé à la fin, avec le score. */
  onFinish?: (score: number, total: number) => void;
};

/**
 * Quiz à choix multiples : une question à la fois,
 * une explication après chaque réponse, un score à la fin.
 */
export function Quiz({ id, questions, title, onFinish }: Props) {
  const ui = useUI();
  const progress = useProgress();
  const reduce = useReducedMotion();
  const groupId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const q = questions[index];
  const best = progress.quiz[id];

  function check() {
    if (selected === null) return;
    setChecked(true);
    if (selected === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
      headingRef.current?.focus();
    } else {
      setDone(true);
      saveQuizScore(id, score, total);
      onFinish?.(score, total);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setDone(false);
  }

  const ratio = score / total;

  return (
    <section
      aria-labelledby={`${groupId}-title`}
      className="border-fg/10 bg-surface rounded-3xl border-2 p-5 sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={`${groupId}-title`} className="font-serif text-2xl font-semibold sm:text-3xl">
          {title ?? ui.chapter.quiz}
        </h2>
        {best && !done && <p className="text-muted text-sm">{ui.quiz.best(best.score, best.total)}</p>}
      </div>

      {!done ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="mt-5"
          >
            {/* Barre de progression du quiz */}
            <div className="flex items-center gap-3">
              <div className="bg-line h-2 flex-1 overflow-hidden rounded-full" aria-hidden>
                <div
                  className="bg-accent h-full rounded-full transition-all"
                  style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
              <span className="text-muted font-mono text-xs">{ui.quiz.question(index + 1, total)}</span>
            </div>

            <fieldset className="mt-5">
              <legend>
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-lg leading-snug font-semibold outline-none sm:text-xl"
                >
                  {q.question}
                </h3>
              </legend>
              <div className="mt-4 grid gap-2.5">
                {q.choices.map((choice, i) => {
                  const isRight = checked && i === q.answer;
                  const isWrong = checked && i === selected && i !== q.answer;
                  return (
                    <label
                      key={i}
                      className={cn(
                        "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition",
                        !checked && selected === i && "border-accent bg-accent/15",
                        !checked && selected !== i && "border-line hover:border-fg/40",
                        isRight && "border-success bg-success/12",
                        isWrong && "border-danger bg-danger/10",
                        checked && !isRight && !isWrong && "border-line opacity-70",
                        checked && "cursor-default",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${groupId}-q${index}`}
                        value={i}
                        checked={selected === i}
                        disabled={checked}
                        onChange={() => setSelected(i)}
                        className="size-4 accent-[var(--accent-strong)]"
                      />
                      <span className="flex-1">{choice}</span>
                      {isRight && (
                        <span aria-hidden className="text-success">
                          ✓
                        </span>
                      )}
                      {isWrong && (
                        <span aria-hidden className="text-danger">
                          ✗
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div aria-live="polite">
              {checked && (
                <div
                  className={cn(
                    "mt-4 rounded-xl p-4",
                    selected === q.answer ? "bg-success/10" : "bg-danger/8",
                  )}
                >
                  <p className={cn("font-semibold", selected === q.answer ? "text-success" : "text-danger")}>
                    {selected === q.answer ? ui.quiz.right : ui.quiz.wrong}
                  </p>
                  <p className="mt-1 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              {!checked ? (
                <Button onClick={check} disabled={selected === null}>
                  {ui.quiz.check}
                </Button>
              ) : (
                <Button onClick={next}>{index + 1 < total ? ui.quiz.next : ui.quiz.finish}</Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div
          className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
          aria-live="polite"
        >
          <Moussaillon
            mood={ratio === 1 ? "wow" : ratio >= 0.5 ? "happy" : "curious"}
            wave={ratio === 1}
            className="w-24 shrink-0"
          />
          <div className="flex-1">
            <p className="font-serif text-3xl font-semibold">{ui.quiz.score(score, total)}</p>
            <p className="text-muted mt-1">
              {ratio === 1 ? ui.quiz.perfect : ratio >= 0.5 ? ui.quiz.good : ui.quiz.retry}
            </p>
            <Button variant="secondary" onClick={restart} className="mt-4">
              {ui.quiz.restart}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
