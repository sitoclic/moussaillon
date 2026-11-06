"use client";

import { useSyncExternalStore } from "react";

/**
 * Progression du lecteur, stockée uniquement dans le navigateur (localStorage).
 * Tout est entouré de try/catch : si le stockage est indisponible
 * (navigation privée, cookies bloqués…), le site fonctionne quand même,
 * simplement sans mémoire.
 */

export type Progress = {
  /** Escales terminées (slugs). */
  visited: string[];
  /** Meilleur score par quiz : { [quizId]: { score, total } } */
  quiz: Record<string, { score: number; total: number }>;
  /** Dernière page ouverte, pour « Reprendre où j'en étais ». */
  last?: string;
  /** Prénom saisi pour le diplôme. */
  name?: string;
};

const KEY = "moussaillon:progress:v1";
const EMPTY: Progress = { visited: [], quiz: {} };

let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Progress>) : {};
    cache = {
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      quiz: parsed.quiz && typeof parsed.quiz === "object" ? parsed.quiz : {},
      last: typeof parsed.last === "string" ? parsed.last : undefined,
      name: typeof parsed.name === "string" ? parsed.name : undefined,
    };
  } catch {
    cache = { ...EMPTY };
  }
  return cache;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Stockage indisponible : on garde la progression en mémoire seulement.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Hook React : renvoie la progression (vide côté serveur). */
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function markVisited(slug: string) {
  const p = read();
  if (p.visited.includes(slug)) return;
  write({ ...p, visited: [...p.visited, slug] });
}

export function setLast(path: string) {
  const p = read();
  if (p.last === path) return;
  write({ ...p, last: path });
}

export function saveQuizScore(id: string, score: number, total: number) {
  const p = read();
  const prev = p.quiz[id];
  if (prev && prev.score >= score) return;
  write({ ...p, quiz: { ...p.quiz, [id]: { score, total } } });
}

export function setName(name: string) {
  write({ ...read(), name });
}

export function resetProgress() {
  write({ ...EMPTY, quiz: {} });
}
