import { Container, Icon, Section } from "./index";
import { downloadData } from "../../../db/db";

interface BuildProps {
  weight?: number;
}

export function Build({ weight }: BuildProps) {
  return (
    <Section weight={weight} layer={1} direction="column">
      <BuildList />
    </Section>
  );
}

function BuildList() {
  return (
    <Container layer={2} weight={1} fit={true}>
      <Icon layer={2} weight={1} />
      <Icon layer={2} weight={1} />
      <Icon layer={2} weight={1} />
      <Icon layer={2} weight={1} />
    </Container>
  );
}
