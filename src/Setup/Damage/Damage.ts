import * as Calc from "./Calculate/All.ts";

import { Stats } from "../Build.ts";

import * as Talent from "../../../GenshinDB/Talent.ts";

export function Get(stats: Stats, character: any, investment: any) {
  const atkBase: number = Calc.Atk.GetBase(stats);
  const atkAdd: number = Calc.Atk.GetAdd();
  const crit: number = Calc.Crit.Get();
  const amp: number = Calc.Amp.Get();

  const characterName = character.name;
  const talents = Talent.GetDesc(characterName);

  let dmg = talents.values;
  for (let [t, talent] of dmg.entries()) {
    let values = talent.values;
    for (let [s, sequence] of values.entries()) {
      let type = sequence.type;
      if (type == Talent.TALENT_TYPES.Attrib) continue;
      let multipliers = sequence.values;
      for (let [m, multiplier] of multipliers.entries()) {
        const atk = multiplier * atkBase + atkAdd;
        dmg[t].values[s].values[m] = atk * crit * amp;
      }
    }
  }

  return dmg;
}
