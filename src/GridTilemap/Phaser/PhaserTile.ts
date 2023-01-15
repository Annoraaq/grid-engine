import { Tile } from "../Tilemap";

export class PhaserTile implements Tile {
  constructor(private phaserTile: Phaser.Tilemaps.Tile) {}

  getProperties(): Record<string, string> {
    return this.phaserTile.properties as Record<string, string>;
  }
}
