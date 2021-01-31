import { GridTilemap } from "./../GridTilemap/GridTilemap";
import { VectorUtils } from "./../Utils/VectorUtils";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";
import { Bfs } from "../Algorithms/ShortestPath/Bfs/Bfs";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

interface MovementConfig {
  targetPos: Phaser.Math.Vector2;
  distance: number;
  closestPointIfBlocked: boolean;
}

export class TargetMovement {
  private characters: Map<string, MovementTuple>;
  constructor(private tilemap: GridTilemap) {
    this.characters = new Map();
  }

  addCharacter(
    character: GridCharacter,
    targetPos: Phaser.Math.Vector2,
    distance: number = 0,
    closestPointIfBlocked: boolean = false
  ) {
    this.characters.set(character.getId(), {
      character,
      config: { targetPos, distance, closestPointIfBlocked },
    });
  }

  removeCharacter(charId: string) {
    this.characters.delete(charId);
  }

  update() {
    this.getStandingCharacters().forEach(({ character, config }) => {
      const { dir, dist } = this.getDirOnShortestPath(character, config);
      if (this.noPathExists(dist)) {
        character.move(Direction.NONE);
      } else if (dist <= config.distance) {
        this.characters.delete(character.getId());
      } else {
        character.move(dir);
      }
    });
  }

  isBlocking = (targetPos: Vector2): ((pos: Vector2) => boolean) => {
    return (pos: Vector2) => {
      if (VectorUtils.equal(pos, targetPos)) return false;
      return this.tilemap.isBlocking(pos);
    };
  };

  clear() {
    this.characters.clear();
  }

  private noPathExists(distance: number): boolean {
    return distance == -1;
  }

  private getShortestPath(
    character: GridCharacter,
    config: MovementConfig
  ): { path: Vector2[]; distOffset: number } {
    const { path: shortestPath, closestToTarget } = Bfs.getShortestPath(
      character.getTilePos(),
      config.targetPos,
      this.isBlocking(config.targetPos)
    );

    const noPathFound = shortestPath.length == 0;

    if (noPathFound && config.closestPointIfBlocked) {
      const shortestPathToClosestPoint = Bfs.getShortestPath(
        character.getTilePos(),
        closestToTarget,
        this.isBlocking(config.targetPos)
      ).path;
      const distOffset = VectorUtils.manhattanDistance(
        closestToTarget,
        config.targetPos
      );
      return { path: shortestPathToClosestPoint, distOffset };
    }

    return { path: shortestPath, distOffset: 0 };
  }

  private getDirOnShortestPath(
    character: GridCharacter,
    config: MovementConfig
  ): { dir: Direction; dist: number } {
    const { path: shortestPath, distOffset } = this.getShortestPath(
      character,
      config
    );
    if (shortestPath.length == 0) return { dir: Direction.NONE, dist: -1 };
    if (shortestPath.length == 1) return { dir: Direction.NONE, dist: 0 };

    const nextField = shortestPath[1];
    const result = {
      dir: undefined,
      dist: shortestPath.length - 1 + distOffset,
    };
    if (nextField.x > character.getTilePos().x) {
      result.dir = Direction.RIGHT;
    } else if (nextField.x < character.getTilePos().x) {
      result.dir = Direction.LEFT;
    } else if (nextField.y < character.getTilePos().y) {
      result.dir = Direction.UP;
    } else if (nextField.y > character.getTilePos().y) {
      result.dir = Direction.DOWN;
    }
    return result;
  }

  private getStandingCharacters(): MovementTuple[] {
    return [...this.characters.values()].filter(
      (tuple) => !tuple.character.isMoving()
    );
  }
}
