import type { Build, Parameters, Effect } from ".";

export type Team = {
  name: string;
  builds?: Build[];
  effects?: Effect[];
  parameters?: Parameters;
};
