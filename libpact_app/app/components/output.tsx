import { Container, Section } from "./index";

interface OutputProps {
  weight?: number;
}

export function Output({ weight }: OutputProps) {
  return (
    <Container
      weight={weight}
      direction="column"
      minWidthMobile={300}
      minWidthDesktop={600}
      layer={1}
    >
      <Container weight={1.5} direction="column" layer={1}>
        <Section weight={2} layer={1}>
          Damage
        </Section>
        <Section weight={1} layer={1}>
          Timeline
        </Section>
      </Container>
      <Container weight={1} layer={1}>
        <Section weight={5} layer={1}>
          Resources
        </Section>
        <Section weight={1} layer={1}>
          Links
        </Section>
      </Container>
    </Container>
  );
}
