import type { Hit } from ".";
import { getHits } from "./index.ts";

export type Talent = {
  slot: "normal" | "skill" | "burst" | "p1" | "p2" | "p3";
  tap: Hit[];
  hold?: Hit[];
};

export function getTalents(character: any) {
  const skills: Talent[] = talentsFromLibtalents(character.skills);

  //const talents: Talent[] = [skills, passives];
  //return talents;
}

function talentsFromLibtalents(libTalents: any) {
  const normal: Talent = { slot: "normal", tap: getHits(libTalents[0]) };
  const skill: Talent = { slot: "skill", tap: getHits(libTalents[1]) };
  const burst: Talent = { slot: "burst", tap: getHits(libTalents[2]) };

  const talents: Talent[];
  return talents;
}
