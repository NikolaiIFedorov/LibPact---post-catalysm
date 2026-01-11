import { type FCParent } from "./index";

export const Page: FCParent = ({ children }) => {
  return (
    <div
      className="md:h-screen md:max-h-screen"
      style={{
        width: `100%`,
        height: `100vh`,
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
};
