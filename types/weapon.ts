import type { Stats, Effect } from "./index.ts";

export type Weapon = {
  weaponName: string;
  level: number;
  refinement: number;
  stats: Stats;
  effect?: Effect;
};

export type WeaponType = {
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};

export function getWeapon(name: string, level: number, refinement: number) {}
