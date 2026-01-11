import type { Stats, Effect } from "../index.ts";
import { weaponsLib, getWeaponStats, uploadData } from "../index.ts";

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

export async function getWeapon(
  name: string,
  level: number,
  refinement: number
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

  const sqlWeapon = {
    name: weapon.name,
    level: weapon.level,
    refinement: weapon.refinement,
  };

  uploadData("weapons", JSON.stringify(sqlWeapon));

  return weapon;
}
