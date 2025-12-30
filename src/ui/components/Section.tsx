import type { ReactNode } from "react";
import type React from "react";

import * as Material from "@mui/material";

interface SectionProps {
  children?: ReactNode;
}

export const Section: React.FunctionComponent<SectionProps> = ({
  children,
}) => {
  return <Material.Box>{}</Material.Box>;
};
