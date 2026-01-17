import { Splitter } from "../../Structure/Assets/splitter";
import { Button, Container, Icon, type FC } from "./index";

export const Actions: FC<{ layer: number; handleAdd: () => void }> = ({
  layer,
  handleAdd,
}) => {
  return (
    <Container direction="column" fit="content" layer={layer} weight={0}>
      <Splitter layer={layer} />
      <Button onClick={handleAdd}>
        <Icon layer={layer}>Add +</Icon>
      </Button>
    </Container>
  );
};
