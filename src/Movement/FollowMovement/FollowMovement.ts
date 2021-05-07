import { takeUntil } from "rxjs/operators";
import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Movement } from "../Movement";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

export class FollowMovement implements Movement {
  private character: GridCharacter;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;
  private targetMovement: TargetMovement;

  constructor(
    private gridTilemap: GridTilemap,
    private charToFollow: GridCharacter,
    private distance = 0,
    private closestPointIfBlocked = false
  ) {}

  setNumberOfDirections(numberOfDirections: NumberOfDirections): void {
    this.numberOfDirections = numberOfDirections;
  }

  setCharacter(character: GridCharacter): void {
    this.character = character;
    this.updateTarget(this.charToFollow.getTilePos());
    this.charToFollow
      .positionChanged()
      .pipe(takeUntil(this.character.autoMovementSet()))
      .subscribe(({ enterTile }) => {
        this.updateTarget(enterTile);
      });
  }

  update(): void {
    this.targetMovement?.update();
  }

  private updateTarget(targetPos: Vector2): void {
    this.targetMovement = new TargetMovement(
      this.gridTilemap,
      targetPos,
      this.distance + 1,
      this.closestPointIfBlocked
    );
    this.targetMovement.setNumberOfDirections(this.numberOfDirections);
    this.targetMovement.setCharacter(this.character);
  }
}
