import type { Hit } from ".";

export type Talents = {
  slot: "normal" | "skill" | "burst" | "p1" | "p2" | "p3";
  Tap: Hit[];
  Hold?: Hit[];
  AltTap?: Hit[];
  AltHold?: Hit[];
};
