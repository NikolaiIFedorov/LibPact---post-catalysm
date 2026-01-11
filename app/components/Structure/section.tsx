import { FCParent } from "./index";

export const Section: FCParent<{
  weight?: number;
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  minWidth?: number;

  layer?: number;

  direction?: "row" | "column";
}> = ({
  weight,
  maxHeight,
  maxWidth,
  minWidth,

  layer = 1,

  children,
  direction = "row",
}) => {
  return (
    <div
      style={{
        maxHeight: maxHeight ? `${maxHeight}px` : "none",
        minWidth: minWidth ? `${minWidth}px` : "none",
        maxWidth: maxWidth ? `${maxWidth}px` : "none",
        borderRadius: `calc(var(--spacing)/${layer})`,

        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        color: `hsl(0, 0%, ${15 * layer + 45}%)`,

        flex: `${weight}`,

        display: "flex",
        padding: `calc(var(--spacing)/${layer + 1})`,
        gap: `calc(var(--spacing)/${layer + 1})`,
        flexDirection: direction,
      }}
    >
      {children}
    </div>
  );
};
