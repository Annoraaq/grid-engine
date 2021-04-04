import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Movement } from "../Movement";

interface MovementConfig {
  charToFollow: GridCharacter;
  distance: number;
  closestPointIfBlocked: boolean;
}

export class FollowMovement implements Movement {
  private character: GridCharacter;
  private config: MovementConfig;

  constructor(
    private gridTilemap: GridTilemap,
    private charToFollow: GridCharacter,
    private distance = 0,
    private closestPointIfBlocked = false
  ) {}

  setCharacter(character: GridCharacter): void {
    this.character = character;
    this.config = {
      charToFollow: this.charToFollow,
      distance: this.distance,
      closestPointIfBlocked: this.closestPointIfBlocked,
    };
  }

  update(): void {
    const { charToFollow, distance, closestPointIfBlocked } = this.config;
    const targetMovement = new TargetMovement(
      this.gridTilemap,
      charToFollow.getTilePos(),
      distance + 1,
      closestPointIfBlocked
    );
    targetMovement.setCharacter(this.character);
    targetMovement.update();
  }
}
