/**
 * Centralized layer-based style calculations for Structure components
 */

import { CSSProperties } from "@mui/material";

type Size = "default" | "faint" | "container";

export const layerStyles = {
  /**
   * Border radius based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   * @param offset - Optional offset to adjust the calculation (default: 0)
   */
  borderRadius: (layer: number, offset?: Size): string => {
    let numOffset = 0;
    if (offset == "container") numOffset = 1;
    return `calc(var(--spacing) / ${layer + numOffset})`;
  },

  /**
   * Background color based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   * @param offset - Optional offset to adjust the lightness (default: 0)
   */
  backgroundColor: (layer: number, offset?: Size): string => {
    let numOffset = 0;
    if (offset == "faint") numOffset = -3.75;
    return `hsla(0, 0%, 100%, 0.15)`;
  },

  /**
   * Gap/Padding spacing based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  spacing: (layer: number, offset?: Size | number): string => {
    let numOffset = 1;
    if (offset == "faint") numOffset = 0.25;
    return `calc(var(--spacing) / ${(layer + 1) / numOffset})`;
  },

  /**
   * Font size based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  fontSize: (layer: number, offset?: Size): string => {
    let numOffset = 0;
    if (offset == "faint") numOffset = -1;
    return `calc(var(--spacing) - ${(layer - numOffset) * 2}px)`;
  },

  /**
   * Text color based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  itemColor: (layer: number, offset?: Size): string => {
    let numOffset = 0;
    if (offset == "faint") numOffset = -5;
    return `hsl(0, 0%, ${15 * layer + 30 + numOffset}%)`;
  },

  DEFAULT: (layer: number, offset?: Size): CSSProperties => {
    return {
      ...layerStyles.ITEM(layer, offset),
      ...layerStyles.LAYER(layer, offset),
    };
  },

  LAYER: (layer: number, offset?: Size): CSSProperties => {
    return {
      borderRadius: layerStyles.borderRadius(layer, offset),
      backgroundColor: layerStyles.backgroundColor(layer, offset),
    };
  },

  ITEM: (layer: number, offset?: Size): CSSProperties => {
    return {
      fontSize: layerStyles.fontSize(layer, offset),
      color: layerStyles.itemColor(layer, offset),
    };
  },

  FAINT: (layer: number): CSSProperties => {
    return {
      ...layerStyles.DEFAULT(layer, "faint"),
      padding: layerStyles.spacing(layer, "faint"),
      gap: layerStyles.spacing(layer, "faint"),
    };
  },
};
