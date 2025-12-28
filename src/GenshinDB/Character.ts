import genshindb from "genshin-db";
import * as Weapon from "./Weapon.ts";

export function Get(name: string) {
  const character = genshindb.characters(name);
  return character;
}
