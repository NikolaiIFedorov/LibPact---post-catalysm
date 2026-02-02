import {
  type Element,
  type Talents,
  type Stats,
  type WeaponType,
  type CharacterLib,
  charactersLib,
  getTalents,
  getCharacterStats,
  DbImg,
} from ".";

function getUrlName(name: string) {
  if (name.includes("Aether") || name.includes("Lumine")) return "Traveler";
  else if (name.includes("Manekin")) return "Wonderland Manekin";
  else return name;
}

export type Affilation = "hexerei" | "moonsign" | "none";

export function normalizeName(name: string): string {
  if (name.includes("Manekin")) return "";

  let nameNormal = name;
  if (name.includes("Traveler")) return "Traveler";

  nameNormal = nameNormal.replaceAll(" ", "_");
  return nameNormal;
}

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

export function getCharacterParameters(
  character: CharacterLib,
): CharacterParameters {
  const img: string = getCharacterImg(character.name);

  const parameters: CharacterParameters = {
    name: character.name,
    element: character.element.id as Element,
    weapon: character.weapon_type.id as WeaponType,
    affiliation: character.affiliation as Affilation,
    img: img,
  };

  return parameters;
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
    parameters: getCharacterParameters(libCharacter),
  };

  return character;
}
