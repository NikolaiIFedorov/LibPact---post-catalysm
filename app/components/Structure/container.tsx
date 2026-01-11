import { FCParent } from "./index.ts";

export const Container: FCParent<{
  minWidth?: number;
  minWidthMobile?: number;
  minWidthDesktop?: number;
  weight?: number;
  height?: string;
  maxHeight?: number | string;

  direction?: "row" | "column";
  layer?: number;
  fit?: "content" | "parent" | false;
  overflow?: "scroll" | "hidden" | "auto";

  color?: boolean;
}> = ({
  minWidth = 0,
  minWidthMobile,
  minWidthDesktop,
  weight,
  height,
  maxHeight,

  direction = "row",
  children,
  layer = 1,
  fit = false,
  overflow = "auto",

  color = false,
}) => {
  // Use specific mobile/desktop values if provided, otherwise fall back to minWidth
  const mobileMin = minWidthMobile ?? minWidth;
  const desktopMin = minWidthDesktop ?? minWidth;

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
      className={`
        ${mobileMin > 0 ? `min-w-[${mobileMin}px]` : ""}
        ${desktopMin > 0 ? `md:min-w-[${desktopMin}px]` : ""}
      `}
      style={{
        borderRadius: `calc(var(--spacing)/${layer})`,
        backgroundColor: color ? "red" : "transparent",
        maxHeight: maxH,

        display: "flex",
        flex: flex,
        flexDirection: direction,
        gap: `calc(var(--spacing)/${layer})`,
        overflow: overflow,
      }}
    >
      {children}
    </div>
  );
};
