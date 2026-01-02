import GenshinData from "genshin-data";

export const db = new GenshinData();
export const charactersDb = await db.characters();
