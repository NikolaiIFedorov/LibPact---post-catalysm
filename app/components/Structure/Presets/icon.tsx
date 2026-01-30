import { FC, layerStyles, LucideIcon, Lucide } from "../";

export interface IconProps {
  size?: "default" | "big" | "medium" | "small" | "tiny";
  img?: { lucide: keyof typeof Lucide } | string;
  color?: string;
}

export const Icon: FC<
  {
    layer: number;
  } & IconProps
> = ({ layer, size, img, color }) => {
  let length = 64;
  switch (size) {
    case "big":
      length = 48;
      break;
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
    borderRadius: `${length / 3}px`,
    maxHeight: length,
    padding: "unset",

    display: "flex",
    alignSelf: "center",
    backgroundColor: color ? color : undefined,
  };

  if (!img) {
    return (
      <div
        style={{
          ...layerStyles.DEFAULT(layer),
          height: length,
          width: length,
        }}
      />
    );
  } else if (typeof img === "string") {
    if (img.startsWith("http"))
      return <img style={style} src={img.split("/revision")[0]}></img>;
    else return <img style={style} src={`/${img}.png`}></img>;
  } else {
    const IconComponent = Lucide[img.lucide] as LucideIcon;

    return <IconComponent style={style} size={length} strokeWidth={3} />;
  }
};
