import { Button, Container, Icon, type FC } from "./index";

export const Actions: FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <Container direction="column" fit="content" layer={2} weight={0}>
      <Button onClick={handleAdd}>
        <Icon layer={2}>Add +</Icon>
      </Button>
    </Container>
  );
};
