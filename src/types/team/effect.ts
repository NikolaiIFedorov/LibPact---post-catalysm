import type { Stats } from "./effect/";

export type Effect = {
  target: Target;
  effect: (stats: Stats) => Stats;
};

export type Target = {
  type: "onfield" | "enemy" | string[];
};
