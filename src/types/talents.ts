export type Talents = {
  slot: "normal" | "skill" | "burst" | "p1" | "p2" | "p3";
  Hold: Hit[];
  Tap: Hit[];
  AltHold?: Hit[];
  AltTap?: Hit[];
};
