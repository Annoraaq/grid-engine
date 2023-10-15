import { TileLayer, Tile, CHAR_LAYER_PROP_NAME } from "../Tilemap.js";
import { PhaserTile } from "./PhaserTile.js";
import { TiledProject } from "./PhaserTilemap.js";

export class PhaserTileLayer implements TileLayer {
  constructor(
    private phaserTilemapLayer: Phaser.Tilemaps.TilemapLayer,
    private tiledProject?: TiledProject,
  ) {}

  getName(): string {
    return this.phaserTilemapLayer.layer.name;
  }

  getProperty(name: string): string | undefined {
    const layerProps = this.phaserTilemapLayer.layer.properties as [
      { name: any; value: any },
    ];
    const prop = layerProps?.find((el) => el.name == name);
    return prop?.value;
  }

  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }

  isCharLayer(): boolean {
    return this.hasProperty(CHAR_LAYER_PROP_NAME);
  }

  getData(): Tile[][] {
    return this.phaserTilemapLayer.layer.data.map((d) =>
      d.map((dc) => new PhaserTile(dc, this.tiledProject)),
    );
  }
}
