import type { Stats } from ".";

export type Effect = {
  target: Target;
  effect: (stats: Stats) => Stats;
  duration?: number;
};

export type Target = {
  type: "onfield" | "enemy" | string[];
};
