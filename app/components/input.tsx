import { dbTeams } from "@/db/db";
import { Container, Teams, Build, FC, FlexProps } from "./index";

export const Input: FC<FlexProps> = async ({ weight }) => {
  const teams = await dbTeams.get();

  return (
    <Container
      weight={weight}
      fit="content"
      height="100%"
      layer={1}
      maxHeight="100%"
    >
      <Teams weight={1} db={teams} />
      <Build weight={4} />
    </Container>
  );
};
