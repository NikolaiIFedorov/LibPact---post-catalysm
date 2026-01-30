import { Button, Container, Icon, Splitter, Section, type FC } from "./index";

export const Actions: FC<{ layer: number; handleAdd: () => void }> = ({
  layer,
  handleAdd,
}) => {
  return (
    <Container direction="column" fit="content" layer={layer} weight={0}>
      <Button
        layer={layer}
        onClick={handleAdd}
        align={true}
        size="faint"
        direction="row"
      >
        <Icon layer={layer + 1} size="tiny" img={{ lucide: "Plus" }} />
        Team
      </Button>
    </Container>
  );
};
