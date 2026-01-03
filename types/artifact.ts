import { artifactsLib, getArtifactStats } from "./index.ts";

import type { Effect, Stats } from ".";

export type Artifacts = {
  name?: string;
  sets: Set[];
  pieces: Pieces | null;
};

type Set = {
  name: string;
  _2pc: Effect[] | null;
  _4pc: Effect[] | null;
};

type Pieces = {
  stats: Stats;
  pieceStats: Stats[];
};

export async function getArtifacts(sets: string[]) {
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

  const artifact: Artifacts = {
    sets: artifactSets,
    pieces: null,
  };

  return artifact;
}
