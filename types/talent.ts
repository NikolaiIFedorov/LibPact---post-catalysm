import type { Hit } from ".";
import { getHits } from "./index.ts";

type Talent = {
  tap: Hit[];
  hold?: Hit[];
};

export type Talents = {
  normal: Talent;
  skill: Talent;
  burst: Talent;
  passives: Talent[];
};

export function getTalents(character: any) {
  const libTalents = character.skills;

  const normal: Talent = { tap: getHits(libTalents[0]) };
  const skill: Talent = { tap: getHits(libTalents[1]) };
  const burst: Talent = { tap: getHits(libTalents[2]) };

  const talents: Talents = {
    normal: normal,
    skill: skill,
    burst: burst,
    passives: [],
  };

  return talents;
}
