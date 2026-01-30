import { type FCParent } from "./index";

export const Window: FCParent = ({ children }) => {
  return (
    <div
      className={"sm:h-screen flex-col sm:flex-row"}
      style={{
        minHeight: "100vh",
        width: `100%`,
        padding: "var(--spacing)",

        flex: "1 0 1",

        display: "flex",
        flexWrap: "wrap",
        gap: "var(--spacing)",
        backgroundColor: "hsl(0, 0%, 0%)",
      }}
    >
      {children}
    </div>
  );
};
