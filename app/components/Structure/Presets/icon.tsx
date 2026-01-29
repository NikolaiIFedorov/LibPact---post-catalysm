import { FC, layerStyles, LucideIcon, Lucide } from "../";

export const Icon: FC<{
  layer: number;
  size?: "default" | "medium" | "small" | "tiny";
  name?: { lucide: keyof typeof Lucide } | string;
}> = ({ layer, size, name }) => {
  let length = 64;
  switch (size) {
    case "medium":
      length = 32;
      break;
    case "small":
      length = 18;
      break;
    case "tiny":
      length = 12;
      break;
  }

  const style = {
    ...layerStyles.ITEM(layer - 1, "faint"),
    padding: layerStyles.spacing(layer - 1, "faint"),
    maxHeight: length,

    display: "flex",
    alignItems: "center",
  };

  if (!name) {
    return (
      <div
        style={{
          ...layerStyles.DEFAULT(layer),
          height: length,
          width: length,
        }}
      />
    );
  } else if (typeof name === "string") {
    return (
      <div style={style}>
        <img src={`/${name}.png`}></img>
      </div>
    );
  } else {
    const IconComponent = Lucide[name.lucide] as LucideIcon;

    return (
      <div style={style}>
        <IconComponent size={length} strokeWidth={3} />
      </div>
    );
  }
};
