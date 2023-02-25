import { TileLayer, Tile } from "../Tilemap";
import { PhaserTile } from "./PhaserTile";

export class PhaserTileLayer implements TileLayer {
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  constructor(
    private name: string,
    private phaserTilemapLayer: Phaser.Tilemaps.TilemapLayer
  ) {}

  getName(): string {
    return this.name;
  }

  getProperty(name: string): string | undefined {
    const layerProps = this.phaserTilemapLayer.layer.properties as [
      { name: any; value: any }
    ];
    const prop = layerProps?.find((el) => el.name == name);
    return prop?.value;
  }

  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }

  isCharLayer(): boolean {
    return this.hasProperty(PhaserTileLayer.CHAR_LAYER_PROP_NAME);
  }

  getData(): Tile[][] {
    return this.phaserTilemapLayer.layer.data.map((d) =>
      d.map((dc) => new PhaserTile(dc))
    );
  }
}
