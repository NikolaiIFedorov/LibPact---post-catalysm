import type { Stats } from "./index/";
import type { Talent, Element, WeaponType } from "./character/";

export type Character = {
  name: string;
  level: number;
  constellation: number;
  talents: Talent[];
  stats: Stats;
  parameters: CharacterParameters;
};

export type CharacterParameters = {
  element: Element;
  weapon: WeaponType;
};
