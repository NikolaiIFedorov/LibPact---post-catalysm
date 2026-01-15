import { Page } from "./components/page";

import { Input } from "./components/input";
import { Output } from "./components/output";
import { dbTeams } from "@/db/db";
import { Team } from "../input_types/team";

export default async function Home() {
  let teams: Team[] = [];
  for (const dbTeam of await dbTeams.get()) {
    const team = JSON.parse(dbTeam);
    teams.push(team);
  }

  return (
    <Page>
      <Input weight={1} teams={teams} />
      <Output weight={4} />
    </Page>
  );
}
