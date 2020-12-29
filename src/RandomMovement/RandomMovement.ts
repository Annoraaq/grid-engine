import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { Direction } from "../Direction/Direction";

interface MovementConfig {
  delay: number;
  delayLeft: number;
}

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

export class RandomMovement {
  private randomlyMovingCharacters: Map<string, MovementTuple>;
  constructor() {
    this.randomlyMovingCharacters = new Map();
  }

  addCharacter(character: GridCharacter, delay: number = 0) {
    this.randomlyMovingCharacters.set(character.getId(), {
      character,
      config: { delay, delayLeft: delay },
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
      Direction.NONE,
    ];
    return directions.filter((dir) => !character.isBlockingDirection(dir));
  }

  private getFreeRandomDirection(character: GridCharacter): Direction {
    const freeDirections = this.getFreeDirections(character);
    return freeDirections[this.getRandomInt(freeDirections.length)];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
