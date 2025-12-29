import type { Element, Stats } from ".";

export type Effect = {
  target: "onfield" | "enemy" | string[];
  effect: (stats: Stats) => Stats;
};

export type TeamEffects = {
  effects: Effect[];
  hexerei: boolean;
  moonsign: number;
  elements: Record<Element, number>;
};
