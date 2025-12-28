import { Stats } from "../../Build.ts";

export function GetBase(stats: Stats) {
  const base = stats.atk;
  return base;
}

export function GetAdd() {
  // TODO: Add support for reactions like aggravate or song of days past
  return 0;
}
