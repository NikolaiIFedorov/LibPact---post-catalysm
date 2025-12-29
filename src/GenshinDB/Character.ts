import genshindb from "genshin-db";

export function Get(name: string) {
  const character = genshindb.characters(name);
  return character;
}
