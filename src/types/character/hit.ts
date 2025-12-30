import type { Element, Effect } from "../index/";

export type Hit = {
  multipliers: number[];
  element: Element;
  duration: number;
  frequency: number;
  effects: Effect[];
};
