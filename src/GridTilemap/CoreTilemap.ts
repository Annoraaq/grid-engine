import { Direction } from "../Direction/Direction";
import { Vector2 } from "../Utils/Vector2/Vector2";

/**
 * This interface is for decoupling elements of the tilemap that are relevant
 * for GridEngine from those, which are only relevant for phaser tilemaps.
 */
export interface CoreTilemap {
  getTransition(pos: Vector2, fromLayer?: string): string | undefined;

  hasBlockingTile(
    charLayer: string | undefined,
    pos: Vector2,
    direction?: Direction
  ): boolean;

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[]
  ): boolean;

  toMapDirection(direction: Direction): Direction;
}
