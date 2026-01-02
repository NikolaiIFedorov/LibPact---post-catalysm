import GenshinData from "genshin-data";

export const lib = new GenshinData();
export const charactersLib = await lib.characters();
export const weaponsLib = await lib.weapons();
