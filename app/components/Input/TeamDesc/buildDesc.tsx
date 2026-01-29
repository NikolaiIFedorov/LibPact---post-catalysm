"use client";

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
  CharacterImages,
} from "./index";

export const BuildDesc: FC<{
  layer: number;
  build: Build;
  isSelected: boolean;
  setSelected: (unselect: boolean) => void;
  characterImgs: CharacterImages[];
}> = ({ layer, setSelected, isSelected, build, characterImgs }) => {
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
          <Icon layer={layer + 1} size={"medium"} />
          <Icon layer={layer + 1} size={"medium"} />
        </Container>
        <Section layer={layer + 1} direction="row" fit="content">
          <Icon layer={layer + 2} size={"medium"} />
          <Icon layer={layer + 2} size={"medium"} />
        </Section>
      </Button>
    );
  } else {
    return (
      <Section layer={layer} direction="column">
        <Container direction="row" layer={layer + 1} align={true} size="faint">
          <Button
            onClick={() => setSelected(true)}
            layer={layer + 1}
            size="faint"
            color={false}
          >
            <Icon
              layer={layer + 1}
              name={{ lucide: "ChevronLeft" }}
              size="small"
            />
          </Button>

          {build.name}
        </Container>
        <Splitter layer={layer + 1} />
        <Character layer={layer + 1} build={build} imgs={characterImgs} />
        <Splitter layer={layer + 1} />
        <Weapon layer={layer + 1} build={build} />
        <Splitter layer={layer + 1} />
        <Artifacts layer={layer + 1} build={build} />
      </Section>
    );
  }
};
