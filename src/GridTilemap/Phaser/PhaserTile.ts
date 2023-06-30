import { Tile } from "../Tilemap";
import { TiledProject } from "./PhaserTilemap";

export class PhaserTile implements Tile {
  constructor(
    private phaserTile: Phaser.Tilemaps.Tile,
    private tiledProject?: TiledProject
  ) {}

  getProperty(name: string): any {
    const inheritedTileProps: Record<string, any> = {};
    if (this.tiledProject) {
      const type = this.getType();
      if (type) {
        const propertyType = this.tiledProject.propertyTypes.find(
          (pt) => pt.name === type
        );
        if (propertyType) {
          for (const member of propertyType.members) {
            inheritedTileProps[member.name] = member.value;
          }
        }
      }
    }
    const tileProps = this.phaserTile.properties as Record<string, any>;
    return tileProps[name] ?? inheritedTileProps[name];
  }

  hasProperty(name: string): boolean {
    return this.getProperty(name) != undefined;
  }

  private getType(): string | undefined {
    return this.phaserTile.tileset?.tileData[this.phaserTile.index - 1]?.type;
  }
}
