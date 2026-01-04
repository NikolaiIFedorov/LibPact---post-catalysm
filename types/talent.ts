import type { Hit, CharacterLib } from ".";
import { getHits } from "./index.ts";

type Talent = {
  name: string;
  tap: Hit[];
  hold?: Hit[];
  plunge?: {
    low?: Hit;
    default?: Hit;
    high?: Hit;
  };
};

export type Talents = {
  normal: Talent;
  skill: Talent;
  burst: Talent;
  passives: Talent[];
};

export function getTalents(character: CharacterLib) {
  const libTalents = character.skills;

  const normal: Talent = getTalent(libTalents[0]);
  const skill: Talent = getTalent(libTalents[1]);
  const burst: Talent = getTalent(libTalents[2]);

  const talents: Talents = {
    normal: normal,
    skill: skill,
    burst: burst,
    passives: [],
  };

  return talents;
}

function getTalent(libTalent: any) {
  let tap: Hit[] = [];
  let hold: Hit[] = [];

  let lowPlunge;
  let defaultPlunge;
  let highPlunge;

  const hits = getHits(libTalent);
  for (const hit of hits) {
    if (hit.name.includes("Charged") || hit.name.includes("Hold"))
      hold.push(hit);
    else if (hit.name.includes("Plunge")) {
      if (hit.name.includes("Low")) lowPlunge = hit;
      else if (hit.name.includes("High")) highPlunge = hit;
      else defaultPlunge = hit;
    } else tap.push(hit);
  }

  const talent: Talent = {
    name: libTalent.name,
    tap: tap,
    hold: hold,
    plunge: {
      low: lowPlunge,
      high: highPlunge,
      default: defaultPlunge,
    },
  };

  return talent;
}
