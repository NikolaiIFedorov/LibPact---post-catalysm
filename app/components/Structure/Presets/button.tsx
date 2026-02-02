import { FCParent, FlexProps, Icon, layerStyles, IconProps } from "../";

export const Button: FCParent<
  FlexProps & {
    onClick?: () => void;
    layer: number;

    fit?: "content" | "parent";
    direction?: "inherit" | "row" | "column";
    align?: boolean;
    size?: "default" | "faint";
    icon?: IconProps;
  }
> = ({
  onClick = () => {
    console.log(`Button clicked with icon: ${icon?.img}`);
  },
  layer,
  weight,
  fit,
  children,
  direction = "inherit",
  align = false,
  size = "default",
  icon,
}) => {
  let flex: string;
  let height: string;
  let width: string;
  switch (fit) {
    case "content":
      flex = `0 0 auto`;
      width = `fit-content`;
      height = "fit-content";
      break;
    case "parent":
      flex = `0 1 ${weight}`;
      width = `100%`;
      height = "100%";
      break;
    default:
      flex = `${weight}`;
      width = "auto";
      height = "auto";
  }
  return (
    <button
      onClick={onClick}
      style={{
        flex: flex,

        ...layerStyles.ITEM(layer, size),
        borderRadius: layerStyles.borderRadius(layer, size),
        backgroundColor: icon
          ? "transparent"
          : layerStyles.backgroundColor(size),
        padding: icon ? undefined : layerStyles.spacing(layer, size),
        gap: layerStyles.spacing(layer, size),

        width: width,
        height: height,

        display: "flex",
        flexDirection: direction,
        alignItems: align ? "center" : undefined,
      }}
    >
      {icon ? (
        <Icon
          layer={layer}
          img={icon.img}
          size={icon.size}
          color={icon.color}
        />
      ) : (
        children
      )}
    </button>
  );
};
