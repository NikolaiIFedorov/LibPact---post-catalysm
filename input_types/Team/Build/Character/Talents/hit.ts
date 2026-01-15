import type { Effect } from ".";

export type Hit = {
  name: string;
  instances: Array<Number[]>;
  type: "dmg" | "parameter";
  effecst?: Effect[];
};

export type HitTime = {
  duration?: number;
  frequency?: number;
  cd?: number;
};

export function getHits(talents: any) {
  let hits: Hit[] = [];

  for (const attribute of talents.attributes) {
    if (attribute.label.includes("/")) {
      hits.push(...hitsFromAttribute(attribute));
      continue;
    }

    const instances = instancesFromValues(attribute.values);

    const hit: Hit = {
      name: attribute.label,
      instances: instances,
      type: typeFromInstances(instances),
    };

    hits.push(hit);
  }

  return hits;
}

function cleanValue(value: string) {
  let cleanedValue = value;

  cleanedValue = cleanedValue.replaceAll(" ", "");
  cleanedValue = cleanedValue.replaceAll("/", "");
  cleanedValue = cleanedValue.replaceAll("+", "");
  cleanedValue = cleanedValue.replaceAll("×", "");

  return cleanedValue;
}

function hitsFromAttribute(attribute: any) {
  let value1 = [];
  let value2 = [];
  for (const value of attribute.values) {
    const values = splitValue(value);
    value1.push(values[0]);
    value2.push(values[1]);
  }

  const names = splitName(attribute.label);

  const instance1 = instancesFromValues(value1);
  const hit1: Hit = {
    name: names[0],
    instances: instance1,
    type: typeFromInstances(instance1),
  };

  const instance2 = instancesFromValues(value2);
  const hit2: Hit = {
    name: names[1],
    instances: instance2,
    type: typeFromInstances(instance2),
  };

  const hits = [hit1, hit2];

  return hits;
}

function splitValue(value: string) {
  const index = value.indexOf("/");

  let value1 = value.substring(0, index);
  value1 = cleanValue(value1);

  let value2 = value.substring(index, value.length);
  value2 = cleanValue(value2);

  const values = [value1, value2];
  return values;
}

function splitName(name: string) {
  const id1End = name.indexOf("/");
  const id2End = name.indexOf(" ");
  const end = name.substring(id2End, name.length);

  let id1 = name.substring(0, id1End);
  const name1 = id1 + end;

  let id2 = name.substring(id1End + 1, id2End);
  const name2 = id2 + end;

  const names = [name1, name2];
  return names;
}

function instancesFromValues(values: string[]) {
  let instances = [];
  for (const value of values) {
    let levelInstances = [];
    if (value.includes("+")) {
      const index = value.indexOf("+");

      const strInstance1 = value.substring(0, index);
      const strInstance2 = value.substring(index, value.length);
      const instance1 = instanceFromSubvalue(strInstance1);
      const instance2 = instanceFromSubvalue(strInstance2);

      levelInstances.push(instance1);
      levelInstances.push(instance2);
    } else if (value.includes("×")) {
      const index = value.indexOf("×");
      const instanceCount = Number(value[index + 1]);

      const instanceStr = value.substring(0, index);
      const instance = instanceFromSubvalue(instanceStr);

      for (let i = 0; i < instanceCount; i++) levelInstances.push(instance);
    } else {
      const instance = instanceFromSubvalue(value);
      levelInstances.push(instance);
    }

    instances.push(levelInstances);
  }
  return instances;
}

function instanceFromSubvalue(subValue: string) {
  let cleanedValue = cleanValue(subValue);
  cleanedValue = cleanedValue.replaceAll("%", "");

  const instance = Number(cleanedValue) / 100;
  return instance;
}

function typeFromInstances(instances: Array<number[]>) {
  const instance1 = instances[0][0];
  const instance2 = instances[1][0];

  if (instance1 == instance2 || (isNaN(instance1) && isNaN(instance2)))
    return "parameter";
  else return "dmg";
}
