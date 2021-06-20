import { Subscription } from "rxjs";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Position } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";

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
    if (
      !this.tilePosToCharacters.has(this.posToString(character.getTilePos()))
    ) {
      this.tilePosToCharacters.set(
        this.posToString(character.getTilePos()),
        new Set()
      );
    }
    this.tilePosToCharacters
      .get(this.posToString(character.getTilePos()))
      .add(character);
    if (
      !this.tilePosToCharacters.has(
        this.posToString(character.getNextTilePos())
      )
    ) {
      this.tilePosToCharacters.set(
        this.posToString(character.getNextTilePos()),
        new Set()
      );
    }
    this.tilePosToCharacters
      .get(this.posToString(character.getNextTilePos()))
      .add(character);
    const sub = character.positionChanged().subscribe((positionChange) => {
      if (
        !this.tilePosToCharacters.has(
          this.posToString(positionChange.enterTile)
        )
      ) {
        this.tilePosToCharacters.set(
          this.posToString(positionChange.enterTile),
          new Set()
        );
      }
      this.tilePosToCharacters
        .get(this.posToString(positionChange.enterTile))
        .add(character);
    });
    const sub2 = character
      .positionChangeFinished()
      .subscribe((positionChange) => {
        this.tilePosToCharacters
          .get(this.posToString(positionChange.exitTile))
          .delete(character);
      });
    this.positionChangedSubs.set(character.getId(), sub);
    this.positionChangeFinishedSubs.set(character.getId(), sub2);
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

  private posToString(pos: Position): string {
    return `${pos.x}#${pos.y}`;
  }
}
