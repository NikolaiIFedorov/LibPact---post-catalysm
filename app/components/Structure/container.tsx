"use client";

import { FCParent } from "./index.ts";

export const Container: FCParent<{
  weight?: number;

  minWidth?: number;
  maxHeight?: number | string;
  height?: string;

  direction?: "row" | "column";
  layer?: number;
  fit?: "content" | "parent" | false;
  overflow?: "scroll" | "hidden" | "auto";

  color?: boolean;
  className?: string;
}> = ({
  weight,

  minWidth = 0,
  maxHeight,
  height,

  direction = "row",
  children,
  layer = 1,
  fit = false,
  overflow = "auto",

  color = false,
  className,
}) => {
  let flex: string;
  switch (fit) {
    case "content":
      flex = `0 0 auto`;
      break;
    case "parent":
      flex = `0 1 ${weight}`;
      break;
    default:
      flex = `${weight}`;
  }

  let maxH: string = "none";
  switch (typeof maxHeight) {
    case "undefined":
      maxH = "none";
      break;
    case "string":
      maxH = maxHeight;
      break;
    case "number":
      maxH = `${maxHeight}px`;
      break;
  }

  return (
    <div
      className={className}
      style={{
        borderRadius: `calc(var(--spacing)/${layer + 1})`,
        backgroundColor: color ? "red" : "transparent",
        height: height ? height : fit ? "fit-content" : "none",
        maxHeight: maxH,
        minWidth: minWidth ? `${minWidth}px` : "auto",

        display: "flex",
        flex: flex,
        flexDirection: direction,
        gap: `calc(var(--spacing)/${layer + 1})`,
        overflow: overflow,
        scrollbarWidth: "none",
      }}
    >
      {children}
    </div>
  );
};
