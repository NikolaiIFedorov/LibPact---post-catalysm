import {
  type Element,
  type Talents,
  type Stats,
  type WeaponType,
  charactersLib,
  getTalents,
  getCharacterStats,
  normalizeName,
  CharacterLib,
} from ".";

export type Affilation = "hexerei" | "moonsign" | "none";

export function getCharacterImg(name: string): string {
  const fileName = normalizeName(name);
  return `character/${fileName}`;
}

export type CharacterParameters = {
  name: string;
  element: Element;
  weapon: WeaponType;
  affiliation: Affilation;
  img: string;
};

export function characterParametersFromName(name: string): CharacterParameters {
  const character = charactersLib.find((c) => c.name === name) as CharacterLib;
  const parameters: CharacterParameters = {
    name: character.name,
    element: character.element.id as Element,
    weapon: character.weapon_type.id as WeaponType,
    affiliation: character.affiliation as Affilation,
    img: getCharacterImg(character.name),
  };

  return parameters;
}

export function characterParametersFromLib(): CharacterParameters[] {
  return charactersLib.map((c) => {
    const parameters: CharacterParameters = {
      name: c.name,
      element: c.element.id as Element,
      weapon: c.weapon_type.id as WeaponType,
      affiliation: c.affiliation as Affilation,
      img: getCharacterImg(c.name),
    };
    return parameters;
  });
}

export type Character = {
  parameters: CharacterParameters;
  talents: Talents;
  level: number;
  constellation: number;
  stats: Stats;
} | null;

export function getCharacter(
  name: string,
  level: number = 90,
  constellation: number = 0,
) {
  let libCharacter = charactersLib.find((c) => c.name.includes(name) === true);
  if (!libCharacter) {
    console.warn(`Character not found: ${name}`);
    return null;
  }

  const talents: Talents = getTalents(libCharacter);
  const stats: Stats = getCharacterStats(libCharacter, level);

  const character: Character = {
    level: level,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: characterParametersFromName(libCharacter.name),
  };

  return character;
}
