import { Container } from "../..";
import { Section } from "../../Structure/section";
import { Button } from "../../Structure/Assets/button";
import { FC, Icon, Artifacts } from "./index";

export const BuildDesc: FC<{
  setSelected: (build: string) => void;
}> = ({ setSelected }) => {
  return (
    <Button
      onClick={() => {
        setSelected("1");
      }}
      layer={2}
      fit="content"
      gap={1}
    >
      <Section layer={2}>
        <Icon layer={3}></Icon>
        <Container layer={3} direction={"column"}>
          <Artifacts />
          <Icon layer={3} direction={"x"}></Icon>
        </Container>
      </Section>
    </Button>
  );
};
