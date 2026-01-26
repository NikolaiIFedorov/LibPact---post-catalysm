import { FC, Icon, Container, Section, Build, Search } from "./index";

export const Weapon: FC<{ layer: number; build: Build }> = ({
  layer,
  build,
}) => {
  if (build.weapon) {
    return (
      <Container layer={layer}>
        <Icon layer={layer} />
        <Container layer={layer} direction="column" weight={1}>
          <Section layer={layer} weight={1} />
          <Section layer={layer} weight={1} />
        </Container>
      </Container>
    );
  } else return <Search layer={layer} text="Weapon" />;
};
