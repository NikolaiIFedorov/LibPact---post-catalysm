import type { Element, Effect } from "./team";

export type Resonance = {
  [e in Element]: Effect[];
};
