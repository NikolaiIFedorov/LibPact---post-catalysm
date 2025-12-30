import type { Hit } from "./talent/";

export type Talent = {
  slot: "normal" | "skill" | "burst" | "p1" | "p2" | "p3";
  Tap: Hit[];
  Hold?: Hit[];
  AltTap?: Hit[];
  AltHold?: Hit[];
};
