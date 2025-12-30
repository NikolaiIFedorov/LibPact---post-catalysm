import type { Stats, Effect } from ".";

export type Weapon = {
  weaponName: string;
  level: number;
  refinement: number;
  stats: Stats;
  effect: Effect;
};

export type WeaponType = {
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};
