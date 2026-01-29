import { FC } from "../..";
import { layerStyles } from "../layerStyles";

export const Splitter: FC<{ layer: number }> = ({ layer }) => {
  return (
    <div
      style={{
        alignSelf: "center",
        width: `calc(100% - ${layer}px)`,
        height: "calc(var(--spacing) / 3)",
        backgroundColor: layerStyles.backgroundColor(layer, "faint"),
        borderRadius: layerStyles.borderRadius(layer),
      }}
    ></div>
  );
};
