"use client";

import { Button, Icon, Container, Team, FC } from "./index";

const TeamIcon: FC<{
  handleSelect: (team: Team) => void;
  team: Team;
}> = ({ handleSelect, team }) => {
  return (
    <Button onClick={() => handleSelect(team)}>
      <Icon layer={2} />
    </Button>
  );
};

export const List: React.FC<{
  teams: Team[];
  handleSelect: (team: Team) => void;
}> = ({ teams, handleSelect }) => {
  const teamIcons = teams.map((team) => (
    <TeamIcon key={team.name} handleSelect={handleSelect} team={team} />
  ));

  return (
    <Container layer={2} direction="column" weight={1} overflow="scroll">
      {teamIcons}
    </Container>
  );
};
