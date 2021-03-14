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
    distance = 0,
    closestPointIfBlocked = false
  ): void {
    this.characters.set(character.getId(), {
      character,
      config: {
        charToFollow,
        distance,
        closestPointIfBlocked,
      },
    });
  }

  removeCharacter(charId: string): void {
    this.characters.delete(charId);
  }

  update(): void {
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
