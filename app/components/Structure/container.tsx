"use client";

import { FCParent } from "./index.ts";
import { layerStyles } from "./layerStyles";

export const Container: FCParent<{
  weight?: number;

  height?: string;
  minWidth?: number;
  maxHeight?: number | string;

  direction?: "row" | "column";
  layer?: number;
  fit?: "content" | "parent" | false;
  overflow?: "scroll" | "hidden" | "auto";

  color?: boolean;
  className?: string;
}> = ({
  weight,
  height,

  minWidth = 0,
  maxHeight,

  direction = "row",
  children,
  layer = 1,
  fit = false,
  overflow = "auto",

  color = false,
  className,
}) => {
  let thisHeight: string | undefined;
  let width: string;
  let flex: string;
  switch (fit) {
    case "content":
      flex = `0 0 auto`;
      width = "fit-content";
      thisHeight = height ? height : "fit-content";
      break;
    case "parent":
      flex = `0 1 ${weight}`;
      width = "100%";
      thisHeight = "100%";
      break;
    default:
      flex = `${weight}`;
      width = "none";
      thisHeight = height;
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
        borderRadius: layerStyles.borderRadius(layer, "container"),
        backgroundColor: color ? "red" : "transparent",
        height: thisHeight,
        width: width,
        minWidth: minWidth ? `${minWidth}px` : "auto",

        display: "flex",
        flex: flex,
        flexDirection: direction,
        gap: layerStyles.spacing(layer),
        overflow: overflow,
        scrollbarWidth: "none",
      }}
    >
      {children}
    </div>
  );
};
