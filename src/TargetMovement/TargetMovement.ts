import { CharacterData } from "./../GridMovementPlugin.d";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";
// import { Direction, DirectionVectors } from "../Direction/Direction";

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

interface MovementConfig {
  targetPos: Phaser.Math.Vector2;
}

export class TargetMovement {
  private characters: Map<string, MovementTuple>;
  constructor() {
    this.characters = new Map();
  }

  addCharacter(character: GridCharacter, targetPos: Phaser.Math.Vector2) {
    this.characters.set(character.getId(), {
      character,
      config: { targetPos },
    });
  }

  // removeCharacter(character: GridCharacter) {
  //   this.randomlyMovingCharacters.delete(character.getId());
  // }

  update() {
    this.getStandingCharacters().forEach(({ character, config }) => {
      if (
        this.vec2str(character.getTilePos()) == this.vec2str(config.targetPos)
      ) {
        this.characters.delete(character.getId());
      } else {
        const dir = this.getDirOnShortestPath(character, config.targetPos);
        character.move(dir);
      }
    });

    // this.getStandingCharacters().forEach(({ character, config }) => {
    //   if (this.shouldContinueWalkingCurrentDirection(character, config)) {
    //     config.stepsWalked++;
    //     character.move(config.currentMovementDirection);
    //   } else {
    //     config.delayLeft -= delta;
    //     if (config.delayLeft <= 0) {
    //       config.delayLeft = config.delay;
    //       const dir = this.getFreeRandomDirection(character);
    //       character.move(dir);
    //       config.currentMovementDirection = dir;
    //       config.stepsWalked = 1;
    //       config.stepSize = this.getRandomInt(config.radius) + 1;
    //     }
    //   }
    // });
  }

  private getDirOnShortestPath(
    character: GridCharacter,
    targetPos: Phaser.Math.Vector2
  ): Direction {
    const nextField = this.getShortestPath(character, targetPos)[0];
    if (nextField.x > character.getTilePos().x) {
      return Direction.RIGHT;
    } else if (nextField.x < character.getTilePos().x) {
      return Direction.LEFT;
    } else if (nextField.y < character.getTilePos().y) {
      return Direction.UP;
    } else if (nextField.y > character.getTilePos().y) {
      return Direction.DOWN;
    }
    return Direction.NONE;
  }

  private vec2str(vec: Phaser.Math.Vector2) {
    return `${vec.x}#${vec.y}`;
  }

  private getShortestPath(
    character: GridCharacter,
    targetPos: Phaser.Math.Vector2
  ) {
    const returnPath = (previous, startNode, stopNode) => {
      const ret = [];
      let currentNode = stopNode;
      ret.push(currentNode);
      while (vec2str(currentNode) != vec2str(startNode)) {
        currentNode = previous.get(vec2str(currentNode));
        ret.push(currentNode);
      }
      return ret;
    };

    const vec2str = (vec: Phaser.Math.Vector2) => {
      return `${vec.x}#${vec.y}`;
    };

    const getNeighbours = (pos: Phaser.Math.Vector2) => {
      return [
        new Phaser.Math.Vector2(pos.x, pos.y + 1),
        new Phaser.Math.Vector2(pos.x + 1, pos.y),
        new Phaser.Math.Vector2(pos.x - 1, pos.y),
        new Phaser.Math.Vector2(pos.x, pos.y - 1),
      ];
    };

    const shortestPathBfs = (startNode, stopNode) => {
      const previous = new Map();
      const visited = new Set();
      const queue = [];
      queue.push({ node: startNode, dist: 0 });
      visited.add(startNode.toString());

      while (queue.length > 0) {
        const { node, dist } = queue.shift();
        if (vec2str(node) === vec2str(stopNode)) {
          return { shortestDistande: dist, previous };
        }

        for (let neighbour of getNeighbours(node)) {
          if (!visited.has(vec2str(neighbour))) {
            previous.set(vec2str(neighbour), node);
            queue.push({ node: neighbour, dist: dist + 1 });
            visited.add(vec2str(neighbour));
          }
        }
      }
      return { shortestDistance: -1, previous };
    };

    return returnPath(
      shortestPathBfs(character.getTilePos(), targetPos).previous,
      character.getTilePos(),
      targetPos
    );
  }

  // private shouldContinueWalkingCurrentDirection(
  //   character: GridCharacter,
  //   config: MovementConfig
  // ): boolean {
  //   return (
  //     config.stepsWalked < config.stepSize &&
  //     config.currentMovementDirection !== Direction.NONE &&
  //     !character.isBlockingDirection(config.currentMovementDirection) &&
  //     this.isWithinRadius(config.currentMovementDirection, character, config)
  //   );
  // }

  private getStandingCharacters(): MovementTuple[] {
    return [...this.characters.values()].filter(
      (tuple) => !tuple.character.isMoving()
    );
  }

  // private getFreeDirections(character: GridCharacter): Direction[] {
  //   const directions = [
  //     Direction.UP,
  //     Direction.RIGHT,
  //     Direction.DOWN,
  //     Direction.LEFT,
  //   ];
  //   const conf = this.randomlyMovingCharacters.get(character.getId()).config;

  //   const unblocked = directions.filter(
  //     (dir) => !character.isBlockingDirection(dir)
  //   );

  //   return unblocked.filter((dir) => this.isWithinRadius(dir, character, conf));
  // }

  // private isWithinRadius(
  //   dir: Direction,
  //   character: GridCharacter,
  //   conf: MovementConfig
  // ) {
  //   if (conf.radius == -1) return true;
  //   const dist = this.manhattenDist(
  //     character.getTilePos().add(DirectionVectors[dir]),
  //     new Phaser.Math.Vector2(conf.initialCol, conf.initialRow)
  //   );

  //   return dist <= conf.radius;
  // }

  // private manhattenDist(pos1: Phaser.Math.Vector2, pos2: Phaser.Math.Vector2) {
  //   const xDist = Math.abs(pos1.x - pos2.x);
  //   const yDist = Math.abs(pos1.y - pos2.y);
  //   return xDist + yDist;
  // }

  // private getFreeRandomDirection(character: GridCharacter): Direction {
  //   const freeDirections = this.getFreeDirections(character);
  //   if (freeDirections.length == 0) return Direction.NONE;
  //   return freeDirections[this.getRandomInt(freeDirections.length)];
  // }

  // private getRandomInt(max: number): number {
  //   return Math.floor(Math.random() * Math.floor(max));
  // }
}
