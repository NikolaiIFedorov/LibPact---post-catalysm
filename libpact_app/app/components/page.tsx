import { Container } from "./container";

interface Props {
  padding?: string;
  children?: React.ReactNode;
}

export function Page({ padding = "0", children }: Props) {
  return (
    <div
      style={{
        width: `100%`,
        minHeight: `100vh`,
        padding: "var(--spacing)",

        display: "flex",
        flexWrap: "wrap",
        gap: "var(--spacing)",
        backgroundColor: "hsl(0, 0%, 0%)",
      }}
    >
      {children}
    </div>
  );
}
