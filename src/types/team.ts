import type { Effect, Element, Build } from ".";

export type Team = {
  name: string;
  characters: Build[];
  effects: Effect[];
  hexerei: boolean;
  moonsign: number;
  elements: Record<Element, number>;
};
