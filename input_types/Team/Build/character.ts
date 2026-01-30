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

export function getImages(name: string, db: DbImg[]): CharacterImages {
  if (name.startsWith("Traveler")) {
    return {
      icon: "Traveler icon",
      sticker: "Traveler sticker",
    };
  }
  const imgs = db.find((img) => img.character === name);
  if (imgs) {
    return {
      icon: imgs.icon,
      sticker: imgs.sticker,
    };
  }
  return {
    icon: "",
    sticker: null,
  };
}

export type CharacterParameters = {
  name: string;
  element: Element;
  weapon: WeaponType;
  affiliation: Affilation;
  images: CharacterImages;
};

export function getCharacterParameters(
  character: CharacterLib,
  db: DbImg[],
): CharacterParameters {
  const images: CharacterImages = getImages(character.name, db);

  const parameters: CharacterParameters = {
    name: character.name,
    element: character.element.id as Element,
    weapon: character.weapon_type.id as WeaponType,
    affiliation: character.affiliation as Affilation,
    images: images,
  };

  return parameters;
}

export type Character = {
  parameters: CharacterParameters;
  talents: Talents;
  ascension: number;
  constellation: number;
  stats: Stats;
} | null;

export async function getCharacter(
  name: string,
  ascension: number,
  constellation: number,
) {
  let libCharacter = charactersLib.find((c) => c.name.includes(name) === true);
  if (!libCharacter) {
    console.warn(`Character not found: ${name}`);
    return null;
  }

  const talents: Talents = getTalents(libCharacter);
  const stats: Stats = await getCharacterStats(libCharacter, ascension);

  const character: Character = {
    ascension: ascension,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: {
      name: libCharacter.name,
      element: libCharacter.element.id as Element,
      affiliation: libCharacter.affiliation as Affilation,
      weapon: libCharacter.weapon_type.id as WeaponType,
      images: {
        icon: "",
        sticker: null,
      },
    },
  };

  return character;
}
