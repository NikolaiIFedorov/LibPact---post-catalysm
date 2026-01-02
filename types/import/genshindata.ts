import GenshinData from "genshin-data";

export type {
  Character as CharacterLib,
  Weapon as WeaponLib,
  Artifact as ArtifactLib,
} from "genshin-data";

export const lib = new GenshinData();
export const charactersLib = await lib.characters();
export const weaponsLib = await lib.weapons();
export const artifactsLib = await lib.artifacts();
