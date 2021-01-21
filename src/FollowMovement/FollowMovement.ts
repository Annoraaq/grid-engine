import { TargetMovement } from "./../TargetMovement/TargetMovement";
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
  private targetMovement: TargetMovement;
  private characters: Map<string, MovementTuple>;

  constructor(gridTilemap: GridTilemap) {
    this.characters = new Map();
    this.targetMovement = new TargetMovement(gridTilemap);
  }
  addCharacter(character: GridCharacter, charToFollow: GridCharacter) {
    this.characters.set(character.getId(), {
      character,
      charToFollow,
    });
  }

  removeCharacter(charId: string) {
    this.characters.delete(charId);
  }

  update() {
    this.characters.forEach(({ character, charToFollow }) => {
      this.targetMovement.addCharacter(character, charToFollow.getTilePos());
    });
    this.targetMovement.update();
  }
}
