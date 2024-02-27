export type CharLayer = string | undefined;

/**
 * Specifies a tile position along with a character layer.
 */
export interface LayerPosition {
  position: Position;
  charLayer: CharLayer;
}

export interface Position {
  x: number;
  y: number;
}
