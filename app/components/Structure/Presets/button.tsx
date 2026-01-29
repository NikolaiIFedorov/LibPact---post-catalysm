import { FCParent, FlexProps, layerStyles } from "../";

export const Button: FCParent<
  FlexProps & {
    onClick: () => void;
    layer: number;

    minWidth?: string;

    fit?: "content" | "parent";
    direction?: "inherit" | "row" | "column";
    align?: boolean;
    size?: "default" | "faint";
    color?: boolean;
  }
> = ({
  onClick,
  layer,
  weight,
  fit,
  minWidth,
  children,
  direction = "inherit",
  align = false,
  size = "default",
  color = true,
}) => {
  let flex: string;
  switch (fit) {
    case "content":
      flex = `0 0 auto`;
      break;
    case "parent":
      flex = `0 1 ${weight}`;
      break;
    default:
      flex = `${weight}`;
  }
  return (
    <button
      onClick={onClick}
      style={{
        flex: flex,

        ...layerStyles.ITEM(layer, size),
        borderRadius: layerStyles.borderRadius(layer, size),
        backgroundColor: color
          ? layerStyles.backgroundColor(layer, size)
          : "transparent",
        padding: color ? layerStyles.spacing(layer, size) : undefined,
        gap: layerStyles.spacing(layer, size),

        minWidth: minWidth,

        display: "flex",
        flexDirection: direction,
        alignItems: align ? "center" : undefined,
      }}
    >
      {children}
    </button>
  );
};
