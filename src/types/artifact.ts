import type { Effect } from "./index/";

export type Artifact = {
  set: string;
  pieces: ArtifactPiece;
};

export type ArtifactPiece = {
  pieces: 2 | 4;
  effects: Effect[];
};
