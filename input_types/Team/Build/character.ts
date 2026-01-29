import {
  type Element,
  type Talents,
  type Stats,
  charactersLib,
  getTalents,
  getCharacterStats,
} from ".";

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

export async function getImages(name: string): Promise<CharacterImages> {
  let urlName = name;
  if (urlName.includes("Aether") || urlName.includes("Lumine"))
    urlName = "Traveler";
  else if (urlName.includes("Manekin")) urlName = "Wonderland Manekin";

  const galleryResponse = await fetch(
    `https://genshin-impact.fandom.com/api.php?action=query&titles=${urlName}/Gallery&prop=images&imlimit=1000&format=json&origin=*`,
  );

  const galleryData = await galleryResponse.json();
  const galleryPages = galleryData.query.pages;
  const galleryPageId = Object.keys(galleryPages)[0];
  const galleryImages = galleryPages[galleryPageId].images;

  const iconImage = galleryImages.filter(
    (img: any) =>
      img.title.startsWith("File:" + name + " Icon") &&
      img.title.includes(name),
  )[0];
  const icon = await urlFromImage(iconImage);

  const stickerImage = galleryImages.filter(
    (img: any) =>
      img.title.startsWith("File:Icon Emoji Paimon's Paintings") &&
      img.title.includes(name),
  )[0];
  const sticker = await urlFromImage(stickerImage);

  const images: CharacterImages = {
    icon: icon,
    sticker: sticker,
  };

  return images;
}
``;

type Parameters = {
  element: Element;
  weapon: string;
  affiliation: "hexerei" | "moonsign" | "none";
  images: CharacterImages;
};

export type Character = {
  name: string;
  parameters: Parameters;
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

  const images: CharacterImages = await getImages(libCharacter.name);

  const parameters: Parameters = {
    element: libCharacter.element.id as Element,
    weapon: libCharacter.weapon_type.id,
    affiliation: libCharacter.affiliation as "hexerei" | "moonsign" | "none",
    images: images,
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
