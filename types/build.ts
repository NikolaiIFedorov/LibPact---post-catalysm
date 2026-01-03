import type {
  Stats,
  Character,
  Weapon,
  Artifacts,
  ArtifactPieces,
} from "./index.ts";
import {
  getCharacter,
  getWeapon,
  getArtifacts,
  getBuildStats,
} from "./index.ts";

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
  character: string,
  weapon: string,
  artifactSets: string[],
  artifactPieces: ArtifactPieces,
  investment: Investment
) {
  const ascession = investment.characterAscession;
  const constellation = investment.constellation;

  const level = investment.weaponLevel;
  const refinement = investment.refinement;

  const characterBuild = await getCharacter(
    character,
    ascession,
    constellation
  );
  const weaponBuild = await getWeapon(weapon, level, refinement);
  const artifactsBuild = await getArtifacts(artifactSets, artifactPieces);

  const build: Build = {
    name: name,
    character: characterBuild,
    weapon: weaponBuild,
    artifacts: artifactsBuild,
    stats: await getBuildStats(characterBuild, weaponBuild, artifactsBuild),
  };

  return build;
}
