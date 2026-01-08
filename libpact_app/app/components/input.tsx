import { Build, Container, Teams } from "./index";

interface InputProps {
  weight?: number;
}

export function Input({ weight }: InputProps) {
  return (
    <Container weight={weight} minWidth={300} layer={1}>
      <Teams weight={1} />
      <Build weight={4} />
    </Container>
  );
}
