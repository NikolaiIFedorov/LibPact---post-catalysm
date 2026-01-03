import type {
  CharacterLib,
  WeaponLib,
  Character,
  Weapon,
  Artifacts,
  ArtifactPieces,
  Substat,
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

export type Stat = {
  name: keyof Stats;
  value?: number;
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

export async function getArtifactFlatStats(pieces: ArtifactPieces) {
  let stats: Stats = { ...defaultEquipment };
  for (const pieceName in pieces) {
    const piece = pieces[pieceName as keyof ArtifactPieces];
    if (!piece) continue;

    const subStats = piece.subStats;
    for (const subStat of subStats) {
      const value = getArtifactSubstatValue(subStat, "+");
      stats = await addToStat(subStat.stat, value, stats, "+");
    }

    const main = piece.main;
    const mainValue = getArtifactMainStatValue(main, "+");
    stats = await addToStat(main, mainValue, stats, "+");
  }

  return stats;
}

export async function getArtifactPercentStats(pieces: ArtifactPieces) {
  let stats: Stats = { ...defaultEquipment };
  for (const pieceName in pieces) {
    const piece = pieces[pieceName as keyof ArtifactPieces];
    if (!piece) continue;

    const subStats = piece.subStats;
    for (const subStat of subStats) {
      const value = getArtifactSubstatValue(subStat, "%");
      stats = await addToStat(subStat.stat, value, stats, "+");
    }

    const main = piece.main;
    const mainValue = getArtifactMainStatValue(main, "%");
    stats = await addToStat(main, mainValue, stats, "+");
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
    const artifactPercentStats = artifacts.stats.percent;
    stats = await mergeStats(stats, artifactPercentStats, "%");

    const artifactFlatStats = artifacts.stats.flat;
    stats = await mergeStats(stats, artifactFlatStats, "+");
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

  if (operation == "+") {
    stats[name as keyof Stats] += value;
  } else {
    const percentValue = 1 + value;
    stats[name as keyof Stats] *= percentValue;
  }

  return stats;
}

async function mergeStats(stats1: Stats, stats2: Stats, operation: "+" | "%") {
  let targetStats;
  let operationStats;

  if (operation === "+") {
    targetStats = stats2;
    operationStats = stats1;
  } else {
    targetStats = stats1;
    operationStats = stats2;
  }

  for (const oStat in operationStats) {
    const oValue = operationStats[oStat as keyof Stats];
    if (typeof oValue !== "number") continue;

    targetStats = await addToStat(oStat, oValue, targetStats, operation);
  }
  return targetStats;
}

function getArtifactSubstatValue(substat: Substat, operation: "+" | "%") {
  const rolls = substat.rolls + 1;
  let value = 0;
  switch (substat.stat) {
    case "CRIT_Rate":
      if (operation === "+") value = 0.027;
      break;
    case "CRIT_DMG":
      if (operation === "+") value = 0.054;
      break;
    case "ATK%":
      if (operation === "%") value = 0.041;
      break;
    case "ATK":
      if (operation === "+") value = 14;
      break;
    case "Elemental_Mastery":
      if (operation === "+") value = 16;
      break;
    case "Energy_Recharge":
      if (operation === "+") value = 0.045;
      break;
    case "HP%":
      if (operation === "%") value = 0.041;
      break;
    case "HP":
      if (operation === "+") value = 209;
      break;
    case "DEF%":
      if (operation === "%") value = 0.041;
      break;
    case "DEF":
      if (operation === "+") value = 16;
      break;

    default:
      console.warn(`Unknown substat: ${substat.stat}`);
  }

  return value * rolls;
}

function getArtifactMainStatValue(stat: string, operation: "+" | "%") {
  let value = 0;
  switch (stat) {
    case "HP":
      if (operation === "+") value = 4662;
      break;
    case "ATK":
      if (operation === "+") value = 311;
      break;
    case "ATK%":
      if (operation === "%") value = 0.466;
      break;
    case "HP%":
      if (operation === "%") value = 0.466;
      break;
    case "DEF%":
      if (operation === "%") value = 0.583;
      break;
    case "Elemental_Mastery":
      if (operation === "+") value = 187;
      break;
    case "Energy_Recharge":
      if (operation === "+") value = 0.518;
      break;
    case "Physical_DMG_Bonus":
      if (operation === "+") value = 0.583;
      break;
    case "Pyro_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Hydro_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Cryo_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Electro_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Dendro_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Anemo_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Geo_DMG_Bonus":
      if (operation === "+") value = 0.466;
      break;
    case "Healing_Bonus":
      if (operation === "+") value = 0.357;
      break;
    case "CRIT_Rate":
      if (operation === "+") value = 0.311;
      break;
    case "CRIT_DMG":
      if (operation === "+") value = 0.622;
      break;

    default:
      console.warn(`Unknown main stat: ${stat}`);
  }
  return value;
}
