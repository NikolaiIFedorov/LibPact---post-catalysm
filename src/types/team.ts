import type { TeamEffects, Build } from ".";

export type Team = {
  name: string;
  characters?: Build[];
  effects?: TeamEffects;
};
