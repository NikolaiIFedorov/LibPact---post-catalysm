import { FCParent } from "../index";
import { layerStyles } from "../layerStyles";

export const Action: FCParent<{ layer: number }> = ({ layer, children }) => {
  return (
    <div
      className={`w-[8px] md:w-[16px]`}
      style={{
        aspectRatio: "1 / 1",
        backgroundColor: layerStyles.backgroundColor(layer),
        borderRadius: layerStyles.borderRadius(layer),
      }}
    >
      {children}
    </div>
  );
};
