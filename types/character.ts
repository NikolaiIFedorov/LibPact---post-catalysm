import type { Stats, Talents } from ".";
import { charactersLib, getTalents, getStats } from "./index.ts";

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
  let target: any;
  for (const character of charactersLib) {
    if (character.name.includes(name)) {
      target = character;
      break;
    }
  }

  const talents: Talents = getTalents(target);
  const stats: Stats = getStats(target, ascension);

  const parameters: Parameters = {
    element: target.element.id,
    weapon: target.weapon_type.id,
  };

  const character: Character = {
    name: target.name,
    ascension: ascension,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: parameters,
  };

  return character;
}
