import { Direction } from "../Direction/Direction";
import { CollisionConfig } from "../GridEngineHeadless";
import { LayerPosition } from "../Position.js";
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
