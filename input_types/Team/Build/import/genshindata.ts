import GenshinData from "genshin-data";
import { normalizeName } from "@/input_types/Team/Build/";

export type {
  Character as CharacterLib,
  Weapon as WeaponLib,
  Artifact as ArtifactLib,
} from "genshin-data";

import { Character } from "genshin-data";

export const lib = new GenshinData();

async function getCharactersLib() {
  const charactersData = await lib.characters();
  let charactersLib: Character[] = [];
  for (const character of charactersData) {
    const name = normalizeName(character.name);
    if (name === "") continue;
    charactersLib.push(character);
  }

  charactersLib.sort((a, b) => b.release - a.release);
  return charactersLib;
}

export const charactersLib = await getCharactersLib();
export const weaponsLib = await lib.weapons();
export const artifactsLib = await lib.artifacts();
