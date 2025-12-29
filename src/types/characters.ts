import type { Talents, Stats } from ".";

export type Character = {
  name: string;
  level: number;
  constellation: number;
  talents: Talents[];
  stats: Stats;
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};
