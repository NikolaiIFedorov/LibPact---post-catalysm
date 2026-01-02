import type { CharacterLib, WeaponLib } from "./index.ts";

export type Stats = {
  ATK: number;
  Base_ATK: number;

  CRIT_Rate: number;
  CRIT_DMG: number;
  Elemental_Mastery: number;
  Energy_Recharge: number;

  HP: number;
  DEF: number;

  Physical_DMG_Bonus: number;
  Pyro_DMG_Bonus: number;
  Hydro_DMG_Bonus: number;
  Cryo_DMG_Bonus: number;
  Electro_DMG_Bonus: number;
  Dendro_DMG_Bonus: number;
  Anemo_DMG_Bonus: number;
  Geo_DMG_Bonus: number;
  Healing_Bonus: number;
};

const defaultStats: Stats = {
  ATK: 0,
  Base_ATK: 0,
  CRIT_Rate: 50,
  CRIT_DMG: 50,
  Elemental_Mastery: 0,
  Energy_Recharge: 0,

  HP: 0,
  DEF: 0,

  Physical_DMG_Bonus: 0,
  Pyro_DMG_Bonus: 0,
  Hydro_DMG_Bonus: 0,
  Cryo_DMG_Bonus: 0,
  Electro_DMG_Bonus: 0,
  Dendro_DMG_Bonus: 0,
  Anemo_DMG_Bonus: 0,
  Geo_DMG_Bonus: 0,
  Healing_Bonus: 0,
};

export function getCharacterStats(character: CharacterLib, ascension: number) {
  let stats: Stats = defaultStats;

  const characterStats = character.ascension[ascension - 1].stats;
  for (const stat of characterStats) {
    const name = stat.label;
    switch (name) {
      case "Ascend":
        break;
      case "Base ATK":
        stats.Base_ATK += Number(stat.values[1]);
        stats.ATK += Number(stat.values[1]);
        break;
      case "Base HP":
        stats.HP += Number(stat.values[1]);
        break;
      case "Base DEF":
        stats.DEF += Number(stat.values[1]);
        break;
      default:
        stats = addToStat(name, Number(stat.values[1]), stats);
        break;
    }
  }

  return stats;
}

export function getWeaponStats(weapon: WeaponLib, level: number) {
  let stats: Stats = defaultStats;

  const weaponStats = weapon.stats;

  let targetAscession;
  for (const ascession of weaponStats.levels) {
    const forLevel = ascession.level;
    if (forLevel === level) {
      targetAscession = ascession;
      break;
    }
  }

  if (!targetAscession) {
    console.error(`Weapon level not found: ${level} for weapon ${weapon.name}`);
    return stats;
  }

  const primaryStatValue = Number(targetAscession.primary);
  stats = addToStat(weaponStats.primary, primaryStatValue, stats);

  const secondaryStatValue = Number(targetAscession.secondary);
  const secondaryStatName = weaponStats.secondary;
  if (secondaryStatName && targetAscession.secondary) {
    stats = addToStat(secondaryStatName, secondaryStatValue, stats);
  }

  return stats;
}

function addToStat(name: string, value: number, stats: Stats) {
  name = name.replaceAll("%", "");
  name = name.replaceAll(" ", "_");

  stats[name as keyof Stats] += value;
  return stats;
}
