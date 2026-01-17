import { Page } from "./components/page";

import { Input } from "./components/input";
import { Output } from "./components/output";
import { dbTeams } from "@/db/db";
import { Team, getTeam } from "../input_types/team";
import { type InputTypeInstances } from "../input_types/index";
import { get } from "http";

export default async function Home() {
  const dataTeams = await dbTeams.get();

  let names: InputTypeInstances = {
    team: 0,
    build: 0,
    artifacts: 0,
  };

  const teams: Team[] = dataTeams.map((dbTeam) =>
    getTeam(names, JSON.parse(dbTeam)),
  );

  if (teams.length === 0) teams.push(getTeam(names));

  return (
    <Page>
      <Input layer={0} weight={1} teams={teams} names={names} />
      <Output layer={0} weight={4} />
    </Page>
  );
}
