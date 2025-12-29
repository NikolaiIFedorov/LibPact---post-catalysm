import type { Talents, Stats, Element, WeaponType } from ".";

export type Character = {
  name: string;
  level: number;
  constellation: number;
  talents: Talents[];
  stats: Stats;
  types: CharacterTypes;
};

export type CharacterTypes = {
  weaponType: WeaponType;
  element: Element;
};
