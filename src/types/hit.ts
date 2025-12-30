import type { Effect } from ".";

export type Hit = {
  oneHit: number[];
  twoHit?: number[];
  element?: string;
  time?: HitTime;
  stamina?: number;
  effects?: Effect[];
};

export type HitTime = {
  duration?: number;
  frequency?: number;
  cd?: number;
};
