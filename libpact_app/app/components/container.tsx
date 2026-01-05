import { downloadData, deleteData } from "../../../db/db";

interface SectionProps {
  minWidth?: number;

  color?: boolean;
  weight?: number;

  direction?: "row" | "column";
  children?: React.ReactNode;
}

export function Container({
  minWidth = 0,

  color = false,
  weight,

  direction = "row",
  children,
}: SectionProps) {
  return (
    <div
      style={{
        minWidth: `${minWidth}px`,
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
