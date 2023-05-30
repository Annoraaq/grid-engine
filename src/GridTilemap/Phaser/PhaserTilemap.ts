import { TileLayer, Orientation, Tile, Tilemap } from "../Tilemap";
import { PhaserTile } from "./PhaserTile";
import { PhaserTileLayer } from "./PhaserTileLayer";

export class PhaserTilemap implements Tilemap {
  constructor(private phaserTilemap: Phaser.Tilemaps.Tilemap) {}

  getTileWidth(): number {
    return this.phaserTilemap.tileWidth;
  }

  getTileHeight(): number {
    return this.phaserTilemap.tileHeight;
  }

  getWidth(): number {
    return this.phaserTilemap.width;
  }

  getHeight(): number {
    return this.phaserTilemap.height;
  }

  getOrientation(): Orientation {
    // Against the documentation of phaser, tilemap seems to be a number instead
    // of a string. Therefore the intentional type coercion here.
    if (
      this.phaserTilemap.orientation ==
      Phaser.Tilemaps.Orientation.ISOMETRIC.toString()
    ) {
      return "isometric";
    }
    return "orthogonal";
  }

  getLayers(): TileLayer[] {
    return this.phaserTilemap.layers.map(
      (l) => new PhaserTileLayer(l.tilemapLayer)
    );
  }

  hasTileAt(x: number, y: number, layer?: string): boolean {
    return !!this.phaserTilemap.hasTileAt(x, y, layer);
  }

  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    const phaserTile = this.phaserTilemap.getTileAt(x, y, false, layer);
    if (!phaserTile) return undefined;
    return new PhaserTile(phaserTile);
  }
}
