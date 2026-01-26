import { type FC, Container, Icon, Section, Build, Search } from "./index";

export const Character: FC<{ layer: number; build: Build }> = ({
  layer,
  build,
}) => {
  if (build.character) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon layer={layer}></Icon>
          <Container layer={layer} direction="column" weight={1}>
            <Section layer={layer} weight={1}></Section>
            <Section layer={layer} weight={1}></Section>
          </Container>
        </Container>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
      </>
    );
  } else return <Search layer={layer} text="Character"></Search>;
};
