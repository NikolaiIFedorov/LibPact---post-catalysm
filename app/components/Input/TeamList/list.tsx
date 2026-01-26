"use client";

import { Button, Icon, Container, Team, FC } from "./index";

const TeamIcon: FC<{
  layer: number;
  handleSelectAction: (team: Team) => void;
  team: Team;
}> = ({ layer, handleSelectAction, team }) => {
  return (
    <Button layer={layer} onClick={() => handleSelectAction(team)}>
      <Icon layer={layer + 1} />
    </Button>
  );
};

export const List: React.FC<{
  layer: number;
  teams: Team[];
  handleSelectAction: (team: Team) => void;
}> = ({ layer, teams, handleSelectAction }) => {
  const teamIcons = teams.map((team) => (
    <TeamIcon
      layer={layer}
      key={team.name}
      handleSelectAction={handleSelectAction}
      team={team}
    />
  ));

  return (
    <Container layer={layer} direction="column" weight={1} overflow="scroll">
      {teamIcons}
    </Container>
  );
};
