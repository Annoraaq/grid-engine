import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Movement } from "../Movement";

export class FollowMovement implements Movement {
  private character: GridCharacter;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;

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
  }

  update(): void {
    const targetMovement = new TargetMovement(
      this.gridTilemap,
      this.charToFollow.getTilePos(),
      this.distance + 1,
      this.closestPointIfBlocked
    );
    targetMovement.setNumberOfDirections(this.numberOfDirections);
    targetMovement.setCharacter(this.character);
    targetMovement.update();
  }
}
