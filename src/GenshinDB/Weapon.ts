import genshindb from "genshin-db";

export function Get(name: string) {
  const weapon = genshindb.weapons(name);
  return weapon;
}
