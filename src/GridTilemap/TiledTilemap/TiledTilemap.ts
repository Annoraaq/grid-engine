import { Orientation, Tile, TileLayer, Tilemap } from "../Tilemap.js";
import { TiledLayer } from "./TiledLayer.js";

export const CHAR_LAYER_PROP_NAME = "ge_charLayer";

/**
 * Simple implementation of the Tilemap interface, using a parsed version of a
 * Tiled tilemap.
 *
 * Example usage:
 * `new TiledTilemap(JSON.parse(tiledTilemapAsString))`
 */
export class TiledTilemap implements Tilemap {
  private layers: TileLayer[] = [];
  constructor(private rawTilemap: any) {
    this.layers = this.rawTilemap.layers?.map(
      (l) => new TiledLayer(this.rawTilemap.tilesets, l),
    );
  }

  hasTileAt(x: number, y: number, layer: string): boolean {
    // These two checks are for performance, not correctness.
    if (x < 0 || x >= this.rawTilemap.width) return false;
    if (y < 0 || y >= this.rawTilemap.height) return false;

    if (!this.rawTilemap.layers) return false;
    const tilemapLayer = this.rawTilemap.layers.find((l) => l.name === layer);

    if (!tilemapLayer) return false;

    const linearPos = y * this.rawTilemap.width + x;
    return tilemapLayer.data[linearPos] > 0;
  }

  getTileAt(x: number, y: number, layer: string): Tile | undefined {
    if (x < 0 || x >= this.rawTilemap.width) return undefined;
    if (y < 0 || y >= this.rawTilemap.height) return undefined;

    if (!this.rawTilemap.layers) return undefined;
    const tilemapLayer = this.layers.find(
      (l: TileLayer) => l.getName() === layer,
    );
    if (!tilemapLayer) return undefined;
    return tilemapLayer.getData()[y][x];
  }

  getOrientation(): Orientation {
    return this.rawTilemap.orientation as Orientation;
  }

  getLayers(): TileLayer[] {
    return this.layers;
  }

  getWidth(): number {
    return this.rawTilemap.width;
  }

  getHeight(): number {
    return this.rawTilemap.height;
  }
}
