import { Orientation, Tile, TileLayer, Tilemap } from "../Tilemap";

export const CHAR_LAYER_PROP_NAME = "ge_charLayer";

export interface TilemapLayer {
  name: string;
  scale: number;
  properties: { name: string; value: string }[];
  data: any[];
}

export interface TilemapTile {
  properties: Record<string, string>;
}

export class TiledTilemap implements Tilemap {
  private layers: TileLayer[] = [];
  constructor(private rawTilemap: any) {
    // this.layers = this.rawTilemap.layers.map(
    //   (l) => new TileLayerImpl(this.rawTilemap.tilesets, l),
    // );
  }

  hasTileAt(x: number, y: number, layer: string): boolean {
    // if (x < 0 || x >= this.rawTilemap.width) return false;
    // if (y < 0 || y >= this.rawTilemap.height) return false;

    // if (!this.rawTilemap.layers) return false;
    // const tilemapLayer = this.rawTilemap.layers.find(
    //   (l: TilemapLayer) => l.name === layer,
    // ) as TilemapLayer;

    // if (!tilemapLayer) return false;

    // const linearPos = y * this.rawTilemap.width + x;
    // return tilemapLayer.data[linearPos] > 0;
    return false;
  }

  getTileAt(x: number, y: number, layer: string): Tile | undefined {
    // if (x < 0 || x >= this.rawTilemap.width) return undefined;
    // if (y < 0 || y >= this.rawTilemap.height) return undefined;

    // if (!this.rawTilemap.layers) return undefined;
    // const tilemapLayer = this.layers.find(
    //   (l: TileLayer) => l.getName() === layer,
    // );
    // if (!tilemapLayer) return undefined;
    // return tilemapLayer.getData()[y][x];
    return undefined;
  }

  getOrientation(): Orientation {
    // return this.rawTilemap.orientation as any;
    return 'orthogonal';
  }

  getLayers(): TileLayer[] {
    // return this.layers;
    return [];
  }

  getWidth(): number {
    return this.rawTilemap.width;
    // return 0;
  }

  getHeight(): number {
    // return this.rawTilemap.height;
    return 0;
  }
}

// class TiledLayer implements TileLayer {
//   constructor(
//     tilesets: any,
//     private layer: TilemapLayer,
//   ) {
//     this.data = [];
//     for (let r = 0; r < this.layer.data.length; r++) {
//       const row: Array<Tile | undefined> = [];
//       for (let c = 0; c < this.layer.data[r].length; c++) {
//         const t = this.layer.data[r][c];
//         if (t) {
//           row.push(new TileImpl(tilesets, t));
//         } else {
//           row.push(undefined);
//         }
//       }
//       this.data.push(row);
//     }
//   }
//   private data: Array<Array<Tile | undefined>> = [];
//   getName(): string | undefined {
//     return this.layer.name;
//   }
//   getProperty(name: string): string | undefined {
//     return this.layer.properties?.find((p) => p.name === name)?.value;
//   }
//   hasProperty(name: string): boolean {
//     return !!this.layer.properties?.find((p) => p.name === name);
//   }
//   getData(): Array<Array<Tile | undefined>> {
//     return this.data;
//   }
//   isCharLayer(): boolean {
//     return this.hasProperty("ge_charLayer");
//   }
// }

// class TiledTile implements Tile {
//   private props = {};
//   constructor(
//     tilesets: any,
//     private tileId: number,
//   ) {
//     const correctTileset = tilesets.find((ts) => {
//       if (!ts.tiles) return false;
//       const offset = ts.firstgid;
//       const tid = ts.tiles.find((t) => t.id + offset === tileId);
//       if (tid) return true;
//       return false;
//     });

//     if (!correctTileset) {
//       return;
//     }

//     const tilesetTile = correctTileset.tiles.find((t) => {
//       return t.id + correctTileset.firstgid === tileId;
//     });

//     if (tilesetTile.properties) {
//       for (const prop of tilesetTile.properties) {
//         this.props[prop.name] = prop.value;
//       }
//     }
//   }
//   getProperty(name: string): any {
//     return this.props[name];
//   }
//   hasProperty(name: string): boolean {
//     return this.props[name] !== undefined;
//   }
// }
