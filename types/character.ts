import type { Stats, Talents } from ".";
import { downloadData } from "../db/db.ts";
import {
  charactersLib,
  getTalents,
  getCharacterStats,
  uploadData,
} from "./index.ts";

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
  affiliation: "hexerei" | "moonsign" | "none";
  icon: string;
  sticker: string;
};

type SqlCharacter = {
  name: string;
  ascension: number;
  constellation: number;
  icon: string;
  sticker: string;
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
  const stats: Stats = await getCharacterStats(libCharacter, ascension);

  const icon = await getIcon(libCharacter.name);
  const sticker = await getSticker(libCharacter.name);

  const parameters: Parameters = {
    element: libCharacter.element.id,
    weapon: libCharacter.weapon_type.id,
    icon: icon,
    sticker: sticker,
  };

  console.log(icon);
  console.log(sticker);

  const character: Character = {
    name: libCharacter.name,
    ascension: ascension,
    constellation: constellation,
    talents: talents,
    stats: stats,
    parameters: parameters,
  };

  const sqlCharacter: SqlCharacter = {
    name: character.name,
    ascension: character.ascension,
    constellation: character.constellation,
    icon: character.parameters.icon,
    sticker: character.parameters.sticker,
  };

  uploadData("characters", JSON.stringify(sqlCharacter));

  return character;
}

async function getIcon(name: string) {
  /*const charactersSql = await downloadData("characters");
  for (const characterSql of charactersSql) {
    const jsonCharacter: SqlCharacter = JSON.parse(characterSql);
    if (jsonCharacter.name === name) return jsonCharacter.icon;
  }*/

  const galleryResponse = await fetch(
    `https://genshin-impact.fandom.com/api.php?action=query&titles=${name}/Gallery&prop=images&imlimit=500&format=json&origin=*`
  );
  const galleryData = await galleryResponse.json();
  const galleryPages = galleryData.query.pages;
  const galleryPageId = Object.keys(galleryPages)[0];
  const galleryImages = galleryPages[galleryPageId].images;

  const iconImages = galleryImages.filter((img: any) =>
    img.title.startsWith("File:" + name + " Icon")
  );

  let images = [];
  for (const img of iconImages) {
    const iconResponse = await fetch(
      `https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(
        img.title
      )}&prop=imageinfo&iiprop=url&format=json&origin=*`
    );
    const iconData = await iconResponse.json();
    const iconPages = iconData.query.pages;
    const iconPageId = Object.keys(iconPages)[0];
    const iconUrl = iconPages[iconPageId].imageinfo?.[0]?.url;

    if (iconUrl) images.push(iconUrl);
  }

  return images[0];
}

async function getSticker(name: string) {
  /*const charactersSql = await downloadData("characters");
  for (const characterSql of charactersSql) {
    const jsonCharacter: SqlCharacter = JSON.parse(characterSql);
    if (jsonCharacter.sticker === name) return jsonCharacter.sticker;
  }*/

  const galleryResponse = await fetch(
    `https://genshin-impact.fandom.com/api.php?action=query&titles=${name}/Gallery&prop=images&imlimit=500&format=json&origin=*`
  );
  const galleryData = await galleryResponse.json();
  const galleryPages = galleryData.query.pages;
  const galleryPageId = Object.keys(galleryPages)[0];
  const galleryImages = galleryPages[galleryPageId].images;

  const iconImages = galleryImages.filter(
    (img: any) =>
      img.title.startsWith("File:Icon Emoji Paimon's Paintings") &&
      img.title.includes(name)
  );

  let images = [];
  for (const img of iconImages) {
    const iconResponse = await fetch(
      `https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(
        img.title
      )}&prop=imageinfo&iiprop=url&format=json&origin=*`
    );
    const iconData = await iconResponse.json();
    const iconPages = iconData.query.pages;
    const iconPageId = Object.keys(iconPages)[0];
    const iconUrl = iconPages[iconPageId].imageinfo?.[0]?.url;

    if (iconUrl) images.push(iconUrl);
  }
  return images[0];
}
