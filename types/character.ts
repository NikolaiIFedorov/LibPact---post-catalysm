import type { Stats, Talents } from ".";
import { charactersLib, getTalents, getCharacterStats } from "./index.ts";

export type Character = {
  name: string;
  ascension: number;
  constellation: number;
  talents: Talents;
  stats: Stats;
  parameters: Parameters;
};

type Parameters = {
  element: string;
  weapon: string;
};

export async function getCharacter(
  name: string,
  ascension: number,
  constellation: number
) {
  let libCharacter = charactersLib.find((c) => c.name.includes(name) === true);
  if (!libCharacter) {
    console.warn(`Character not found: ${name}`);
    return null;
  }

  const talents: Talents = getTalents(libCharacter);
  const stats: Stats = getCharacterStats(libCharacter, ascension);

  const parameters: Parameters = {
    element: libCharacter.element.id,
    weapon: libCharacter.weapon_type.id,
  };

  const character: Character = {
    name: libCharacter.name,
    ascension: ascension,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: parameters,
  };

  return character;
}
