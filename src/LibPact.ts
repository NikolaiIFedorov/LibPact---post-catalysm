import { getBuild, type Investment } from "../types/build.ts";

const investment: Investment = {
  characterAscession: 8,
  weaponLevel: 90,
  constellation: 0,
  refinement: 1,
};
const KazuhaBuild = await getBuild(
  "Kazuha",
  "Kazuha",
  "Freedom",
  ["Viridescent"],
  investment
);

console.log(KazuhaBuild);
