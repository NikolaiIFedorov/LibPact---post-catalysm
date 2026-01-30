import { FCParent, layerStyles } from "./index";

export const Section: FCParent<{
  weight?: number;
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;

  layer?: number;
  fit?: "content" | "parent" | false;

  direction?: "row" | "column";
  align?: boolean;
}> = ({
  weight,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,

  layer = 1,
  fit = false,

  children,
  direction = "row",
  align = false,
}) => {
  let width: string;
  let thisMinWidth = minWidth;
  let flex: string;
  switch (fit) {
    case "content":
      flex = `0 0 auto`;
      width = "fit-content";
      thisMinWidth = "fit-content";
      break;
    case "parent":
      flex = `0 1 ${weight}`;
      width = "100%";
      thisMinWidth = "100%";
      break;
    default:
      flex = `${weight}`;
      width = "none";
  }

  let maxH: string;
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
      className="font-sans"
      style={{
        ...layerStyles.DEFAULT(layer),
        padding: layerStyles.spacing(layer),
        gap: layerStyles.spacing(layer),

        maxHeight: maxH,
        minWidth: thisMinWidth ? `${thisMinWidth}` : undefined,
        maxWidth: maxWidth ? maxWidth : undefined,
        minHeight: minHeight ? minHeight : undefined,
        width: width,

        flex: flex,
        flexWrap: "wrap",

        fontFamily: "inherit",
        textAlign: "left",

        display: "flex",
        flexDirection: direction,
        overflow: "wrap",
        alignItems: align ? "center" : undefined,
      }}
    >
      {children}
    </div>
  );
};
