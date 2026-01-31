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

async function urlFromImage(image: any) {
  if (!image) return null;
  const iconResponse = await fetch(
    `https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(
      image.title,
    )}&prop=imageinfo&iiprop=url&format=json&origin=*`,
  );
  const iconData = await iconResponse.json();
  const iconPages = iconData.query.pages;
  const iconPageId = Object.keys(iconPages)[0];
  const iconUrl = iconPages[iconPageId].imageinfo?.[0]?.url;

  return iconUrl;
}

export type CharacterImages = {
  icon: string;
  sticker: string | null;
};

export type Affilation = "hexerei" | "moonsign" | "none";

export function getImg(name: string, db: DbImg[]): string {
  if (name.startsWith("Traveler")) {
    return "Traveler icon";
  }
  const imgs = db.find((img) => img.character === name);
  if (imgs) {
    return imgs.icon;
  }
  return "";
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
  db: DbImg[],
): CharacterParameters {
  const img: string = getImg(character.name, db);

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
  dbImg: DbImg[],
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
    parameters: getCharacterParameters(libCharacter, dbImg),
  };

  return character;
}
