import { dbTeams } from "@/db/db";
import { Container, Teams, Build, FC, FlexProps } from "./index";

export const Input: FC<FlexProps> = async ({ weight }) => {
  const teams = await dbTeams.get();

  return (
    <Container weight={weight} minWidth={300} layer={1}>
      <Teams weight={1} db={teams} />
      <Build weight={4} />
    </Container>
  );
};
