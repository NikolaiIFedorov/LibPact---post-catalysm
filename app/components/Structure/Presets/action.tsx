import { FCParent } from "../index";
import { layerStyles } from "../layerStyles";
import presets from "../presets.module.css";

export const Action: FCParent<{ layer: number }> = ({ layer, children }) => {
  return (
    <div
      className={`w-[8px] md:w-[16px] ${presets.action}`}
      style={{ ...layerStyles.vars(layer) }}
    >
      {children}
    </div>
  );
};
