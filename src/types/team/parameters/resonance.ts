import type { Element, Effect } from "../../index/";

export type Resonance = {
  [e in Element]: Effect[];
};
