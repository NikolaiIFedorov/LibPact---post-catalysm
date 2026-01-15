import { FCParent } from "../index";

export const Action: FCParent<{ layer: number }> = ({ layer, children }) => {
  return (
    <div
      className={`w-[8px] md:w-[16px]`}
      style={{
        aspectRatio: "1 / 1",
        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
    >
      {children}
    </div>
  );
};
