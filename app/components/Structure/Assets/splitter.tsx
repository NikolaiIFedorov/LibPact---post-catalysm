import { FC } from "../..";

export const Splitter: FC<{ layer: number }> = ({ layer }) => {
  return (
    <div
      style={{
        alignSelf: "center",
        width: `calc(100% - ${layer}px)`,
        height: "calc(var(--spacing) / 2)",
        backgroundColor: `hsl(0, 0%, ${15 * (layer - 0.25)}%)`,
        borderRadius: `calc(var(--spacing)/${layer - 0.25})`,
      }}
    ></div>
  );
};
