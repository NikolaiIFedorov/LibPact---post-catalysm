export { useState } from "react";

export type FCParent<Props = {}> = React.FC<React.PropsWithChildren<Props>>;
export type FC<Props = {}> = React.FC<Props>;
export type FlexProps = { weight?: number };

export { layerStyles } from "./layerStyles";

export { Icon, type IconProps } from "./Presets/icon";
export * as Lucide from "lucide-react";
export type { LucideIcon } from "lucide-react";
