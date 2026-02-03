import { get } from "http";
import { ArtifactLib } from "./import/genshindata.ts";
import {
  type Effect,
  type ArtifactPieces,
  artifactsLib,
  normalizeName,
} from "./index.ts";

function getSetImg(name: string) {
  const nameNormal = normalizeName(name);
  return `artifact/${nameNormal}`;
}

export type SetParameters = {
  name: string;
  quality: number;
  img: string;
  _2pc?: string;
  _4pc?: string;
};

export function setParametersFromLib(): SetParameters[] {
  return artifactsLib.map((artifact: ArtifactLib) => ({
    name: artifact.name,
    quality: artifact.max_rarity,
    img: getSetImg(artifact.name),
  }));
}

export type Set = {
  parameters: SetParameters;
  _2pc: Effect[] | null;
  _4pc: Effect[] | null;
};

export type Sets = [Set?, Set?, Set?];

export type Artifacts = {
  name?: string;
  sets?: Sets;
  pieces?: ArtifactPieces;
};

export function getSet(names?: [string?, string?, string?]): Sets {
  let sets: Sets = [];
  if (names) {
    for (const name of names) {
      if (!name) continue;

      const libSet = artifactsLib.find((a) => a.name.includes(name) === true);
      if (!libSet) {
        console.warn(`Artifact set not found: ${name}`);
        continue;
      }

      const artifactSet: Set = {
        parameters: {
          name: libSet.name,
          quality: libSet.max_rarity,
          img: getSetImg(libSet.name),
          _2pc: libSet.two_pc,
          _4pc: libSet.four_pc,
        },
        _2pc: null,
        _4pc: null,
      };

      sets.push(artifactSet);

      if (sets.length == 3) break;
    }
  }
  return sets;
}

export function getArtifacts(
  sets?: [string?, string?, string?],
  name?: string,
  pieces?: ArtifactPieces,
) {
  const setsDesc = getSet(sets);

  const artifact: Artifacts = {
    name: name,
    sets: setsDesc,
    pieces: pieces,
  };

  return artifact;
}
