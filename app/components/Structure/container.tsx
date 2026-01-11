import { FCParent } from "./index.ts";

export const Container: FCParent<{
  minWidth?: number;
  minWidthMobile?: number;
  minWidthDesktop?: number;
  weight?: number;

  direction?: "row" | "column";
  layer?: number;
  fit?: boolean;

  color?: boolean;
}> = ({
  minWidth = 0,
  minWidthMobile,
  minWidthDesktop,
  weight,

  direction = "row",
  children,
  layer = 1,
  fit = false,

  color = false,
}) => {
  // Use specific mobile/desktop values if provided, otherwise fall back to minWidth
  const mobileMin = minWidthMobile ?? minWidth;
  const desktopMin = minWidthDesktop ?? minWidth;

  return (
    <div
      className={`
        ${mobileMin > 0 ? `min-w-[${mobileMin}px]` : ""}
        ${desktopMin > 0 ? `md:min-w-[${desktopMin}px]` : ""}
      `}
      style={{
        borderRadius: "var(--spacing)",
        backgroundColor: color ? "red" : "transparent",

        display: "flex",
        flex: fit ? `0 1 ${weight}` : `${weight}`,
        flexDirection: direction,

        gap: `calc(var(--spacing)/${layer})`,
        height: fit ? "fit-content" : undefined,
      }}
    >
      {children}
    </div>
  );
};
