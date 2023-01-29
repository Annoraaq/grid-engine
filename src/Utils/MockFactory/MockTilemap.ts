import {
  Orientation,
  Tile,
  TileLayer,
  Tilemap,
} from "../../GridTilemap/Tilemap";

export class MockTile implements Tile {
  constructor(private properties: Record<string, string> = {}) {}
  getProperties(): Record<string, string> {
    return this.properties;
  }
}

export class MockTilemap implements Tilemap {
  constructor(
    private layers: TileLayer[] = [],
    private orientation: Orientation = "orthogonal"
  ) {}

  getTileWidth(): number {
    return 10;
  }
  getTileHeight(): number {
    return 10;
  }
  getWidth(): number {
    return 20;
  }
  getHeight(): number {
    return 20;
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
  copyLayer(_layer: TileLayer, _newName: string, _row: number): TileLayer {
    return new MockTileLayer();
  }
}

export class MockTileLayer implements TileLayer {
  private depth = 0;
  constructor(
    private name: string = "tileLayerName",
    private properties: Record<string, string> = {},
    private height: number = 5,
    private width: number = 5,
    private scale: number = 1,
    private tilesets: string[] = [],
    private data: Tile[][] = [[]]
  ) {}
  getProperties(): Record<string, string> {
    return this.properties;
  }
  getName(): string {
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
  getData(): Tile[][] {
    return this.data;
  }
}
