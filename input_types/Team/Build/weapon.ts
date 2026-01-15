import {
  type Stats,
  type Effect,
  weaponsLib,
  getWeaponStats,
  getUnnamed,
} from "./index.ts";

export type Weapon = {
  name: string;
  level: number;
  refinement: number;
  stats: Stats;
  effect: Effect | null;
} | null;

export type WeaponType = {
  weaponType: "sword" | "polearm" | "catalyst" | "bow" | "claymore";
};

export async function getWeapon(
  name: string,
  level: number,
  refinement: number,
  buildName?: string
) {
  const libWeapon = weaponsLib.find((w) => w.name.includes(name) === true);

  if (!libWeapon) {
    console.warn(`Weapon not found: ${name}`);
    return null;
  }

  const stats = await getWeaponStats(libWeapon, level);
  const effect = null;

  const weapon: Weapon = {
    name: libWeapon.name,
    level: level,
    refinement: refinement,
    stats: stats,
    effect: effect,
  };

  return weapon;
}
