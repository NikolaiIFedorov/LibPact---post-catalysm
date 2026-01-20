/**
 * Centralized layer-based style calculations for Structure components
 */

export const layerStyles = {
  /**
   * Border radius based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   * @param offset - Optional offset to adjust the calculation (default: 0)
   */
  borderRadius: (layer: number, offset: number = 0): string => {
    return `calc(var(--spacing) / ${layer + offset})`;
  },

  /**
   * Background color based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   * @param offset - Optional offset to adjust the lightness (default: 0)
   */
  backgroundColor: (layer: number, offset: number = 0): string => {
    return `hsl(0, 0%, ${15 * layer + offset}%)`;
  },

  /**
   * Gap/Padding spacing based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  spacing: (layer: number): string => {
    return `calc(var(--spacing) / ${layer + 1})`;
  },

  /**
   * Font size based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  fontSize: (layer: number): string => {
    return `calc(var(--spacing) - ${layer - 1}px)`;
  },

  /**
   * Text color based on layer depth
   * @param layer - The layer depth (1, 2, 3, etc.)
   */
  textColor: (layer: number): string => {
    return `hsl(0, 0%, ${15 * layer + 45}%)`;
  },
};
