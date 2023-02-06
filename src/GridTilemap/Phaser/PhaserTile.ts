import { Tile } from "../Tilemap";

// export class PhaserTile implements Tile {
//   constructor(private phaserTile: Phaser.Tilemaps.Tile) {}

//   getProperties(): Record<string, string> {
//     return this.phaserTile.properties as Record<string, string>;
//   }
// }

export class PhaserTile implements Tile {
  constructor(private phaserTile: Phaser.Tilemaps.Tile) {}

  getProperty(name: string): string | undefined {
    const layerProps = this.phaserTile.properties as [
      { name: any; value: any }
    ];
    const prop = layerProps?.find((el) => el.name == name);
    return prop?.value;
  }
  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }
}
