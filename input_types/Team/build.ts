import {
  getUnnamed,
  InputTypeInstances,
  Character,
  Weapon,
  Artifacts,
  getCharacter,
  getWeapon,
} from "./index";

export type Build = {
  name: string | "Unnamed build";
  character?: Character;
  weapon?: Weapon;
  artifacts?: Artifacts;
};

export function getBuild(names: InputTypeInstances): Build {
  let build: Build = { name: "Unnamed build" };
  build.name = getUnnamed("build", names);

  return build;
}

export async function addCharacterToBuild(
  characterName: string,
  ascession: number,
  constellation: number,
  build: Build,
): Promise<Build> {
  const character = await getCharacter(characterName, ascession, constellation);
  build.character = character;
  return build;
}

export async function addWeaponToBuild(
  weaponName: string,
  level: number,
  refinement: number,
  build: Build,
): Promise<Build> {
  const weapon = await getWeapon(weaponName, level, refinement);
  build.weapon = weapon;
  return build;
}

export async function addArtifactToBuild() {}
