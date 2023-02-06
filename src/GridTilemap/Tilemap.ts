export type Orientation = "isometric" | "orthogonal";

export interface Tile {
  // getProperties(): Record<string, string>;
  getProperty(name: string): string | undefined;
  hasProperty(name: string): boolean;
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
  getData(): Array<Array<Tile | undefined>>;
}

export interface CharTileLayer {
  getName(): string | undefined;
  getProperty(name: string): string | undefined;
  hasProperty(name: string): boolean;
  getData(): Array<Array<Tile | undefined>>;
}

export interface Tilemap {
  getWidth(): number;
  getHeight(): number;
  getOrientation(): Orientation;
  getCharLayers(): CharTileLayer[];
  hasTileAt(x: number, y: number, layer?: string): boolean;
  getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
