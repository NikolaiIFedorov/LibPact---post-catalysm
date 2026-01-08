import fs from "fs";

import { getBuild, type Investment } from "../types/build.ts";
import { getArtifactPieces } from "../types/artifactPieces.ts";
import { url } from "inspector";

const investment: Investment = {
  characterAscession: 8,
  weaponLevel: 90,
  constellation: 0,
  refinement: 1,
};

const KazuhaBuild = await getBuild(
  "Kazuha build name",
  investment,
  "Raiden",
  "Freedom",
  ["Viridescent"],
  getArtifactPieces("Anemo")
);

if (KazuhaBuild.character) {
  console.log(KazuhaBuild.character.parameters.icon);
  console.log(KazuhaBuild.character.parameters.sticker);
}
