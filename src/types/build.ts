import type { Stats } from "./index/";
import type { Character, Weapon, Artifact } from ".";

export type Build = {
  name: string;
  character?: Character;
  weapon?: Weapon;
  artifacts?: Artifact[];
  stats?: Stats;
};
