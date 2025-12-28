import * as Calc from "./Calculate/All.ts";

import { Stats } from "../Build.ts";

import * as Talent from "../../GenshinDB/Talent.ts";

export function Get(stats: Stats, character: any) {
  const atkBase: number = Calc.Atk.GetBase(stats);
  const atkAdd: number = Calc.Atk.GetAdd();
  const crit: number = Calc.Crit.Get();
  const amp: number = Calc.Amp.Get();

  const characterName = character.name;
  const talents = Talent.GetDesc(characterName);

  let normal = talents.normal;
  normal.values = Calculate(normal, atkBase, atkAdd, crit, amp);

  const dmg = { normal: normal };

  return dmg;
}

function Calculate(
  talent: any,
  atkBase: number,
  atkAdd: number,
  crit: number,
  amp: number
) {
  let dmg = talent.values;
  for (let [p, parameter] of dmg.entries()) {
    let values = parameter.values;
    for (let [s, sequence] of values.entries()) {
      let type = sequence.type;
      if (type == Talent.TALENT_TYPES.Attrib) continue;
      let multipliers = sequence.values;
      for (let [m, multiplier] of multipliers.entries()) {
        const atk = multiplier * atkBase + atkAdd;
        dmg[p].values[s].values[m] = atk * crit * amp;
      }
    }
  }
  return dmg;
}
