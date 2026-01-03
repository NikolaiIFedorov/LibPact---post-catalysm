import { getBuild, type Investment } from "../types/build.ts";
import { getArtifactPieces } from "../types/artifactPieces.ts";

const investment: Investment = {
  characterAscession: 8,
  weaponLevel: 90,
  constellation: 0,
  refinement: 1,
};

const KazuhaBuild = await getBuild(
  "Kazuha build name",
  "Kazuha",
  "Freedom",
  ["Viridescent"],
  getArtifactPieces("Anemo"),
  investment
);

console.log(KazuhaBuild);
