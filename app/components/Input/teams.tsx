"use client";

import { useReducer } from "react";
import { FC, FlexProps, Section, List, Actions, getTeam, Team } from "./index";

export const Teams: FC<FlexProps & { db: string[] }> = ({ weight, db }) => {
  const [teams, updateTeams] = useReducer(modify, teamsFromDb(db));

  return (
    <Section weight={weight} layer={1} direction="column" fit="content">
      <List teams={teams} />
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

const teamsFromDb = (db: string[]): Team[] => {
  return db.map((data) => getTeam(JSON.parse(data)));
};
