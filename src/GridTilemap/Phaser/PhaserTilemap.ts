import { TileLayer, Orientation, Tile, Tilemap } from "../Tilemap.js";
import { PhaserTile } from "./PhaserTile.js";
import { PhaserTileLayer } from "./PhaserTileLayer.js";

export interface TiledProject {
  propertyTypes: Array<{
    name: string;
    type: string;
    members: Array<{
      name: string;
      type: string;
      propertyType?: string;
      value: any;
    }>;
  }>;
}

export class PhaserTilemap implements Tilemap {
  constructor(
    private phaserTilemap: Phaser.Tilemaps.Tilemap,
    private tiledProject?: TiledProject,
  ) {
    for (const l of this.phaserTilemap.layers) {
      if (l.tilemapLayer == null) {
        throw new Error(
          `Error initializing tilemap. Layer '${l.name}' has no 'tilemapLayer'. This can happen if you call 'createLayer' with the wrong layer ID.`,
        );
      }
    }
  }

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
      (l) => new PhaserTileLayer(l.tilemapLayer, this.tiledProject),
    );
  }

  hasTileAt(x: number, y: number, layer?: string): boolean {
    return !!this.phaserTilemap.hasTileAt(x, y, layer);
  }

  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    const phaserTile = this.phaserTilemap.getTileAt(x, y, false, layer);
    if (!phaserTile) return undefined;
    return new PhaserTile(phaserTile, this.tiledProject);
  }
}
