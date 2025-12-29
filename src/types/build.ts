import type { Character } from ".";

export type Build = {
  name: string;
  character: Character;
  weapon: Weapon;
  artifacts: Artifact[];
  artifactSets: num;
  stats: Stats;
};
