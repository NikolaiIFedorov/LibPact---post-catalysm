export { getUnnamed, type InputTypeInstances } from "../index.ts";

export { type Element } from "./Character/element.ts";
export { type Talents, getTalents } from "./Character/talents.ts";
export {
  type Stats,
  getCharacterStats,
  getArtifactFlatStats,
  getArtifactPercentStats,
  getWeaponStats,
} from "./stats.ts";

export {
  type CharacterLib,
  type WeaponLib,
  charactersLib,
  artifactsLib,
  weaponsLib,
} from "./import/genshindata.ts";

export { type Effect } from "./effect.ts";
export { type ArtifactPieces } from "./pieces.ts";

export { type Character } from "./character.ts";
export { type Weapon, type WeaponType } from "./weapon.ts";
export { type Artifacts } from "./artifacts.ts";
export { type Substat } from "./pieces.ts";

export function normalizeName(name: string): string {
  if (name.includes("Manekin")) return "";

  let nameNormal = name;
  if (name.includes("Traveler")) return "Traveler";

  nameNormal = nameNormal.replaceAll(" ", "_");
  return nameNormal;
}
