import { FC, Container } from "./index.ts";

export const Parameters: FC<{ layer: number }> = ({ layer }) => {
  return <Container layer={layer}>Parameters</Container>;
};
