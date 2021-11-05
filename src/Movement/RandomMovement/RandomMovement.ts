import { RandomUtils } from "./../../Utils/RandomUtils/RandomUtils";
import { DistanceUtilsFactory } from "./../../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { DistanceUtils } from "./../../Utils/DistanceUtils";
import { NumberOfDirections } from "./../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Direction, directionVector } from "../../Direction/Direction";
import { Movement } from "../Movement";
import { takeUntil } from "rxjs/operators";
import { Vector2 } from "../../Utils/Vector2/Vector2";

export class RandomMovement implements Movement {
  private delayLeft: number;
  private initialRow: number;
  private initialCol: number;
  private stepSize: number;
  private stepsWalked: number;
  private currentMovementDirection: Direction;
  private distanceUtils: DistanceUtils;

  constructor(
    private character: GridCharacter,
    numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR,
    private delay = 0,
    private radius = -1
  ) {
    this.delayLeft = this.delay;
    this.initialRow = character.getNextTilePos().position.y;
    this.initialCol = character.getNextTilePos().position.x;
    this.randomizeStepSize();
    this.stepsWalked = 0;
    this.currentMovementDirection = Direction.NONE;
    this.character
      .positionChangeStarted()
      .pipe(takeUntil(this.character.autoMovementSet()))
      .subscribe(() => {
        this.stepsWalked++;
      });
    this.distanceUtils = DistanceUtilsFactory.create(numberOfDirections);
  }

  update(delta: number): void {
    if (this.shouldContinueWalkingCurrentDirection()) {
      this.character.move(this.currentMovementDirection);
    } else {
      this.delayLeft -= delta;
      if (this.delayLeft <= 0) {
        this.delayLeft = this.delay;
        const dir = this.getFreeRandomDirection();
        this.stepsWalked = 0;
        this.character.move(dir);
        this.currentMovementDirection = dir;
        this.randomizeStepSize();
      }
    }
  }

  private shouldContinueWalkingCurrentDirection(): boolean {
    return (
      this.stepsWalked < this.stepSize &&
      this.currentMovementDirection !== Direction.NONE &&
      !this.character.isBlockingDirection(this.currentMovementDirection) &&
      this.isWithinRadius(this.currentMovementDirection)
    );
  }

  private getFreeDirections(): Direction[] {
    const unblocked = this.distanceUtils
      .getDirections()
      .filter((dir) => !this.character.isBlockingDirection(dir));

    return unblocked.filter((dir) => this.isWithinRadius(dir));
  }

  private isWithinRadius(dir: Direction) {
    if (this.radius == -1) return true;

    return this.getDist(dir) <= this.radius;
  }

  private getDist(dir: Direction): number {
    return this.distanceUtils.distance(
      this.character.getNextTilePos().position.add(directionVector(dir)),
      new Vector2(this.initialCol, this.initialRow)
    );
  }

  private getFreeRandomDirection(): Direction {
    const freeDirections = this.getFreeDirections();
    if (freeDirections.length == 0) return Direction.NONE;
    return freeDirections[RandomUtils.getRandomInt(freeDirections.length)];
  }

  private randomizeStepSize(): void {
    this.stepSize = RandomUtils.getRandomInt(this.radius) + 1;
  }
}
