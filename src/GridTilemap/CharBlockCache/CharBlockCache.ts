import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { Subscription } from "rxjs";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Position } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";

export class CharBlockCache {
  private tilePosToCharacters: Map<string, Set<GridCharacter>> = new Map();
  private positionChangedSubs: Map<string, Subscription> = new Map();
  private positionChangeFinishedSubs: Map<string, Subscription> = new Map();

  isCharBlockingAt(pos: Vector2): boolean {
    const posStr = this.posToString(pos);
    return (
      this.tilePosToCharacters.has(posStr) &&
      this.tilePosToCharacters.get(posStr).size > 0
    );
  }

  addCharacter(character: GridCharacter): void {
    this.add(this.posToString(character.getTilePos()), character);
    this.add(this.posToString(character.getNextTilePos()), character);
    this.addPositionChangeSub(character);
    this.addPositionChangeFinishedSub(character);
  }

  removeCharacter(character: GridCharacter): void {
    const charId = character.getId();
    this.positionChangedSubs.get(charId).unsubscribe();
    this.positionChangeFinishedSubs.get(charId).unsubscribe();
    this.tilePosToCharacters
      .get(this.posToString(character.getTilePos()))
      .delete(character);
    this.tilePosToCharacters
      .get(this.posToString(character.getNextTilePos()))
      .delete(character);
  }

  private add(pos: string, character: GridCharacter): void {
    if (!this.tilePosToCharacters.has(pos)) {
      this.tilePosToCharacters.set(pos, new Set());
    }
    this.tilePosToCharacters.get(pos).add(character);
  }

  private addPositionChangeSub(character: GridCharacter) {
    const positionChangedSub = character
      .positionChanged()
      .subscribe((positionChange) => {
        if (
          GlobalConfig.get().characterCollisionStrategy ===
          CollisionStrategy.BLOCK_ONE_TILE_AHEAD
        ) {
          this.tilePosToCharacters
            .get(this.posToString(positionChange.exitTile))
            .delete(character);
        }
        this.add(this.posToString(positionChange.enterTile), character);
      });
    this.positionChangedSubs.set(character.getId(), positionChangedSub);
  }

  private addPositionChangeFinishedSub(character: GridCharacter) {
    const positionChangeFinishedSub = character
      .positionChangeFinished()
      .subscribe((positionChange) => {
        this.tilePosToCharacters
          .get(this.posToString(positionChange.exitTile))
          .delete(character);
      });
    this.positionChangeFinishedSubs.set(
      character.getId(),
      positionChangeFinishedSub
    );
  }

  private posToString(pos: Position): string {
    return `${pos.x}#${pos.y}`;
  }
}
