import { FCParent } from "../index";

export const Icon: FCParent<{ layer: number; direction?: "x" }> = ({
  layer,
  direction,
  children,
}) => {
  let className = "w-[32px] h-[32px] md:w-[64px] md:h-[64px]";
  switch (direction) {
    case "x":
      className = "md:min-w-[64px] md:max-h-[32px] md:h-full md:min-h-[16px]";
      break;
  }
  return (
    <div
      className={className}
      style={{
        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
    >
      {children}
    </div>
  );
};
