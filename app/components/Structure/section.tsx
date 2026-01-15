import { FCParent } from "./index";

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
      style={{
        maxHeight: maxH,
        minWidth: minWidth ? `${minWidth}px` : "none",
        maxWidth: maxWidth ? `${maxWidth}px` : "none",
        height: height ? height : "none",
        borderRadius: `calc(var(--spacing)/${layer})`,

        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        color: `hsl(0, 0%, ${15 * layer + 45}%)`,

        flex: flex,

        display: "flex",
        flexDirection: direction,
        padding: `calc(var(--spacing)/${layer + 1})`,
        gap: `calc(var(--spacing)/${layer + 1})`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};
