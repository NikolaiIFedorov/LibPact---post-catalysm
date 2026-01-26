/**
 * Centralized layer-based style calculations for Structure components
 */

/**
 * Lightweight helper to expose a CSS variable containing the layer number.
 * Components should set this variable (no math in JS); CSS modules use
 * `var(--layer)` and `var(--spacing)` with `calc()` to derive layout values.
 */

export const layerStyles = {
  vars: (layer: number) => ({
    // store the layer as a unitless number; CSS will multiply by px when needed
    ["--layer"]: `${layer}`,
  }),
};
