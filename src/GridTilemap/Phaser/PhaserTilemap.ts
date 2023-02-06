import {
  CharTileLayer,
  Orientation,
  Tile,
  // TileLayer,
  Tilemap,
} from "../Tilemap";
import { PhaserTile } from "./PhaserTile";
import { PhaserTileLayer } from "./PhaserTileLayer";

export class PhaserTilemap implements Tilemap {
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
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

  // getLayers(): TileLayer[] {
  //   return this.phaserTilemap.layers.map(
  //     (l) => new PhaserTileLayer(l.tilemapLayer)
  //   );
  // }

  getCharLayers(): CharTileLayer[] {
    return this.phaserTilemap.layers
      .filter((l) => {
        return this.isCharLayer(l);
      })
      .map(
        (l) =>
          new PhaserTileLayer(
            this.getLayerProperty(l, PhaserTilemap.CHAR_LAYER_PROP_NAME) ?? "",
            l.tilemapLayer
          )
      );
  }

  // hasLayerProp(layer: CharTileLayer, name: string): boolean {
  //   return this.getLayerProp(layer, name) != undefined;
  // }

  // getLayerProp(layer: CharTileLayer, name: string): string | undefined {
  //   const prop = layer.getProperties()[name];
  //   return prop;
  // }

  getLayerProperty(
    layer: Phaser.Tilemaps.LayerData,
    name: string
  ): string | undefined {
    const layerProps = layer.properties as [{ name: any; value: any }];
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }

  hasLayerProperty(layer: Phaser.Tilemaps.LayerData, name: string): boolean {
    return this.getLayerProperty(layer, name) != undefined;
  }

  private isCharLayer(layer: Phaser.Tilemaps.LayerData): boolean {
    return this.hasLayerProperty(layer, PhaserTilemap.CHAR_LAYER_PROP_NAME);
  }

  hasTileAt(x: number, y: number, layer?: string): boolean {
    return this.phaserTilemap.hasTileAt(x, y, layer);
  }

  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    const phaserTile = this.phaserTilemap.getTileAt(x, y, false, layer);
    if (!phaserTile) return undefined;

    return new PhaserTile(this.phaserTilemap.getTileAt(x, y, false, layer));
  }

  // copyLayer(layer: TileLayer, newName: string, row: number): TileLayer {
  //   const newLayer = this.phaserTilemap.createBlankLayer(
  //     newName,
  //     layer.getTilesets()
  //   );
  //   const phaserLayer = this.phaserTilemap.getLayer(layer.getName());
  //   for (let col = 0; col < layer.getWidth(); col++) {
  //     newLayer.putTileAt(phaserLayer.data[row][col], col, row);
  //   }
  //   return new PhaserTileLayer(newLayer);
  // }
}

// export class PhaserTilemap implements Tilemap {
//   constructor(private phaserTilemap: Phaser.Tilemaps.Tilemap) {}

//   getTileWidth(): number {
//     return this.phaserTilemap.tileWidth;
//   }

//   getTileHeight(): number {
//     return this.phaserTilemap.tileHeight;
//   }

//   getWidth(): number {
//     return this.phaserTilemap.width;
//   }

//   getHeight(): number {
//     return this.phaserTilemap.height;
//   }

//   getOrientation(): Orientation {
//     // Against the documentation of phaser, tilemap seems to be a number instead
//     // of a string. Therefore the intentional type coercion here.
//     if (
//       this.phaserTilemap.orientation ==
//       Phaser.Tilemaps.Orientation.ISOMETRIC.toString()
//     ) {
//       return "isometric";
//     }
//     return "orthogonal";
//   }

//   getLayers(): TileLayer[] {
//     return this.phaserTilemap.layers.map(
//       (l) => new PhaserTileLayer(l.tilemapLayer)
//     );
//   }

//   hasTileAt(x: number, y: number, layer?: string): boolean {
//     return this.phaserTilemap.hasTileAt(x, y, layer);
//   }

//   getTileAt(x: number, y: number, layer?: string): Tile | undefined {
//     const phaserTile = this.phaserTilemap.getTileAt(x, y, false, layer);
//     if (!phaserTile) return undefined;

//     return new PhaserTile(this.phaserTilemap.getTileAt(x, y, false, layer));
//   }

//   copyLayer(layer: TileLayer, newName: string, row: number): TileLayer {
//     const newLayer = this.phaserTilemap.createBlankLayer(
//       newName,
//       layer.getTilesets()
//     );
//     const phaserLayer = this.phaserTilemap.getLayer(layer.getName());
//     for (let col = 0; col < layer.getWidth(); col++) {
//       newLayer.putTileAt(phaserLayer.data[row][col], col, row);
//     }
//     return new PhaserTileLayer(newLayer);
//   }
// }
