import {
  artifactsLib,
  getArtifactFlatStats,
  getArtifactPercentStats,
} from "./index.ts";

import {
  type Effect,
  type Stats,
  type ArtifactPieces,
  uploadData,
} from "./index.ts";

export type Artifacts = {
  name?: string;
  sets: Set[];
  pieces: ArtifactPieces;
  stats?: ArtifactStats;
};

type ArtifactStats = {
  flat: Stats;
  percent: Stats;
};

type Set = {
  name: string;
  _2pc: Effect[] | null;
  _4pc: Effect[] | null;
};

export async function getArtifacts(sets: string[], pieces: ArtifactPieces) {
  let artifactSets: Set[] = [];
  for (const set of sets) {
    const libSet = artifactsLib.find((a) => a.name.includes(set) === true);
    if (!libSet) {
      console.warn(`Artifact set not found: ${set}`);
      continue;
    }

    const artifactSet: Set = {
      name: libSet.name,
      _2pc: null,
      _4pc: null,
    };

    artifactSets.push(artifactSet);

    if (artifactSets.length == 2) break;
  }

  const artifactStats = {
    flat: await getArtifactFlatStats(pieces),
    percent: await getArtifactPercentStats(pieces),
  };

  const artifact: Artifacts = {
    sets: artifactSets,
    pieces: pieces,
    stats: artifactStats,
  };

  const sqlArtifacts = {
    sets: sets,
    pieces: pieces,
  };

  uploadData("artifacts", JSON.stringify(sqlArtifacts));

  return artifact;
}
