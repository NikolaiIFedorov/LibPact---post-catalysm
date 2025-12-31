import type { ReactNode } from "react";
import type React from "react";

import { Box } from "@mui/material";

interface SectionProps {
  children?: ReactNode;
  minWidth: string;
  minHeight: string;
  size: "full" | "min";
}

export const Section: React.FunctionComponent<SectionProps> = ({
  children,
  minWidth,
  minHeight,
  size = "full",
}) => {
  return (
    <Box
      minWidth={minWidth}
      minHeight={minHeight}
      sx={{
        width: size === "full" ? "100%" : "min-content",
        height: size === "full" ? "100%" : "min-content",
        backgroundColor: "gray",
      }}
    >
      {children}
    </Box>
  );
};
