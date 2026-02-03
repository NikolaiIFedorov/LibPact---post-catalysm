"use client";

import { FCParent } from "./index.ts";
import { layerStyles } from "./layerStyles";

export const Container: FCParent<{
  weight?: number;

  height?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: number | string;

  direction?: "row" | "column";
  layer?: number;
  fit?: "content" | "parent" | false;
  overflow?: "scroll" | "hidden" | "auto";
  align?: boolean;
  size?: "default" | "faint";

  className?: string;
}> = ({
  weight,
  height,

  minWidth,
  maxWidth,
  maxHeight,

  direction = "row",
  children,
  layer = 1,
  fit = false,
  overflow = "auto",
  align = false,
  size = "default",

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
        height: thisHeight,
        width: width,
        maxWidth: maxWidth ? maxWidth : undefined,
        minWidth: minWidth ? minWidth : "auto",

        flex: flex,
        flexWrap: "wrap",

        display: "flex",
        alignItems: align ? "center" : undefined,
        flexDirection: direction,
        gap: layerStyles.spacing(layer, size),
        overflow: overflow,
        scrollbarWidth: "none",
      }}
    >
      {children}
    </div>
  );
};
