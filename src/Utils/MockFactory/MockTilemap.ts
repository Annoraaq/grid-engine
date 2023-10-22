import {
  TileLayer,
  Orientation,
  Tile,
  Tilemap,
} from "../../GridTilemap/Tilemap.js";

export class MockTile implements Tile {
  constructor(private properties: Record<string, any> = {}) {}
  getProperty(name: string): any {
    return this.properties[name];
  }
  hasProperty(name: string): boolean {
    return this.properties[name] != null;
  }
}

export class MockTilemap implements Tilemap {
  constructor(
    private layers: TileLayer[] = [],
    private orientation: Orientation = "orthogonal",
  ) {}

  getTileWidth(): number {
    return 10;
  }
  getTileHeight(): number {
    return 10;
  }
  getWidth(): number {
    return this.layers[0]?.getData()[0]?.length || 0;
  }
  getHeight(): number {
    return this.layers[0]?.getData()?.length || 0;
  }
  getOrientation(): Orientation {
    return this.orientation;
  }
  getLayers(): TileLayer[] {
    return this.layers;
  }
  hasTileAt(x: number, y: number, layer?: string): boolean {
    const l = this.layers.find((l) => l.getName() === layer);
    return !!l?.getData()[y]?.[x];
  }
  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    const l = this.layers.find((l) => l.getName() === layer);
    return l?.getData()[y]?.[x];
  }
}

export class MockTileLayer implements TileLayer {
  private depth = 0;
  constructor(
    private name: string | undefined,
    private properties: Record<string, string> = {},
    private height: number = 5,
    private width: number = 5,
    private scale: number = 1,
    private tilesets: string[] = [],
    private data: Array<Array<Tile | undefined>> = [[]],
  ) {}
  getProperty(name: string): string | undefined {
    return this.properties[name];
  }
  hasProperty(name: string): boolean {
    return this.properties[name] != null;
  }
  getProperties(): Record<string, string> {
    return this.properties;
  }
  isCharLayer(): boolean {
    return this.hasProperty("ge_charLayer");
  }
  getName(): string | undefined {
    return this.name;
  }
  getHeight(): number {
    return this.height;
  }
  getWidth(): number {
    return this.width;
  }
  getScale(): number {
    return this.scale;
  }

  setScale(scale: number): void {
    this.scale = scale;
  }
  setDepth(depth: number): void {
    this.depth = depth;
  }
  getDepth(): number {
    return this.depth;
  }
  destroy(): void {
    // do nothing
  }
  getTilesets(): string[] {
    return this.tilesets;
  }
  putTileAt(_tile: number, _x: number, _y: number): void {
    // do nothing
  }
  getData(): Array<Array<Tile | undefined>> {
    return this.data;
  }
}
