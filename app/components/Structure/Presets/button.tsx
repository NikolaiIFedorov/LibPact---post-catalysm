import { FCParent, FlexProps, layerStyles } from "../";
import presets from "../presets.module.css";

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

  let fontSize: string;
  switch (size) {
    case "faint":
      fontSize = `calc(var(--spacing) - (var(--layer) * 3px))`;
      break;
    default:
      fontSize = `calc(var(--spacing) - (var(--layer) * 2px))`;
  }
  return (
    <button onClick={onClick} style={{ flex: flex }}>
      <div
        className={`${presets.buttonInner}`}
        style={{
          ...layerStyles.vars(layer),
          fontSize: fontSize,
          minWidth: minWidth,
          flexDirection: direction,
          alignItems: align ? "center" : undefined,
        }}
      >
        {children}
      </div>
    </button>
  );
};
