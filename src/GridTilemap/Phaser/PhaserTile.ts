import { Tile } from "../Tilemap.js";
import { TiledProject } from "./PhaserTilemap.js";
import { TiledProjectParser } from "tiled-property-flattener";

export class PhaserTile implements Tile {
  constructor(
    private phaserTile: Phaser.Tilemaps.Tile,
    private tiledProject?: TiledProject,
  ) {}

  getProperty(name: string): any {
    const inheritedTileProps: Record<string, any> = {};
    if (this.tiledProject) {
      const parsedProject = TiledProjectParser.parse(this.tiledProject);
      const type = this.getType();
      if (type) {
        const inheritedProps = parsedProject.getCustomTypesMap()?.get(type);
        if (inheritedProps) {
          for (const [key, val] of Object.entries(inheritedProps)) {
            inheritedTileProps[key] = val;
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
