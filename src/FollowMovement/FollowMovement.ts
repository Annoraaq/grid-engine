import { TargetMovement } from "./../TargetMovement/TargetMovement";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import * as Phaser from "phaser";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

interface MovementConfig {
  charToFollow: GridCharacter;
  distance: number;
}

export class FollowMovement {
  private targetMovement: TargetMovement;
  private characters: Map<string, MovementTuple>;

  constructor(gridTilemap: GridTilemap) {
    this.characters = new Map();
    this.targetMovement = new TargetMovement(gridTilemap);
  }

  addCharacter(
    character: GridCharacter,
    charToFollow: GridCharacter,
    distance: number = 0
  ) {
    this.characters.set(character.getId(), {
      character,
      config: {
        charToFollow,
        distance,
      },
    });
  }

  removeCharacter(charId: string) {
    this.characters.delete(charId);
  }

  update() {
    this.targetMovement.clear();
    this.characters.forEach(({ character, config }) => {
      const { charToFollow, distance } = config;
      this.targetMovement.addCharacter(
        character,
        charToFollow.getTilePos(),
        distance
      );
    });
    this.targetMovement.update();
  }
}
