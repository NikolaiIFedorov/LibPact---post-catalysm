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
    <button onClick={onClick} style={{ flex: flex }}>
      <div
        style={{
          ...layerStyles.DEFAULT(layer, size),

          minWidth: minWidth,

          display: "flex",
          flexDirection: direction,
          alignItems: align ? "center" : undefined,
          gap: layerStyles.spacing(layer),
          padding: layerStyles.spacing(layer, size),
        }}
      >
        {children}
      </div>
    </button>
  );
};
