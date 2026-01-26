import { FC, layerStyles, LucideIcon, Lucide } from "../";

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
    ...layerStyles.ITEM(layer, "faint"),
    maxHeight: length,

    display: "flex",
    alignItems: "center",
  };

  if (IconComponent)
    return (
      <div style={style}>
        <IconComponent size={length} strokeWidth={3} />
      </div>
    );
  else {
    if (name)
      return (
        <div style={style}>
          <img src={`/${name}.png`}></img>
        </div>
      );
    else
      return (
        <div
          style={{
            ...layerStyles.DEFAULT(layer),
            height: length,
            width: length,
          }}
        />
      );
  }
};
