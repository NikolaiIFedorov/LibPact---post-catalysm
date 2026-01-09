import type { Build, Element } from ".";

type Sql = {
  name?: string;
  builds?: Builds;
};

export class Team {
  name?: string | "Unnamed";

  #desc?: Desc;

  #sql?: Sql;

  constructor(data?: string | Sql) {
    switch (typeof data) {
      case "string":
        this.name = data;
        break;
      case "undefined":
        this.name = "Unnamed";
        break;
      case "object":
        this.name = data.name;

        const builds = data.builds;
        if (builds) this.#desc = new Desc(builds);

        break;
    }
  }
}

type Parameters = {
  hexerei: number;
  moonsign: 0 | 1 | 2;
  elements: Record<Element, number>;
};

type Builds = [Build?, Build?, Build?, Build?];

class Desc {
  builds: Builds;
  parameters: Parameters;
  constructor(builds: Builds) {
    this.builds = builds;
    this.parameters = this.buildParameters(builds);
  }

  buildParameters(builds: Builds) {
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
}
