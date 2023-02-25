export type Orientation = "isometric" | "orthogonal";
export const CHAR_LAYER_PROP_NAME = "ge_charLayer";

export interface Tile {
  getProperty(name: string): any;
  hasProperty(name: string): boolean;
}

export interface TileLayer {
  getName(): string | undefined;
  getProperty(name: string): string | undefined;
  hasProperty(name: string): boolean;
  getData(): Array<Array<Tile | undefined>>;
  isCharLayer(): boolean;
}

export interface Tilemap {
  getWidth(): number;
  getHeight(): number;
  getOrientation(): Orientation;
  getLayers(): TileLayer[];
  hasTileAt(x: number, y: number, layer?: string): boolean;
  getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
