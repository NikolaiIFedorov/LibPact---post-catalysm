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
  const talents = Get(character);
  if (!talents) throw `Talents not found for ${character}`;

  const normal = talents.combat1;
  const normalDesc = Parse(normal);

  return normalDesc;
}

function Parse(talent: any) {
  if (!talent) throw `Talent not found`;
  const talentDescs = talent.attributes;

  let talentValues = [];
  const talentParameters = talentDescs.parameters;
  const talentAttrib = talentDescs.labels;
  for (const desc of talentAttrib) {
    let attribValues = [];
    let cacheAttrib = desc;
    let sequence = 0;
    while (true) {
      sequence++;
      const parameterStart = cacheAttrib.indexOf("param");
      const parameterEnd = cacheAttrib.indexOf(":");
      if (parameterStart == -1 || parameterEnd == -1) break;

      const parameter = cacheAttrib.slice(parameterStart, parameterEnd);
      cacheAttrib = cacheAttrib.replace("param", "");
      cacheAttrib = cacheAttrib.replace(":", "");

      const attribValue = talentParameters[parameter];
      let type;
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
    talentValues.push({ name: name, values: attribValues });
  }
  const talentName = talent.name;
  const talentDescrption = talent.description;
  const talentDesc = {
    name: talentName,
    description: talentDescrption,
    values: talentValues,
  };

  return talentDesc;
}
