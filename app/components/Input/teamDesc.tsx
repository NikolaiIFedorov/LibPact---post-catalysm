"use client";

import { useState } from "react";
import { FC, Splitter, Section, Team, BuildDesc } from "./index";

export const TeamDesc: FC<{ team?: Team }> = ({ team }) => {
  const [selected, setSelected] = useState<typeof BuildDesc | undefined>(
    undefined
  );

  return (
    <Section layer={1} direction="column">
      Team: {team?.name}
      <Splitter layer={2} />
      <BuildDesc setSelected={setSelected} />
      <BuildDesc setSelected={setSelected} />
      <BuildDesc setSelected={setSelected} />
      <BuildDesc setSelected={setSelected} />
    </Section>
  );
};
