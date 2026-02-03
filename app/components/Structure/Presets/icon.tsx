import { FC, layerStyles, LucideIcon, Lucide } from "../";

export interface IconProps {
  size?: "default" | "big" | "medium" | "small" | "tiny";
  img?: { lucide: keyof typeof Lucide } | string;
  color?: string | boolean;
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

  let backgroundColor = "transparent";
  if (color === true) {
    backgroundColor = layerStyles.backgroundColor();
  } else if (typeof color === "string") {
    backgroundColor = color;
  }

  const style = {
    ...layerStyles.ITEM(layer - 1, "faint"),
    borderRadius: `${length / 3}px`,
    height: length,
    width: length,
    maxHeight: length,
    maxWidth: length,
    padding: "unset",

    display: "flex",
    alignSelf: "first-baseline",
    backgroundColor: backgroundColor,
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
    return <img style={style} src={`/${img}.png`}></img>;
  } else {
    const IconComponent = Lucide[img.lucide] as LucideIcon;

    return <IconComponent style={style} size={length} strokeWidth={3} />;
  }
};
