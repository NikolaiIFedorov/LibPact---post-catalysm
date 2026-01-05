import { Page } from "./components/page";
import { Container } from "./components/container";
import { Section } from "./components/section";

export default function Home() {
  return (
    <Page padding="2">
      <Container weight={1} minWidth={300}>
        <Section weight={1} layer={1}>
          Teams
        </Section>
        <Section weight={5} layer={1}>
          Builds
        </Section>
      </Container>
      <Container
        weight={4}
        direction="column"
        minWidthMobile={300}
        minWidthDesktop={600}
      >
        <Container weight={1.5} direction="column">
          <Section weight={2} layer={1}>
            Damage
          </Section>
          <Section weight={1} layer={1}>
            Timeline
          </Section>
        </Container>
        <Container weight={1}>
          <Section weight={5} layer={1}>
            Resources
          </Section>
          <Section weight={1} layer={1}>
            Links
          </Section>
        </Container>
      </Container>
    </Page>
  );
}
