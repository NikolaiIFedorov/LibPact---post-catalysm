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

  return (
    <Window>
      <Input layer={0} weight={1} teams={teams} names={names} />
      <Output layer={0} weight={4} />
    </Window>
  );
}
