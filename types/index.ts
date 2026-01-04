export {
  charactersLib,
  weaponsLib,
  artifactsLib,
} from "./import/genshindata.ts";

export type {
  CharacterLib,
  WeaponLib,
  ArtifactLib,
} from "./import/genshindata.ts";

export type { Build, Investment } from "./build.ts";
export { getBuild } from "./build.ts";

export type { Parameters } from "./parameters.ts";
export type { Effect } from "./effect.ts";

export type { Stats, Stat } from "./stats.ts";
export {
  getCharacterStats,
  getWeaponStats,
  getArtifactFlatStats,
  getArtifactPercentStats,
  getBuildStats,
} from "./stats.ts";

export type { Character } from "./character.ts";
export { getCharacter } from "./character.ts";

export type { Weapon } from "./weapon.ts";
export { getWeapon } from "./weapon.ts";

export type { Artifacts } from "./artifact.ts";
export { getArtifacts } from "./artifact.ts";

export type { ArtifactPieces, Substat } from "./artifactPieces.ts";

export type { Talents } from "./talent.ts";
export { getTalents } from "./talent.ts";

export type { Hit } from "./hit.ts";
export { getHits } from "./hit.ts";

export { uploadData } from "../db/db.ts";
