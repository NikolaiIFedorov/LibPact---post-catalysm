export type InputType = "team" | "build" | "artifacts";
export type InputTypeInstances = Record<InputType, number>;

export function getUnnamed(data: InputType, names: InputTypeInstances): string {
  const instances = names[data]++;
  const name = "Unnamed" + (instances > 0 ? ` ${instances + 1}` : "");
  return name;
}

export { type Build, getBuild } from "./Team/build.ts";
