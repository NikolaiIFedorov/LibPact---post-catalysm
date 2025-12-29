import type { Stats } from ".";

export type Effect = {
  target: "onfield" | "enemy" | string[];
  effect: (stats: Stats) => Stats;
};
