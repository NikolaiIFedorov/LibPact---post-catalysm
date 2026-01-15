import {
  getUnnamed,
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

export function getBuild(data?: Build): Build {
  let build: Build = { name: "Unnamed build" };
  switch (typeof data) {
    case "undefined":
      build.name = getUnnamed("build");
      break;
    case "object":
      build = data;
      break;
    default:
      build.name = getUnnamed("build");
      console.warn(`Unexpected build data type: ${typeof data}`);
      break;
  }
  return build;
}

export async function addCharacterToBuild(
  characterName: string,
  ascession: number,
  constellation: number,
  build: Build
): Promise<Build> {
  const character = await getCharacter(characterName, ascession, constellation);
  build.character = character;
  return build;
}

export async function addWeaponToBuild(
  weaponName: string,
  level: number,
  refinement: number,
  build: Build
): Promise<Build> {
  const weapon = await getWeapon(weaponName, level, refinement);
  build.weapon = weapon;
  return build;
}

export async function addArtifactToBuild() {}
