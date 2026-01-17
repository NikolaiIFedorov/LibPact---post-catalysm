import { FC, Container, Splitter } from "./index.ts";

export const Parameters: FC<{ layer: number }> = ({ layer }) => {
  return <Container layer={layer}></Container>;
};
