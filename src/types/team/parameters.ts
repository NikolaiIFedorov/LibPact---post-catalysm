import type { Element } from "./parameters/";

export type Parameters = {
  hexerei: boolean;
  moonsign: number;
  elements: Record<Element, number>;
};
