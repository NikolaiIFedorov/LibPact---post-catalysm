import type { Element, Effect } from ".";

export type Hit = {
  multipliers: number[];
  element: Element;
  duration: number;
  frequency: number;
  effects: Effect[];
};
