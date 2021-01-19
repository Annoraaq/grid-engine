import { GridTilemap } from "../GridTilemap/GridTilemap";
import { VectorUtils } from "../Utils/VectorUtils";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../Direction/Direction";
import { Bfs } from "../Algorithms/ShortestPath/Bfs/Bfs";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

interface MovementTuple {
  character: GridCharacter;
  charToFollow: GridCharacter;
}

export class FollowMovement {
  addCharacter(character: GridCharacter, charToFollow: GridCharacter) {}

  removeCharacter(charId: string) {}

  update() {}
}
