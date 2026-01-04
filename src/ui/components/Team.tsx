import type React from "react";

import { Section } from ".";

import { downloadData } from "../../../backend/db";
interface TeamProps {}

export const Team: React.FunctionComponent<TeamProps> = async ({}) => {
  console.log("1");
  const data = await downloadData("builds");
  console.log("2");
  console.log(data);
  return <Section size={"min"} minHeight="100%vh" minWidth="60"></Section>;
};
