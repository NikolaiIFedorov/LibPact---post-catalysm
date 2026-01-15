import { FCParent } from "../index";

export const Icon: FCParent<{ layer: number; direction?: "x" | "y" }> = ({
  layer,
  direction,
  children,
}) => {
  let aspectRatio = "1 / 1";
  switch (direction) {
    case "x":
      aspectRatio = `1 / 0.5`;
      break;
    case "y":
      aspectRatio = `0.5 / 1`;
      break;
  }
  return (
    <div
      className={`w-[32px] md:w-[64px]`}
      style={{
        aspectRatio: aspectRatio,
        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
    >
      {children}
    </div>
  );
};
