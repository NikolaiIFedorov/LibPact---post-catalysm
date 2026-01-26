import {
  FC,
  Icon,
  Button,
  Section,
  Artifacts,
  Build,
  Splitter,
  Container,
  Character,
  Weapon,
} from "./index";

export const BuildDesc: FC<{
  layer: number;
  build: Build;
  isSelected: boolean;
  setSelected: (unselect: boolean) => void;
}> = ({ layer, setSelected, isSelected, build }) => {
  if (!isSelected) {
    return (
      <Button
        onClick={() => setSelected(false)}
        layer={layer}
        direction="column"
        fit="content"
      >
        <Icon layer={layer + 1} />
        <Container layer={layer + 1} direction="row">
          <Icon layer={layer + 1} size={"small"} />
          <Icon layer={layer + 1} size={"small"} />
        </Container>
        <Section layer={layer + 1} direction="row" fit="content">
          <Icon layer={layer + 2} size={"small"} />
          <Icon layer={layer + 2} size={"small"} />
        </Section>
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => setSelected(true)}
        layer={layer}
        direction="column"
      >
        {build.name}
        <Splitter layer={layer + 1} />
        <Character layer={layer + 1} build={build} />
        <Splitter layer={layer + 1} />
        <Weapon layer={layer + 1} build={build} />
        <Splitter layer={layer + 1} />
        <Artifacts layer={layer + 1} build={build} />
      </Button>
    );
  }
};
