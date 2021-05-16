import { takeUntil } from "rxjs/operators";
import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Movement } from "../Movement";
import { NoPathFoundStrategy } from "../../Algorithms/ShortestPath/NoPathFoundStrategy";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { Position } from "../../GridEngine";

export class FollowMovement implements Movement {
  private character: GridCharacter;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;
  private targetMovement: TargetMovement;

  constructor(
    private gridTilemap: GridTilemap,
    private charToFollow: GridCharacter,
    private distance = 0,
    private noPathFoundStrategy: NoPathFoundStrategy = NoPathFoundStrategy.STOP
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

  private updateTarget(targetPos: Position): void {
    this.targetMovement = new TargetMovement(
      this.gridTilemap,
      new Vector2(targetPos),
      this.distance + 1,
      { noPathFoundStrategy: this.noPathFoundStrategy }
    );
    this.targetMovement.setNumberOfDirections(this.numberOfDirections);
    this.targetMovement.setCharacter(this.character);
  }
}
