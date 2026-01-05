interface SectionProps {
  minWidth?: number;
  minWidthMobile?: number;
  minWidthDesktop?: number;

  color?: boolean;
  weight?: number;

  direction?: "row" | "column";
  children?: React.ReactNode;
}

export function Container({
  minWidth = 0,
  minWidthMobile,
  minWidthDesktop,

  color = false,
  weight,

  direction = "row",
  children,
}: SectionProps) {
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
        flex: `${weight}`,
        flexDirection: direction,

        gap: "var(--spacing)",
      }}
    >
      {children}
    </div>
  );
}
