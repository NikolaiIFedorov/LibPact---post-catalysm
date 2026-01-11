import type {
  Stats,
  Character,
  Weapon,
  Artifacts,
  ArtifactPieces,
} from "../index.ts";
import {
  getCharacter,
  getWeapon,
  getArtifacts,
  getBuildStats,
  uploadData,
} from "../index.ts";

export type Build = {
  name: string;
  character: Character | null;
  weapon: Weapon | null;
  artifacts: Artifacts | null;
  stats: Stats;
};

export type Investment = {
  characterAscession: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  constellation: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  weaponLevel: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
  refinement: 1 | 2 | 3 | 4 | 5;
};

export async function getBuild(
  name: string,
  investment: Investment,
  character: string | null,
  weapon: string | null,
  artifactSets: string[] | null,
  artifactPieces: ArtifactPieces | null
) {
  const ascession = investment.characterAscession;
  const constellation = investment.constellation;

  const level = investment.weaponLevel;
  const refinement = investment.refinement;

  let characterBuild: Character | null = null;
  if (character)
    characterBuild = await getCharacter(character, ascession, constellation);

  let weaponBuild: Weapon | null = null;
  if (weapon) weaponBuild = await getWeapon(weapon, level, refinement);
  let artifactsBuild: Artifacts | null = null;

  if (artifactSets && artifactPieces)
    artifactsBuild = await getArtifacts(artifactSets, artifactPieces);

  const build: Build = {
    name: name,
    character: characterBuild,
    weapon: weaponBuild,
    artifacts: artifactsBuild,
    stats: await getBuildStats(characterBuild, weaponBuild, artifactsBuild),
  };

  const sqlBuild = {
    name: name,
    character: characterBuild?.name || "null",
    weapon: weaponBuild?.name || "null",
    sets: artifactsBuild?.sets,
    pieces: artifactsBuild?.pieces,
    investment: investment,
  };

  await uploadData("builds", JSON.stringify(sqlBuild));
  return build;
}
