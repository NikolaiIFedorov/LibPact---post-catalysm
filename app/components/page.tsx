import { type FCParent } from "./index";

export const Page: FCParent = ({ children }) => {
  return (
    <div
      style={{
        width: `100%`,
        minHeight: `100vh`,
        padding: "20px",

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
