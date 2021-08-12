import { DistanceUtils } from "./../../Utils/DistanceUtils";
import { getDirections, NumberOfDirections } from "./../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Direction, directionVector } from "../../Direction/Direction";
import { Movement } from "../Movement";
import { takeUntil } from "rxjs/operators";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { DistanceUtils8 } from "../../Utils/DistanceUtils8/DistanceUtils8";
import { DistanceUtils4 } from "../../Utils/DistanceUtils4/DistanceUtils4";

export class RandomMovement implements Movement {
  private character: GridCharacter;
  private delayLeft: number;
  private initialRow: number;
  private initialCol: number;
  private stepSize: number;
  private stepsWalked: number;
  private currentMovementDirection: Direction;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;
  private distanceUtils: DistanceUtils = new DistanceUtils4();

  constructor(private delay = 0, private radius = -1) {}

  setNumberOfDirections(numberOfDirections: NumberOfDirections): void {
    this.numberOfDirections = numberOfDirections;
    if (numberOfDirections === NumberOfDirections.EIGHT) {
      this.distanceUtils = new DistanceUtils8();
    } else {
      this.distanceUtils = new DistanceUtils4();
    }
  }

  setCharacter(character: GridCharacter): void {
    this.character = character;
    this.delayLeft = this.delay;
    this.initialRow = character.getNextTilePos().y;
    this.initialCol = character.getNextTilePos().x;
    this.stepSize = this.getRandomInt(this.radius) + 1;
    this.stepsWalked = 0;
    this.currentMovementDirection = Direction.NONE;
    this.character
      .positionChangeStarted()
      .pipe(takeUntil(this.character.autoMovementSet()))
      .subscribe(() => {
        this.stepsWalked++;
      });
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
        this.stepSize = this.getRandomInt(this.radius) + 1;
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
    const unblocked = getDirections(this.numberOfDirections).filter(
      (dir) => !this.character.isBlockingDirection(dir)
    );

    return unblocked.filter((dir) => this.isWithinRadius(dir));
  }

  private isWithinRadius(dir: Direction) {
    if (this.radius == -1) return true;

    return this.getDist(dir) <= this.radius;
  }

  private getDist(dir: Direction): number {
    return this.distanceUtils.distance(
      this.character.getNextTilePos().add(directionVector(dir)),
      new Vector2(this.initialCol, this.initialRow)
    );
  }

  private getFreeRandomDirection(): Direction {
    const freeDirections = this.getFreeDirections();
    if (freeDirections.length == 0) return Direction.NONE;
    return freeDirections[this.getRandomInt(freeDirections.length)];
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
