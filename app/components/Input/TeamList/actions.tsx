import { Splitter } from "../../Structure/Assets/splitter";
import { Button, Container, Icon, type FC } from "./index";

export const Actions: FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <Container direction="column" fit="content" layer={2.5} weight={0}>
      <Splitter layer={2} />
      <Button onClick={handleAdd}>
        <Icon layer={2}>Add +</Icon>
      </Button>
    </Container>
  );
};
