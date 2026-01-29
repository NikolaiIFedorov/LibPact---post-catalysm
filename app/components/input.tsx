"use client";

import { InputTypeInstances } from "@/input_types/Team/index";
import {
  Container,
  TeamList,
  TeamDesc,
  FC,
  FlexProps,
  Team,
  CharacterImages,
} from "./index";
import { useState } from "react";

export const Input: FC<
  FlexProps & {
    layer: number;
    teams: Team[];
    names: InputTypeInstances;
    characterImgs: CharacterImages[];
  }
> = ({ layer, weight, teams, names, characterImgs }) => {
  const [selected, handleSelect] = useState<Team>(teams[0]);

  return (
    <Container
      weight={weight}
      fit="content"
      layer={layer}
      maxHeight="50vw"
      height="100%"
      className="sm:min-h-[100%]"
    >
      <TeamList
        layer={layer + 1}
        teams={teams}
        handleSelectAction={handleSelect}
        names={names}
      />
      <TeamDesc
        layer={layer + 1}
        team={selected}
        characterImgs={characterImgs}
      />
    </Container>
  );
};
