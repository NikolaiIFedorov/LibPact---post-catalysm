import type { Effect } from "..";

export type Resonance = {
  [e in string]: Effect[];
};
