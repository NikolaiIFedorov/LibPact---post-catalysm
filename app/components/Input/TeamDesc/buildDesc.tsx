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
      <Button onClick={() => setSelected(false)}>
        <Section layer={layer}>
          <Icon layer={layer + 1}></Icon>
          <Container layer={layer} direction={"column"}>
            <Artifacts />
            <Icon layer={layer + 1} direction={"x"}></Icon>
          </Container>
        </Section>
      </Button>
    );
  } else {
    return (
      <Button onClick={() => setSelected(true)}>
        <Section layer={layer} direction={"column"}>
          Build: {build?.name}
          <Splitter layer={layer + 1} />
          <Character layer={layer + 1} />
          <Splitter layer={layer + 1} />
          <Weapon layer={layer + 1} />
          <Splitter layer={layer + 1} />
          <Artifacts />
        </Section>
      </Button>
    );
  }
};
