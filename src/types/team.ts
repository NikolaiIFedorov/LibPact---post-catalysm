import type { Build, Parameters, Effect } from "./team/";

export type Team = {
  name: string;
  builds?: Build[];
  effects?: Effect[];
  parameters?: Parameters;
};
