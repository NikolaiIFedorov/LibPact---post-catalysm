import { FCParent } from "./index";

export const Icon: FCParent<{ layer: number }> = ({ layer, children }) => {
  return (
    <div
      style={{
        width: "64px",
        height: "64px",

        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
      className={"Icon"}
    >
      {children}
    </div>
  );
};
