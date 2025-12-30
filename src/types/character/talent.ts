import type { Hit } from ".";

export type Talent = {
  slot: "normal" | "skill" | "burst" | "p1" | "p2" | "p3";
  Tap: Hit[];
  Hold?: Hit[];
  AltTap?: Hit[];
  AltHold?: Hit[];
};

export function getTalents(character: any) {
  const combat = character.skills;
  const normal = combat[0];
  const skill = combat[1];
  const burst = combat[2];

  console.log(normal);
}
