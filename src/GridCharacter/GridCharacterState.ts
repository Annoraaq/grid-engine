import { Direction } from "../Direction/Direction.js";
import { CollisionConfig } from "../GridEngineHeadless.js";
import { LayerPosition } from "../Position.js";
import { CharId } from "./GridCharacter.js";

export interface GridCharacterState {
  id: CharId;
  position: LayerPosition;
  facingDirection: Direction;
  speed: number;
  movementProgress: number;
  collisionConfig: CollisionConfig;
  labels: string[];
}
