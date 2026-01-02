import type { Stats, Effect } from "./index.ts";
import { weaponsLib, getWeaponStats } from "./index.ts";

export type Weapon = {
  name: string;
  level: number;
  refinement: number;
  stats: Stats;
  effect: Effect | null;
};

export type WeaponType = {
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};

export function getWeapon(name: string, level: number, refinement: number) {
  const libWeapon = weaponsLib.find((w) => w.name.includes(name) === true);

  if (!libWeapon) {
    console.error(`Weapon not found: ${name}`);
    return null;
  }

  const stats = getWeaponStats(libWeapon, level);
  const effect = null;

  const weapon: Weapon = {
    name: name,
    level: level,
    refinement: refinement,
    stats: stats,
    effect: effect,
  };
  return weapon;
}
