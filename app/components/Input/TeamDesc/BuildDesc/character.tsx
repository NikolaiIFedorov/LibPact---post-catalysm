import { type FC, Container, Icon } from "./index";

export const Character: FC<{ layer: number }> = ({ layer }) => {
  return (
    <>
      <Container layer={layer - 1}>
        <Icon layer={layer}></Icon>
        <Container layer={layer} direction="column">
          <Icon layer={layer} direction={"x"} />
          <Icon layer={layer} direction={"x"} />
        </Container>
      </Container>
      <Icon layer={layer} direction={"x"}></Icon>
      <Icon layer={layer} direction={"x"}></Icon>
      <Icon layer={layer} direction={"x"}></Icon>
    </>
  );
};
