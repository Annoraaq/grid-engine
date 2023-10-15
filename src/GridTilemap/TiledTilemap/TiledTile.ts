import { Tile } from "../Tilemap.js";
import { RawTiledTileset } from "./TiledMap.js";

export class TiledTile implements Tile {
  private props = {};
  constructor(tilesets: RawTiledTileset[], tileId: number) {
    const correctTileset = tilesets.find((ts) => {
      if (!ts.tiles) return false;
      const offset = ts.firstgid ?? 0;
      const tid = ts.tiles.find((t) => t.id + offset === tileId);
      if (tid) return true;
      return false;
    });

    if (!correctTileset) {
      return;
    }

    const tilesetTile = correctTileset.tiles?.find((t) => {
      return t.id + (correctTileset.firstgid ?? 0) === tileId;
    });

    if (tilesetTile?.properties) {
      for (const prop of tilesetTile.properties) {
        if (prop.name) {
          this.props[prop.name] = prop.value;
        }
      }
    }
  }
  getProperty(name: string): any {
    return this.props[name];
  }
  hasProperty(name: string): boolean {
    return this.props[name] !== undefined;
  }
}
