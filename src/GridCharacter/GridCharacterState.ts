import { Direction } from "../Direction/Direction";
import { CollisionConfig } from "../GridEngineHeadless";
import { LayerPosition } from "../IGridEngine";
import { CharId } from "./GridCharacter";

export interface GridCharacterState {
  id: CharId;
  position: LayerPosition;
  facingDirection: Direction;
  speed: number;
  movementProgress: number;
  collisionConfig: CollisionConfig;
  labels: string[];
}
