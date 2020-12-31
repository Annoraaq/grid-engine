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
  stepSize: number;
  stepsWalked: number;
  currentMovementDirection: Direction;
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
        stepSize: this.getRandomInt(radius) + 1,
        stepsWalked: 0,
        currentMovementDirection: Direction.NONE,
      },
    });
  }

  removeCharacter(character: GridCharacter) {
    this.randomlyMovingCharacters.delete(character.getId());
  }

  update(delta: number) {
    this.getStandingCharacters().forEach(({ character, config }) => {
      if (
        config.stepsWalked < config.stepSize &&
        config.currentMovementDirection !== Direction.NONE &&
        !character.isBlockingDirection(config.currentMovementDirection) &&
        this.isWithinRadius(config.currentMovementDirection, character, config)
      ) {
        config.stepsWalked++;
        character.move(config.currentMovementDirection);
        return;
      }

      config.delayLeft -= delta;
      if (config.delayLeft <= 0) {
        config.delayLeft = config.delay;
        const dir = this.getFreeRandomDirection(character);
        character.move(dir);
        config.currentMovementDirection = dir;
        config.stepsWalked = 1;
        config.stepSize = this.getRandomInt(config.radius) + 1;
      }
    });
  }

  private getStandingCharacters(): MovementTuple[] {
    return [...this.randomlyMovingCharacters.values()].filter(
      (tuple) => !tuple.character.isMoving()
    );
  }

  private getFreeDirections(character: GridCharacter): Direction[] {
    const directions = [
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.LEFT,
    ];
    const conf = this.randomlyMovingCharacters.get(character.getId()).config;

    const unblocked = directions.filter(
      (dir) => !character.isBlockingDirection(dir)
    );

    return unblocked.filter((dir) => this.isWithinRadius(dir, character, conf));
  }

  private isWithinRadius(
    dir: Direction,
    character: GridCharacter,
    conf: MovementConfig
  ) {
    if (conf.radius == -1) return true;
    const dist = this.manhattenDist(
      character.getTilePos().add(DirectionVectors[dir]),
      new Phaser.Math.Vector2(conf.initialCol, conf.initialRow)
    );

    return dist <= conf.radius;
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
