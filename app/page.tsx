import { Page } from "./components/page";

import { Input } from "./components/input";
import { Output } from "./components/output";
import { dbTeams } from "@/db/db";
import { Team, getTeam } from "../input_types/team";
import { type InputTypeInstances } from "../input_types/index";
import { dbImg, type DbImg } from "@/db/db";
import { CharacterImages } from "./components";

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
  console.log(characterImgs);

  return (
    <Page>
      <Input
        layer={0}
        weight={1}
        teams={teams}
        names={names}
        characterImgs={characterImgs as CharacterImages[]}
      />
      <Output layer={0} weight={4} />
    </Page>
  );
}
