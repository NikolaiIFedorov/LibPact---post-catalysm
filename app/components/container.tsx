interface Props {
  minWidth?: number;
  minWidthMobile?: number;
  minWidthDesktop?: number;
  maxHeight?: number | null;
  weight?: number;

  direction?: "row" | "column";
  children?: React.ReactNode;
  layer?: number;
  fit?: boolean;

  color?: boolean;
}

export function Container({
  minWidth = 0,
  minWidthMobile,
  minWidthDesktop,
  maxHeight = null,
  weight,

  direction = "row",
  layer = 1,
  children,
  fit = false,

  color = false,
}: Props) {
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
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,

        gap: `calc(var(--spacing)/${layer})`,
        height: fit ? "fit-content" : undefined,
      }}
    >
      {children}
    </div>
  );
}
