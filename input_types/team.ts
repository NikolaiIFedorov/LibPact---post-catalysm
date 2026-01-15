import { type Build, getUnnamed } from ".";

type Builds = [Build?, Build?, Build?, Build?];

export type Team = {
  name: string | "Unnamed team";
  builds: Builds;
};

export function getTeam(): Team {
  let team: Team = { name: "Unnamed team", builds: [] };
  team.name = getUnnamed("team");

  return team;
}

export function addBuildToTeam(team: Team, build: Build, index: number): Team {
  if (!team.builds[index]) team.builds[index] = build;

  return team;
}
