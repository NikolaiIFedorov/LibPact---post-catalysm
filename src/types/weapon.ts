import type { Stats, Effect } from ".";

export type Weapon = {
  weaponName: string;
  level: number;
  refinement: number;
  effect: Effect;
  stats: Stats;
};

export type WeaponType = {
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};
