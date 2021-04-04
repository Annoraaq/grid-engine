import { VectorUtils } from "./../Utils/VectorUtils";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { Direction, DirectionVectors } from "../Direction/Direction";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

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
  private movementTuple: MovementTuple = {
    character: undefined,
    config: undefined,
  };
  constructor(private delay = 0, private radius = -1) {}

  setCharacter(character: GridCharacter): void {
    this.movementTuple.character = character;
    this.movementTuple.config = {
      delay: this.delay,
      delayLeft: this.delay,
      initialRow: character.getTilePos().y,
      initialCol: character.getTilePos().x,
      radius: this.radius,
      stepSize: this.getRandomInt(this.radius) + 1,
      stepsWalked: 0,
      currentMovementDirection: Direction.NONE,
    };
  }

  update(delta: number): void {
    if (
      this.shouldContinueWalkingCurrentDirection(
        this.movementTuple.character,
        this.movementTuple.config
      )
    ) {
      this.movementTuple.config.stepsWalked++;
      this.movementTuple.character.move(
        this.movementTuple.config.currentMovementDirection
      );
    } else {
      this.movementTuple.config.delayLeft -= delta;
      if (this.movementTuple.config.delayLeft <= 0) {
        this.movementTuple.config.delayLeft = this.movementTuple.config.delay;
        const dir = this.getFreeRandomDirection(this.movementTuple.character);
        this.movementTuple.character.move(dir);
        this.movementTuple.config.currentMovementDirection = dir;
        this.movementTuple.config.stepsWalked = 1;
        this.movementTuple.config.stepSize =
          this.getRandomInt(this.movementTuple.config.radius) + 1;
      }
    }
  }

  private shouldContinueWalkingCurrentDirection(
    character: GridCharacter,
    config: MovementConfig
  ): boolean {
    return (
      config.stepsWalked < config.stepSize &&
      config.currentMovementDirection !== Direction.NONE &&
      !character.isBlockingDirection(config.currentMovementDirection) &&
      this.isWithinRadius(config.currentMovementDirection, character, config)
    );
  }

  private getFreeDirections(character: GridCharacter): Direction[] {
    const directions = [
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.LEFT,
    ];
    const conf = this.movementTuple.config;

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
    const dist = VectorUtils.manhattanDistance(
      character.getTilePos().add(DirectionVectors[dir]),
      new Vector2(conf.initialCol, conf.initialRow)
    );

    return dist <= conf.radius;
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
