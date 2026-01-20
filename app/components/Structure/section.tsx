import { FCParent } from "./index";
import { layerStyles } from "./layerStyles";

export const Section: FCParent<{
  weight?: number;
  height?: string;
  maxHeight?: number | string;
  maxWidth?: number;
  minWidth?: number;

  layer?: number;
  fit?: "content" | "parent" | false;

  direction?: "row" | "column";
}> = ({
  weight,
  maxWidth,
  minWidth,
  maxHeight,
  height,

  layer = 1,
  fit = false,

  children,
  direction = "row",
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
        maxHeight: maxH,
        minWidth: minWidth ? `${minWidth}px` : "none",
        maxWidth: maxWidth ? `${maxWidth}px` : "none",
        height: height ? height : "none",
        borderRadius: layerStyles.borderRadius(layer),
        backgroundColor: layerStyles.backgroundColor(layer),
        flex: flex,

        color: layerStyles.textColor(layer),

        fontFamily: "inherit",
        fontSize: layerStyles.fontSize(layer),
        textAlign: "left",

        display: "flex",
        flexDirection: direction,
        padding: layerStyles.spacing(layer),
        gap: layerStyles.spacing(layer),
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
