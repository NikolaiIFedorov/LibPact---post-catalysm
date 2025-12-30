export type { Talent } from "./talent.ts";
export { getTalents } from "./talent.ts";
export type { Stats } from "../index/index.ts";

export type { Hit } from "./hit.ts";

import { db } from "../index/index.ts";
const characters = await db.characters();
export { characters };
