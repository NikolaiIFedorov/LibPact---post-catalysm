import { type Build, getUnnamed, getBuild, type InputTypeInstances } from ".";

type Builds = [Build, Build, Build, Build];

export type Team = {
  name: string | "Unnamed team";
  builds: Builds;
};

function getPreset(names: InputTypeInstances): Team {
  const preset: Team = {
    name: getUnnamed("team", names),
    builds: [
      getBuild(names),
      getBuild(names),
      getBuild(names),
      getBuild(names),
    ],
  };
  return preset;
}

export function getTeam(names: InputTypeInstances, data?: any): Team {
  let team: Team = getPreset(names);
  if (data) {
    team.name = data.name;
    team.builds = data.builds;
  }

  return team;
}

export function addBuildToTeam(team: Team, build: Build, index: number): Team {
  if (!team.builds[index]) team.builds[index] = build;

  return team;
}
