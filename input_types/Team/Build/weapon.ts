import {
  type Stats,
  type Effect,
  weaponsLib,
  type WeaponLib,
  getWeaponStats,
  DbImg,
} from "./index.ts";

export type WeaponType = "sword" | "polearm" | "catalyst" | "bow" | "claymore";

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

export function getWeaponImg(name: string, db: DbImg[]): string {
  const imgs = db.find((img) => img.name === name);
  if (imgs) {
    return imgs.img;
  }
  return "";
}

export function getWeaponParameters(
  weapon: WeaponLib,
  imgs: DbImg[],
): WeaponParameters {
  return {
    name: weapon.name,
    img: getWeaponImg(weapon.name, imgs),
    type: weapon.type.id as WeaponType,
  };
}

export function getWeapon(
  name: string,
  level: number,
  refinement: number,
  imgs: DbImg[],
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
    parameters: getWeaponParameters(libWeapon, imgs),
  };
  return weapon;
}
