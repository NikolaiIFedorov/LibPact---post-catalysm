import { FC, Button, Set, Section, Icon, Container } from ".";

export const SetDesc: FC<{
  layer: number;
  set: Set | undefined;
  _4pc: boolean;
  isSelected: boolean;
  setSelected: () => void;
}> = ({ layer, set, _4pc, isSelected, setSelected }) => {
  if (isSelected) {
    return (
      <Section layer={layer + 1} direction="row" size="faint">
        <Icon
          layer={layer + 2}
          img={set?.parameters.img}
          size="medium"
          color={true}
        />
        <Container layer={layer + 1} direction="column" size="faint">
          {"2pc: " + set?.parameters._2pc}
          {_4pc ? "4pc: " + set?.parameters._4pc : null}
        </Container>
      </Section>
    );
  } else {
    return (
      <Button
        layer={layer}
        onClick={setSelected}
        icon={{ size: "medium", img: set?.parameters.img, color: true }}
      />
    );
  }
};
