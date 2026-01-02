import type React from "react";

import { Section } from ".";

import { RecallData } from "../../../backend/db";
interface TeamProps {}

export const Team: React.FunctionComponent<TeamProps> = async ({}) => {
  console.log("1");
  const data = await RecallData("teams");
  console.log("2");
  console.log(data);
  return <Section size={"min"} minHeight="100%vh" minWidth="60"></Section>;
};
