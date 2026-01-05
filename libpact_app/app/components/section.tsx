import { downloadData, deleteData } from "../../../db/db";

interface SectionProps {
  weight?: number;
  height?: number;

  layer?: number;

  children?: React.ReactNode;
}

export function Section({
  weight: weight,
  height: height,
  layer = 0,

  children,
}: SectionProps) {
  return (
    <div
      style={{
        height: height ? `${height}%` : "100%",
        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        color: `hsl(0, 0%, ${15 * layer + 45}%)`,
        borderRadius: "var(--spacing)",

        flex: `${weight}`,

        padding: "var(--spacing)",
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}
