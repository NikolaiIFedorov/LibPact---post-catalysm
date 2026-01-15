"use client";

import { useReducer, useEffect } from "react";
import { FC, Section, List, Actions, getTeam, Team } from "./index";

export const TeamList: FC<{
  teams: Team[];
  handleSelect: (team: Team) => void;
}> = ({ teams, handleSelect }) => {
  const [teamsState, updateTeams] = useReducer(modify, teams);

  useEffect(() => {
    if (teamsState.length === 0) {
      updateTeams("add");
    }
  }, []);

  useEffect(() => {
    if (teamsState.length === 1) {
      handleSelect(teamsState[0]);
    }
  }, [teamsState]);

  return (
    <Section layer={1} direction="column" fit="content">
      <List teams={teamsState} handleSelect={handleSelect} />
      <Actions handleAdd={() => updateTeams("add")} />
    </Section>
  );
};

const modify = (teams: Team[], action: "add") => {
  switch (action) {
    case "add":
      return [...teams, getTeam()];
    default:
      console.warn(`Unkown action: ${JSON.stringify(action)}`);
      return teams;
  }
};
