import {
  type Stats,
  type Effect,
  weaponsLib,
  type WeaponLib,
  getWeaponStats,
  normalizeName,
} from "./index.ts";

export type WeaponType = "Sword" | "Polearm" | "Catalyst" | "Bow" | "Claymore";

export type WeaponParameters = {
  name: string;
  img: string;
  type: WeaponType;
};

export type Weapon = {
  parameters: WeaponParameters;
  level: number;
  refinement: number;
  effect: Effect | null;
  stats: Stats;
} | null;

export function getWeaponImg(name: string): string {
  const fileName = normalizeName(name);
  return `weapon/${fileName}`;
}

export function weaponParametersFromName(name: string): WeaponParameters {
  const weapon = weaponsLib.find((w) => w.name === name) as WeaponLib;
  return {
    name: name,
    img: getWeaponImg(name),
    type: weapon.type.id as WeaponType,
  };
}

export function weaponParametersFromLib(): WeaponParameters[] {
  return weaponsLib.map((weapon) => weaponParametersFromName(weapon.name));
}

export function getWeapon(
  name: string,
  level: number,
  refinement: number,
): Weapon {
  const libWeapon = weaponsLib.find((w) => w.name.includes(name) === true);

  if (!libWeapon) {
    console.warn(`Weapon not found: ${name}`);
    return null;
  }

  const stats = getWeaponStats(libWeapon, level);
  const effect = null;

  const weapon: Weapon = {
    level: level,
    refinement: refinement,
    stats: stats,
    effect: effect,
    parameters: weaponParametersFromName(libWeapon.name),
  };
  return weapon;
}
