import type { Stats, Character, Weapon, Artifact } from ".";

export type Build = {
  name: string;
  character?: Character;
  weapon?: Weapon;
  artifacts?: Artifact[];
  stats?: Stats;
};
