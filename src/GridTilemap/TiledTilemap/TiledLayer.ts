import { Tile, TileLayer } from "../Tilemap.js";
import { RawTiledLayer, RawTiledTileset } from "./TiledMap.js";
import { TiledTile } from "./TiledTile.js";

export class TiledLayer implements TileLayer {
  private data: Array<Array<Tile | undefined>> = [];
  constructor(
    tilesets: RawTiledTileset[],
    private layer: RawTiledLayer,
  ) {
    this.data = [];
    if (this.layer.data) {
      for (let r = 0; r < (this.layer.height || 0); r++) {
        const row: Array<Tile | undefined> = [];
        for (let c = 0; c < (this.layer.width || 0); c++) {
          const t = this.layer.data[r * (this.layer.width || 0) + c];
          if (t !== undefined) {
            row.push(new TiledTile(tilesets, t));
          } else {
            row.push(undefined);
          }
        }
        this.data.push(row);
      }
    }
  }
  getName(): string | undefined {
    return this.layer.name;
  }
  getProperty(name: string): string | undefined {
    return this.layer.properties?.find((p) => p.name === name)?.value;
  }
  hasProperty(name: string): boolean {
    return this.getProperty(name) !== undefined;
  }
  getData(): Array<Array<Tile | undefined>> {
    return this.data;
  }
  isCharLayer(): boolean {
    return this.hasProperty("ge_charLayer");
  }
}
