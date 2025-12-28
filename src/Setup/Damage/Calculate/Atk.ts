import { Stats } from "../../Build.ts";

import * as Talent from "../../../../GenshinDB/Talent.ts";

export function GetBase(stats: Stats) {
  const base = stats.atk;
  return base;
}

export function GetAdd() {
  return 0;
}
