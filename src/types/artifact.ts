import type { Effect } from ".";

export type Artifact = {
  set: string;
  pieces: ArtifactPiece;
};

export type ArtifactPiece = {
  pieces: 2 | 4;
  effect: Effect;
};
