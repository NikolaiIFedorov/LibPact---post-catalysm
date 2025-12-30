import type { Stats } from "./index/index.ts";
import { characters, getTalents } from "./character/index.ts";
import type { Talent } from "./character/index.ts";

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

export function getCharacter(
  name: string,
  level: number,
  constellation: number
) {
  let target;
  for (const character of characters) {
    const characterName = character.name;
    if (characterName.includes(name)) {
      target = character;
      break;
    }
  }

  if (!target) {
    console.warn(`Character not found: ${name}`);
    return null;
  }

  const characterName = target.name;
  const talents = getTalents(target);
  /*const stats: Stats;
  const element = target.element.id;
  const weaponType = target.weapon_type.id;
  const parameters: Parameters = {
    element: element,
    weapon: weaponType,
  };

  const character: Character = {
    name: characterName,
    level: level,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: parameters,
  };

  return character;*/
}
