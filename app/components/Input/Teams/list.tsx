import { Icon, Container, Team } from "./index";

export const List: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const icons = teams.map((team, i) => <Icon key={i} layer={2} />);

  if (icons.length === 0) icons.push(<Icon key="empty" layer={2} />);

  return (
    <Container layer={2} direction="column" weight={1} overflow="scroll">
      {icons}
    </Container>
  );
};
