import {
  getUnnamed,
  type Effect,
  type Stats,
  type ArtifactPieces,
  artifactsLib,
  getArtifactFlatStats,
  getArtifactPercentStats,
} from "./index.ts";

type Set = {
  name: string;
  _2pc: Effect[] | null;
  _4pc: Effect[] | null;
};

type Sets = [Set?, Set?];

type ArtifactStats = {
  flat: Stats;
  percent: Stats;
};

export type Artifacts = {
  name: string;
  set?: Sets;
  pieces: ArtifactPieces;
  stats: ArtifactStats;
};

export async function getArtifacts(
  sets: string[],
  pieces: ArtifactPieces,
  name?: string
) {
  let setsDesc: Sets = [];
  for (const piece of sets) {
    const libPiece = artifactsLib.find((a) => a.name.includes(piece) === true);
    if (!libPiece) {
      console.warn(`Artifact set not found: ${piece}`);
      continue;
    }

    const artifactSet: Set = {
      name: libPiece.name,
      _2pc: null,
      _4pc: null,
    };

    setsDesc.push(artifactSet);

    if (setsDesc.length == 2) break;
  }

  const stats = {
    flat: await getArtifactFlatStats(pieces),
    percent: await getArtifactPercentStats(pieces),
  };

  const artifactsName = name ? name : getUnnamed("artifacts");

  const artifact: Artifacts = {
    name: artifactsName,
    set: setsDesc,
    pieces: pieces,
    stats: stats,
  };

  return artifact;
}
