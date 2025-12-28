import genshindb from "genshin-db";

export const TALENT_TYPES: TalentTypes = { Dmg: "Dmg", Attrib: "Attrib" };

type TalentTypes = {
  Dmg: string;
  Attrib: string;
};

export function Get(name: string) {
  const talent = genshindb.talents(name);
  return talent;
}

export function GetDesc(character: string) {
  // Returns talents in an organized object
  const talents = Get(character);
  if (!talents) throw `Talents not found for ${character}`;

  //TODO: Return all talents
  const normal = talents.combat1; // Currently trying to calculate normal attacks
  const normalDesc = Parse(normal);

  const talentDesc = { normal: normalDesc };

  return talentDesc;
}

function Parse(talent: any) {
  if (!talent) throw `Talent does not exist`;
  const attributes = talent.attributes;

  let values = [];
  const parameters = attributes.parameters;
  const labels = attributes.labels;
  for (const label of labels) {
    const value = AttribToValue(label, parameters);
    values.push(value);
  }

  const name = talent.name;
  const description = talent.description;
  const parsed = {
    name: name,
    description: description,
    values: values,
  };

  return parsed;
}

function AttribToValue(desc: string, talentParameters: any) {
  let attribValues = [];
  let cacheAttrib = desc;
  let sequence = 0;
  while (true) {
    sequence++;
    const parameterStart = cacheAttrib.indexOf("param");
    const parameterEnd = cacheAttrib.indexOf(":");
    if (parameterStart == -1 || parameterEnd == -1) break;

    const parameter: string = cacheAttrib.slice(parameterStart, parameterEnd);
    cacheAttrib = cacheAttrib.replace("param", "");
    cacheAttrib = cacheAttrib.replace(":", "");

    let type;
    const attribValue = talentParameters[parameter];
    if (attribValue[0] == attribValue[1]) type = TALENT_TYPES.Attrib;
    else type = TALENT_TYPES.Dmg;
    attribValues.push({
      type: type,
      sequence: sequence,
      values: attribValue,
    });
  }

  const nameEnd = desc.indexOf("|");
  const nameEnding = desc.slice(nameEnd);
  const name = desc.replace(nameEnding, "");

  return { name: name, values: attribValues };
}
