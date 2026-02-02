import { Window } from "./components/window";

import { Input } from "./components/input";
import { Output } from "./components/output";
import { dbTeams } from "@/db/db";
import { Team, getTeam } from "../input_types/team";
import { type InputTypeInstances } from "../input_types/index";
import {
  Affilation,
  CharacterParameters,
  getCharacterImg,
} from "@/input_types/Team/Build/character";
import {
  charactersLib,
  weaponsLib,
  Element,
  WeaponType,
} from "../input_types/Team/Build/";
import {
  getWeaponImg,
  WeaponParameters,
} from "@/input_types/Team/Build/weapon";

export default async function Home() {
  const dataTeams = await dbTeams.get();

  let names: InputTypeInstances = {
    team: 0,
    build: 0,
    artifacts: 0,
  };
  const teams: Team[] = dataTeams.map((dbTeam) => getTeam(names, dbTeam));
  if (teams.length === 0) teams.push(getTeam(names));

  let characterParameters: CharacterParameters[] = [];
  for (const characterLib of charactersLib) {
    if (characterLib.name.includes("Manekin")) continue;
    characterParameters.push({
      name: characterLib.name,
      element: characterLib.element.id as Element,
      weapon: characterLib.weapon_type.name as WeaponType,
      affiliation: characterLib.affiliation as Affilation,
      img: getCharacterImg(characterLib.name),
    });
  }

  let weaponParameters: WeaponParameters[] = [];
  for (const weaponLib of weaponsLib) {
    weaponParameters.push({
      name: weaponLib.name,
      img: getWeaponImg(weaponLib.name),
      type: weaponLib.type.name as WeaponType,
    });
  }

  console.log(weaponParameters);

  return (
    <Window>
      <Input
        layer={0}
        weight={1}
        teams={teams}
        names={names}
        characterParameters={characterParameters}
      />
      <Output layer={0} weight={4} />
    </Window>
  );
}
