import type React from "react";

import { Section } from ".";

interface TeamProps {}

export const Team: React.FunctionComponent<TeamProps> = ({}) => {
  return <Section size={"min"} minHeight="100%vh" minWidth="60"></Section>;
};
