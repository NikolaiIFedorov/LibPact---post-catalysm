import { type Build, type Element, uploadData } from ".";

type Builds = [Build?, Build?, Build?, Build?];

type Parameters = {
  hexerei: number;
  moonsign: 0 | 1 | 2;
  elements: Record<Element, number>;
};

function parametersFromBuilds(builds: Builds): Parameters {
  let parameters: Parameters = {
    hexerei: 0,
    moonsign: 0,
    elements: {
      Pyro: 0,
      Hydro: 0,
      Anemo: 0,
      Electro: 0,
      Dendro: 0,
      Cryo: 0,
      Geo: 0,
    },
  };

  for (const build of builds) {
    const character = build?.character;
    if (!character) continue;

    const parametersCharacter = character.parameters;
    let element: Element = parametersCharacter.element;
    parameters.elements[element]++;

    const affiliation = parametersCharacter.affiliation;
    if (affiliation === "hexerei") {
      if (parameters.moonsign < 2) parameters.moonsign++;
    } else if (affiliation === "moonsign") {
      parameters.hexerei++;
    }
  }
  return parameters;
}

type Desc = {
  builds: Builds;
  parameters: Parameters;
};

function descFromBuilds(builds: Builds): Desc {
  const desc: Desc = {
    builds: builds,
    parameters: parametersFromBuilds(builds),
  };
  return desc;
}

type Inputs = {
  name?: string;
  builds?: Builds;
};

function dbTeamFromTeam(team: Team): Inputs {
  const dbTeam: Inputs = {
    name: team.name,
    builds: team.desc ? team.desc.builds : undefined,
  };
  return dbTeam;
}

export type Team = {
  name?: string | "Unnamed";

  desc?: Desc;

  inputData?: Inputs;
};

export function getTeam(data?: Inputs): Team {
  let team: Team = {};
  switch (typeof data) {
    case "undefined":
      team.name = "Unnamed";
      break;
    case "object":
      team.name = data.name;

      const builds = data.builds;
      if (builds) team.desc = descFromBuilds(builds);

      return team;
  }

  return team;
}
