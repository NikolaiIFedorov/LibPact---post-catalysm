import { Window } from "./components/window";

import { Input } from "./components/input";
import { Output } from "./components/output";
import { dbTeams, dbImg } from "@/db/db";
import { Team, getTeam } from "../input_types/team";
import { type InputTypeInstances } from "../input_types/index";
import {
  Affilation,
  CharacterParameters,
  getImages,
} from "@/input_types/Team/Build/character";
import { charactersLib, Element, WeaponType } from "../input_types/Team/Build/";

export default async function Home() {
  const dataTeams = await dbTeams.get();

  let names: InputTypeInstances = {
    team: 0,
    build: 0,
    artifacts: 0,
  };
  const teams: Team[] = dataTeams.map((dbTeam) => getTeam(names, dbTeam));
  if (teams.length === 0) teams.push(getTeam(names));

  const characterImgs = await dbImg.get();

  let characterParameters: CharacterParameters[] = [];
  for (const characterLib of charactersLib) {
    if (characterLib.name.includes("Manekin")) continue;
    characterParameters.push({
      name: characterLib.name,
      element: characterLib.element.name as Element,
      weapon: characterLib.weapon_type.name as WeaponType,
      affiliation: characterLib.affiliation as Affilation,
      images: getImages(characterLib.name, characterImgs),
    });
  }

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
