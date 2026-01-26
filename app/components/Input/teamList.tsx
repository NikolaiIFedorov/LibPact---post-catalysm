"use client";

import { useCallback, useEffect, useReducer } from "react";
import { FC, Section, List, Actions, getTeam, Team, Splitter } from "./index";
import { InputTypeInstances } from "@/input_types/Team/index";

export const TeamList: FC<{
  layer: number;
  teams: Team[];
  names: InputTypeInstances;
  handleSelectAction: (team: Team) => void;
}> = ({ layer, teams, names, handleSelectAction }) => {
  const modifyWithNames = useCallback(() => modify(names), [names]);
  const [teamList, updateTeams] = useReducer(modifyWithNames(), teams);

  useEffect(() => {
    if (teamList.length === 1) handleSelectAction(teams[0]);
  }, [teams]);

  return (
    <Section layer={layer} direction="column" fit="content" maxHeight="100%">
      <List
        layer={layer + 1}
        teams={teamList}
        handleSelectAction={handleSelectAction}
      />
      <Splitter layer={layer + 1} />
      <Actions layer={layer + 1} handleAdd={() => updateTeams("add")} />
    </Section>
  );
};

const modify =
  (names: InputTypeInstances) => (teams: Team[], action: "add") => {
    switch (action) {
      case "add":
        return [...teams, getTeam(names)];
      default:
        console.warn(`Unknown action: ${JSON.stringify(action)}`);
        return teams;
    }
  };
