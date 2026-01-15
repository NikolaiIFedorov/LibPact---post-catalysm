export type InputType = "team" | "build" | "artifacts";
type InputTypeInstances = Record<InputType, number>;

let names: InputTypeInstances = {
  team: 1,
  build: 1,
  artifacts: 1,
};

export function getUnnamed(data: InputType): string {
  const instances = names[data]++;
  const name = "Unnamed" + (instances > 1 ? ` ${instances}` : "");
  return name;
}

export { type Build, getBuild } from "./Team/build.ts";
