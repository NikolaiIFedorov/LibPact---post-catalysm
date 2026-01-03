import type {
  CharacterLib,
  WeaponLib,
  Character,
  Weapon,
  Artifacts,
} from "./index.ts";

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

const defaultCharacter: Stats = {
  ATK: 0,
  Base_ATK: 0,
  CRIT_Rate: 0.05,
  CRIT_DMG: 0.5,
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

const defaultEquipment: Stats = {
  ATK: 0,
  Base_ATK: 0,
  CRIT_Rate: 0,
  CRIT_DMG: 0,
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

const defaultBuild: Stats = {
  ATK: 0,
  Base_ATK: 0,
  CRIT_Rate: 0,
  CRIT_DMG: 0,
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
export async function getCharacterStats(
  character: CharacterLib,
  ascension: number
) {
  let stats: Stats = { ...defaultCharacter };

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
        stats = await addToStat(name, Number(stat.values[1]), stats, "+");
        break;
    }
  }

  return stats;
}

export async function getWeaponStats(weapon: WeaponLib, level: number) {
  let stats: Stats = { ...defaultEquipment };

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
    console.warn(`Weapon level not found: ${level} for weapon ${weapon.name}`);
    return stats;
  }

  const primaryStatValue = Number(targetAscession.primary);

  stats = await addToStat("ATK", primaryStatValue, stats, "+");
  stats = await addToStat("Base_ATK", primaryStatValue, stats, "+");

  const secondaryStatValue = Number(targetAscession.secondary);
  const secondaryStatName = weaponStats.secondary;
  if (secondaryStatName && targetAscession.secondary) {
    stats = await addToStat(secondaryStatName, secondaryStatValue, stats, "+");
  }
  return stats;
}

export async function getArtifactStats(pieceStats: Stats[]) {
  let stats: Stats = { ...defaultEquipment };

  for (const pieceStat of pieceStats) {
    stats = await mergeStats(stats, pieceStat, "+");
  }

  return stats;
}

export async function getBuildStats(
  character: Character | null,
  weapon: Weapon | null,
  artifacts: Artifacts | null
) {
  let stats: Stats = { ...defaultBuild };

  if (character) {
    const characterStats = character.stats;
    stats = await mergeStats(stats, characterStats, "+");
  }

  if (weapon) {
    const weaponStats = weapon.stats;

    stats = await mergeStats(stats, weaponStats, "+");
  }

  if (artifacts) {
    const pieces = artifacts.pieces;
    if (pieces) {
      const artifactStats = pieces.stats;
      stats = await mergeStats(stats, artifactStats, "%");
    }
  }

  return stats;
}

async function addToStat(
  name: string,
  value: number,
  stats: Stats,
  operation: "+" | "%"
) {
  name = name.replaceAll("%", "");
  name = name.replaceAll(" ", "_");

  if (operation == "+") stats[name as keyof Stats] += value;
  else stats[name as keyof Stats] *= 1 + value;

  return stats;
}

async function mergeStats(stats1: Stats, stats2: Stats, operation: "+" | "%") {
  let stats = stats2;
  for (const stat1 in stats1) {
    const value1 = stats1[stat1 as keyof Stats];
    if (typeof value1 !== "number") continue;

    stats = await addToStat(stat1, value1, stats, operation);
  }
  return stats;
}
