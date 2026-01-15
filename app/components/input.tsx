"use client";

import { Container, TeamList, TeamDesc, FC, FlexProps, Team } from "./index";
import { useState } from "react";

export const Input: FC<FlexProps & { teams: Team[] }> = ({ weight, teams }) => {
  const [selected, handleSelect] = useState<Team | undefined>(undefined);

  return (
    <Container
      weight={weight}
      fit="content"
      layer={1}
      maxHeight="50vw"
      height="100%"
      className="sm:min-h-[100%]"
    >
      <TeamList teams={teams} handleSelect={handleSelect} />
      <TeamDesc team={selected} />
    </Container>
  );
};
