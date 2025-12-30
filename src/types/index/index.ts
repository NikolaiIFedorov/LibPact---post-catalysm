export type { Effect } from "./effect.ts";
export type { Stats } from "./stats.ts";
export type { Element } from "./element.ts";

import GenshinData from "genshin-data";
const db = new GenshinData();
export { db };
