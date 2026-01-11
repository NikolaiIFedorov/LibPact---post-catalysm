import type { Stats } from "..";

export type Effect = {
  target: Target;
  effect: (stats: Stats) => Stats;
  dueration?: number;
};

export type Target = {
  type: "onfield" | "enemy" | string[];
};
