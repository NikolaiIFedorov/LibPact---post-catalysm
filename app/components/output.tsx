import { Container, Section, FC, FlexProps } from "./index";

export const Output: FC<FlexProps & { layer: number }> = ({
  layer,
  weight,
}) => {
  return (
    <Container weight={weight} direction="column" minWidth={300} layer={layer}>
      <Container weight={1.5} direction="column" layer={layer}>
        <Section weight={2} layer={layer + 1}>
          Damage
        </Section>
        <Section weight={1} layer={layer + 1}>
          Timeline
        </Section>
      </Container>
      <Container weight={1} layer={layer}>
        <Section weight={5} layer={layer + 1}>
          Resources
        </Section>
        <Section weight={1} layer={layer + 1}>
          Links
        </Section>
      </Container>
    </Container>
  );
};
