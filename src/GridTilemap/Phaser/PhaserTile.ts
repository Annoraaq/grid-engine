import { Tile } from "../Tilemap";

export class PhaserTile implements Tile {
  constructor(private phaserTile: Phaser.Tilemaps.Tile) {}

  getProperty(name: string): any {
    const tileProps = this.phaserTile.properties as Record<string, any>;
    return tileProps[name];
  }
  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }
}
