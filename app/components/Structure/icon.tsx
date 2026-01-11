import { FCParent } from "./index";

export const Icon: FCParent<{ layer: number }> = ({ layer, children }) => {
  return (
    <div
      className={`w-[32px] md:w-[64px]`}
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
