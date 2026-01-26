import { FC, layerStyles, LucideIcon, Lucide } from "../";
import presets from "../presets.module.css";

export const Icon: FC<{
  layer: number;
  size?: "default" | "small" | "tiny";
  name?: string;
  text?: string;
}> = ({ layer, size, name, text }) => {
  let length = 64;
  switch (size) {
    case "small":
      length = 32;
      break;
    case "tiny":
      length = 12;
      break;
  }

  const IconComponent = Lucide[name as keyof typeof Lucide] as LucideIcon;
  const style = {
    ...layerStyles.vars(layer),
    maxHeight: length,
    display: "flex",
    alignItems: "center",
  };

  if (IconComponent)
    return (
      <div className={presets.icon} style={style}>
        <IconComponent size={length} strokeWidth={3} />
      </div>
    );
  else {
    if (name)
      return (
        <div className={presets.icon} style={style}>
          <img src={`/${name}.png`}></img>
        </div>
      );
    else
      return (
        <div
          className={presets.icon}
          style={{
            ...layerStyles.vars(layer),
            height: length,
            width: length,
            backgroundColor: "hsla(0, 0%, 100%, 0.15)",
          }}
        />
      );
  }
};
