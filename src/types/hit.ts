import type { Effect, Element } from ".";

export type Hit = {
  multipliers: number[];
  effects: Effect[];
  duration: number;
  frequency: number;
  element: Element;
};
