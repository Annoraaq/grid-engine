import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { Direction, DirectionVectors } from "../Direction/Direction";

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

interface MovementConfig {
  delay: number;
  delayLeft: number;
  initialRow: number;
  initialCol: number;
  radius: number;
}

export class RandomMovement {
  private randomlyMovingCharacters: Map<string, MovementTuple>;
  constructor() {
    this.randomlyMovingCharacters = new Map();
  }

  addCharacter(
    character: GridCharacter,
    delay: number = 0,
    radius: number = -1
  ) {
    this.randomlyMovingCharacters.set(character.getId(), {
      character,
      config: {
        delay,
        delayLeft: delay,
        initialRow: character.getTilePos().y,
        initialCol: character.getTilePos().x,
        radius,
      },
    });
  }

  removeCharacter(character: GridCharacter) {
    this.randomlyMovingCharacters.delete(character.getId());
  }

  update(delta: number) {
    this.randomlyMovingCharacters.forEach(({ character, config }) => {
      config.delayLeft -= delta;
      if (config.delayLeft <= 0) {
        config.delayLeft = config.delay;
        character.move(this.getFreeRandomDirection(character));
      }
    });
  }

  private getFreeDirections(character: GridCharacter): Direction[] {
    const directions = [
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.LEFT,
    ];
    const unblocked = directions.filter(
      (dir) => !character.isBlockingDirection(dir)
    );
    const conf = this.randomlyMovingCharacters.get(character.getId()).config;
    if (conf.radius == -1) return unblocked;
    return unblocked.filter((dir) => {
      return (
        this.manhattenDist(
          character.getTilePos().add(DirectionVectors[dir]),
          new Phaser.Math.Vector2(conf.initialCol, conf.initialRow)
        ) <= conf.radius
      );
    });
  }

  private manhattenDist(pos1: Phaser.Math.Vector2, pos2: Phaser.Math.Vector2) {
    const xDist = Math.abs(pos1.x - pos2.x);
    const yDist = Math.abs(pos1.y - pos2.y);
    return xDist + yDist;
  }

  private getFreeRandomDirection(character: GridCharacter): Direction {
    const freeDirections = this.getFreeDirections(character);
    if (freeDirections.length == 0) return Direction.NONE;
    return freeDirections[this.getRandomInt(freeDirections.length)];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
