import type { Stats, Talent } from ".";
import { charactersDb, getTalents } from "./index.ts";

export type Character = {
  name: string;
  level: number;
  constellation: number;
  talents: Talent[];
  stats: Stats;
  parameters: Parameters;
};

type Parameters = {
  element: string;
  weapon: string;
};

export async function getCharacter(
  name: string,
  level: number,
  constellation: number
) {
  let target: any;
  for (const character of charactersDb) {
    if (character.name.includes(name)) {
      target = character;
      break;
    }
  }

  getTalents(target);

  /*
  const talents: Talent[] = getTalents(target);
  const stats: Stats = getStats(target, talents, level, constellation);

  const parameters: Parameters = {
    element: target.element,
    weapon: target.weapon,
  };

  const character: Character = {
    name: target.name,
    level: level,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: parameters,
  };*/
}
