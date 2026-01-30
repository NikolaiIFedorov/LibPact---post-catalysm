import { Page } from "./components/page";

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
  const characterParameters: CharacterParameters[] = charactersLib.map(
    (char) => {
      return {
        name: char.name,
        element: char.element.name as Element,
        weapon: char.weapon_type.name as WeaponType,
        affiliation: char.affiliation as Affilation,
        images: getImages(char.name, characterImgs),
      };
    },
  );

  return (
    <Page>
      <Input
        layer={0}
        weight={1}
        teams={teams}
        names={names}
        characterParameters={characterParameters}
      />
      <Output layer={0} weight={4} />
    </Page>
  );
}
