import { FC } from "../..";
import { layerStyles } from "../layerStyles";
import presets from "../presets.module.css";

export const Splitter: FC<{ layer: number }> = ({ layer }) => {
  return (
    <div
      className={presets.splitter}
      style={{ ...layerStyles.vars(layer) }}
    ></div>
  );
};
