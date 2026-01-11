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

export type { Build, Investment } from "./archive/build.ts";
export { getBuild } from "./archive/build.ts";

export type { Parameters } from "./archive/parameters.ts";
export type { Element } from "./archive/element.ts";
export type { Effect } from "./archive/effect.ts";

export type { Stats, Stat } from "./archive/stats.ts";
export {
  getCharacterStats,
  getWeaponStats,
  getArtifactFlatStats,
  getArtifactPercentStats,
  getBuildStats,
} from "./archive/stats.ts";

export type { Character } from "./archive/character.ts";
export { getCharacter } from "./archive/character.ts";

export type { Weapon } from "./archive/weapon.ts";
export { getWeapon } from "./archive/weapon.ts";

export type { Artifacts } from "./archive/artifact.ts";
export { getArtifacts } from "./archive/artifact.ts";

export type { ArtifactPieces, Substat } from "./archive/artifactPieces.ts";

export type { Talents } from "./archive/talent.ts";
export { getTalents } from "./archive/talent.ts";

export type { Hit } from "./archive/hit.ts";
export { getHits } from "./archive/hit.ts";

export { uploadData } from "../db/db.ts";
