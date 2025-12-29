import type { Element, Effect } from ".";

export type Resonance = {
  [e in Element]: Effect[];
};
