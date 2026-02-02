import { Element } from "@/input_types/Team/Build/index";

export { useState } from "react";

export {
  charactersLib,
  type CharacterLib,
} from "@/input_types/Team/Build/import/genshindata";
export { type Element } from "@/input_types/Team/Build/Character/element";

export { Icon } from "../../../../Structure/Presets/icon";
export { Button } from "../../../../Structure/Presets/button";
export { Container } from "../../../../Structure/container";
export { Section } from "../../../../Structure/section";
export { Search } from "../../../../Structure/Presets/search";
export { List } from "./list";

export { type FC } from "../../../../Structure/index";
export { type Build } from "../../../../../../input_types/Team/build";

export {
  type CharacterParameters,
  type Character,
  getCharacter,
} from "@/input_types/Team/Build/character";

export { type DbImg } from "@/db/db";

export function colorFromElement(element?: Element) {
  if (!element) return "#040506";
  switch (element) {
    case "anemo":
      return "#5fddac";
    case "geo":
      return "#f1bf37";
    case "electro":
      return "#d08ffc";
    case "dendro":
      return "#97d00f";
    case "hydro":
      return "#04c9f9";
    case "pyro":
      return "#ea6102";
    case "cryo":
      return "#9af3f6";
    default:
      return "#040506";
  }
}
