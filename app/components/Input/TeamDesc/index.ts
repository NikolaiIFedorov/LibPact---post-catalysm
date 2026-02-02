import { Weapon } from "@/input_types/Team/Build/index";

export { useState } from "react";

export { Container } from "../../Structure/container";
export { Section } from "../../Structure/section";
export { Splitter } from "../../Structure/Presets/splitter";
export { Button } from "../../Structure/Presets/button";
export { Icon } from "../../Structure/Presets/icon";

export { type FC } from "../../Structure/index";

export { Artifacts } from "./BuildDesc/artifacts";
export { CharacterDesc } from "./BuildDesc/characterDesc";
export { WeaponDesc } from "./BuildDesc/weaponDesc";

export { type Build, getBuild } from "../../../../input_types/Team/build";
export {
  type CharacterParameters,
  type Character,
} from "../../../../input_types/Team/Build/character";
export {
  type Weapon,
  type WeaponParameters,
} from "../../../../input_types/Team/Build/weapon";

export { colorFromElement } from "./BuildDesc/Character";
