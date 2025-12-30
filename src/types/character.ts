import type { Stats } from ".";
import type { Talent } from ".";

export type Character = {
  name: string;
  level: number;
  constellation: number;
  talents: Talent[];
  stats: Stats;
  parameters: Parameters;
};

type Parameters = {
  element: string;
  weapon: string;
};
