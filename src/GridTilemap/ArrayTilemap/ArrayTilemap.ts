import { Orientation, Tile, TileLayer, Tilemap } from "../Tilemap.js";

/**
 * Represents a layer for a simple array tilemap.
 */
export interface ArrayTilemapInputLayer {
  /**
   * Actual tilemap data.
   * 0 => unblocked
   * 1 => blocked
   */
  data: number[][];
  isCharLayer?: boolean;
}

type LayerName = string;

/**
 * Very simple tilemap implementation. Can be used as a base for creating your
 * own customized tilemap or for simple use cases or testing.
 */
export class ArrayTilemap implements Tilemap {
  private layerMap = new Map<LayerName, TileLayer>();
  private layers: TileLayer[] = [];

  constructor(
    private map: Record<LayerName, ArrayTilemapInputLayer>,
    private orientation: Orientation = "orthogonal",
    collisionPropertyName = "ge_collide",
  ) {
    let width = -1;
    let height = -1;
    Object.entries(map).map(([name, layer]) => {
      const newWidth = layer.data[0]?.length;
      const newHeight = layer.data.length;
      if (
        (width !== -1 && width !== newWidth) ||
        (height !== -1 && height !== newHeight)
      ) {
        throw new Error("All tilemap layers must have the same dimensions.");
      }
      width = newWidth;
      height = newHeight;

      const tiles: Tile[][] = [];
      for (let r = 0; r < layer.data.length; r++) {
        const row: Tile[] = [];
        for (let c = 0; c < layer.data[r].length; c++) {
          const tile = new ArrayTile(
            layer.data[r][c] === 1,
            collisionPropertyName,
          );
          row.push(tile);
        }
        tiles.push(row);
      }
      const arrayLayer = new ArrayTileLayer(name, tiles, layer.isCharLayer);
      this.layers.push(arrayLayer);
      this.layerMap.set(name, arrayLayer);
    });
  }

  getWidth(): number {
    return Object.values(this.map)[0]?.data[0]?.length || 0;
  }
  getHeight(): number {
    return Object.values(this.map)[0]?.data.length || 0;
  }
  getOrientation(): Orientation {
    return this.orientation;
  }
  getLayers(): TileLayer[] {
    return this.layers;
  }
  hasTileAt(x: number, y: number, layer?: string): boolean {
    if (!layer) return false;
    const l = this.layerMap.get(layer);
    if (!l) return false;
    return x >= 0 && x < this.getWidth() && y >= 0 && y < this.getHeight();
  }
  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    if (!layer) return undefined;
    const l = this.layerMap.get(layer);
    if (!l) return undefined;
    return l.getData()[y][x];
  }
}

class ArrayTileLayer implements TileLayer {
  private isCharLayerInternal: boolean;
  constructor(
    private name: string,
    private tiles: Tile[][],
    isCharLayer = false,
  ) {
    this.isCharLayerInternal = isCharLayer;
  }

  getName(): string | undefined {
    return this.name;
  }
  getProperty(name: string): string | undefined {
    if (name === "ge_charLayer" && this.isCharLayerInternal) {
      return this.name;
    }
  }
  hasProperty(name: string): boolean {
    return name === "ge_charLayer" && this.isCharLayerInternal;
  }
  getData(): Array<Array<Tile | undefined>> {
    return this.tiles;
  }
  isCharLayer(): boolean {
    return this.isCharLayerInternal;
  }
}

class ArrayTile {
  constructor(
    private isBlocking: boolean,
    private collisionPropertyName: string,
  ) {}

  getProperty(name: string): any {
    if (name === this.collisionPropertyName) {
      return this.isBlocking;
    }
    return false;
  }
  hasProperty(name: string): boolean {
    return name === this.collisionPropertyName;
  }
}
