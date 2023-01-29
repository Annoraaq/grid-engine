export type Orientation = "isometric" | "orthogonal";

export interface Tile {
  getProperties(): Record<string, string>;
}
export interface TileLayer {
  getProperties(): Record<string, string>;
  getName(): string;
  getHeight(): number;
  getWidth(): number;
  getScale(): number;
  setScale(scale: number): void;
  setDepth(depth: number): void;
  getDepth(): number;
  destroy(): void;
  getTilesets(): string[];
  putTileAt(tile: number, x: number, y: number): void;
  getData(): Tile[][];
}

export interface Tilemap {
  getTileWidth(): number;
  getTileHeight(): number;
  getWidth(): number;
  getHeight(): number;
  getOrientation(): Orientation;
  getLayers(): TileLayer[];
  hasTileAt(x: number, y: number, layer?: string): boolean;
  getTileAt(x: number, y: number, layer?: string): Tile | undefined;
  copyLayer(layer: TileLayer, newName: string, row: number): TileLayer;
}
