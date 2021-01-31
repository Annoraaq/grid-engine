import { TargetMovement } from "./../TargetMovement/TargetMovement";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { GridCharacter } from "../GridCharacter/GridCharacter";

interface MovementTuple {
  character: GridCharacter;
  config: MovementConfig;
}

interface MovementConfig {
  charToFollow: GridCharacter;
  distance: number;
  closestPointIfBlocked: boolean;
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
    distance: number = 0,
    closestPointIfBlocked: boolean = false
  ) {
    this.characters.set(character.getId(), {
      character,
      config: {
        charToFollow,
        distance,
        closestPointIfBlocked,
      },
    });
  }

  removeCharacter(charId: string) {
    this.characters.delete(charId);
  }

  update() {
    this.targetMovement.clear();
    this.characters.forEach(({ character, config }) => {
      const { charToFollow, distance, closestPointIfBlocked } = config;
      this.targetMovement.addCharacter(
        character,
        charToFollow.getTilePos(),
        distance + 1,
        closestPointIfBlocked
      );
    });
    this.targetMovement.update();
  }
}
