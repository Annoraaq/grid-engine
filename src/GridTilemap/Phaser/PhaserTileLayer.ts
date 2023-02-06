import { CharTileLayer, Tile } from "../Tilemap";
import { PhaserTile } from "./PhaserTile";

export class PhaserTileLayer implements CharTileLayer {
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
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }

  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }

  getData(): Tile[][] {
    return this.phaserTilemapLayer.layer.data.map((d) =>
      d.map((dc) => new PhaserTile(dc))
    );
  }
  // getProperties(): Record<string, string> {
  //   const ret: Record<string, string> = {};

  //   if (!this.phaserTilemapLayer.layer?.properties) return {};
  //   const layerProps = this.phaserTilemapLayer.layer?.properties as [
  //     { name: any; value: any }
  //   ];
  //   layerProps.forEach(({ name, value }) => {
  //     ret[name] = value;
  //   });
  //   return ret;
  // }
  // getName(): string {
  //   return this.phaserTilemapLayer.layer.name;
  // }
  // getHeight(): number {
  //   return this.phaserTilemapLayer.layer.height;
  // }
  // getWidth(): number {
  //   return this.phaserTilemapLayer.layer.width;
  // }
  // getScale(): number {
  //   return this.phaserTilemapLayer.scale;
  // }
  // setScale(scale: number): void {
  //   this.phaserTilemapLayer.scale = scale;
  // }
  // setDepth(depth: number): void {
  //   this.phaserTilemapLayer.setDepth(depth);
  // }
  // getDepth(): number {
  //   return this.phaserTilemapLayer.depth;
  // }
  // destroy(): void {
  //   this.phaserTilemapLayer.destroy();
  // }
  // getTilesets(): string[] {
  //   const tileset = this.phaserTilemapLayer.tileset;
  //   if (typeof tileset === "string") {
  //     return [tileset];
  //   } else if (Array.isArray(tileset)) {
  //     return tileset.map((e) => {
  //       if (typeof e === "string") return e;
  //       return e.name;
  //     });
  //   }
  //   return [];
  // }
  // putTileAt(tile: number, x: number, y: number): void {
  //   this.phaserTilemapLayer.putTileAt(tile, x, y);
  // }

  // getData(): Tile[][] {
  //   return this.phaserTilemapLayer.layer.data.map((a) =>
  //     a.map((b) => new PhaserTile(b))
  //   );
  // }
}

// export class PhaserTileLayer implements TileLayer {
//   constructor(private phaserTilemapLayer: Phaser.Tilemaps.TilemapLayer) {}
//   getProperties(): Record<string, string> {
//     const ret: Record<string, string> = {};

//     if (!this.phaserTilemapLayer.layer?.properties) return {};
//     const layerProps = this.phaserTilemapLayer.layer?.properties as [
//       { name: any; value: any }
//     ];
//     layerProps.forEach(({ name, value }) => {
//       ret[name] = value;
//     });
//     return ret;
//   }
//   getName(): string {
//     return this.phaserTilemapLayer.layer.name;
//   }
//   getHeight(): number {
//     return this.phaserTilemapLayer.layer.height;
//   }
//   getWidth(): number {
//     return this.phaserTilemapLayer.layer.width;
//   }
//   getScale(): number {
//     return this.phaserTilemapLayer.scale;
//   }
//   setScale(scale: number): void {
//     this.phaserTilemapLayer.scale = scale;
//   }
//   setDepth(depth: number): void {
//     this.phaserTilemapLayer.setDepth(depth);
//   }
//   getDepth(): number {
//     return this.phaserTilemapLayer.depth;
//   }
//   destroy(): void {
//     this.phaserTilemapLayer.destroy();
//   }
//   getTilesets(): string[] {
//     const tileset = this.phaserTilemapLayer.tileset;
//     if (typeof tileset === "string") {
//       return [tileset];
//     } else if (Array.isArray(tileset)) {
//       return tileset.map((e) => {
//         if (typeof e === "string") return e;
//         return e.name;
//       });
//     }
//     return [];
//   }
//   putTileAt(tile: number, x: number, y: number): void {
//     this.phaserTilemapLayer.putTileAt(tile, x, y);
//   }

//   getData(): Tile[][] {
//     return this.phaserTilemapLayer.layer.data.map((a) =>
//       a.map((b) => new PhaserTile(b))
//     );
//   }
// }
