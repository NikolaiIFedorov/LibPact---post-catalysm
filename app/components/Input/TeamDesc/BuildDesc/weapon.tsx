import { FC, Icon, Container } from "./index";

export const Weapon: FC<{ layer: number }> = ({ layer }) => {
  return (
    <Container layer={layer}>
      <Icon layer={layer} />
      <Container layer={layer} direction="column">
        <Icon layer={layer} direction="x" />
        <Icon layer={layer} direction="x" />
      </Container>
    </Container>
  );
};
