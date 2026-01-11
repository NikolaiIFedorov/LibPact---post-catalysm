"use client";

import { FC, FlexProps, Container, Icon, Section } from "./index";

const BuildList = () => {
  return (
    <Container layer={2} weight={1} fit="content">
      <Icon layer={2}></Icon>
      <Icon layer={2}></Icon>
      <Icon layer={2}></Icon>
      <Icon layer={2}></Icon>
    </Container>
  );
};

export const Build: FC<FlexProps> = ({ weight }) => {
  return (
    <Section weight={weight} layer={1} direction="column">
      <BuildList />
    </Section>
  );
};
