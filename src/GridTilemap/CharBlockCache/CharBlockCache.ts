import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { Subscription } from "rxjs";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Position } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";

export class CharBlockCache {
  private tilePosToCharacters: Map<string, Set<GridCharacter>> = new Map();
  private positionChangeStartedSubs: Map<string, Subscription> = new Map();
  private tilePosSetSubs: Map<string, Subscription> = new Map();
  private positionChangeFinishedSubs: Map<string, Subscription> = new Map();

  isCharBlockingAt(
    pos: Vector2,
    layer: string,
    collisionGroups: string[]
  ): boolean {
    const posStr = this.posToString(pos, layer);
    return (
      this.tilePosToCharacters.has(posStr) &&
      this.tilePosToCharacters.get(posStr).size > 0 &&
      [...this.tilePosToCharacters.get(posStr)].some((char: GridCharacter) =>
        char
          .getCollisionGroups()
          .some((group) => collisionGroups.includes(group))
      )
    );
  }

  getCharactersAt(
    pos: Vector2,
    layer: string
  ): Set<GridCharacter> {
    const posStr = this.posToString(pos, layer);
    const characters = this.tilePosToCharacters.get(posStr);
    return new Set(characters);
  }

  addCharacter(character: GridCharacter): void {
    this.add(
      this.posToString(
        character.getTilePos().position,
        character.getTilePos().layer
      ),
      character
    );
    this.add(
      this.posToString(
        character.getNextTilePos().position,
        character.getNextTilePos().layer
      ),
      character
    );
    this.addPositionChangeSub(character);
    this.addPositionChangeFinishedSub(character);
    this.addTilePosSetSub(character);
  }

  removeCharacter(character: GridCharacter): void {
    const charId = character.getId();
    this.positionChangeStartedSubs.get(charId).unsubscribe();
    this.positionChangeFinishedSubs.get(charId).unsubscribe();
    this.tilePosSetSubs.get(charId).unsubscribe();
    this.tilePosToCharacters
      .get(
        this.posToString(
          character.getTilePos().position,
          character.getTilePos().layer
        )
      )
      .delete(character);
    this.tilePosToCharacters
      .get(
        this.posToString(
          character.getNextTilePos().position,
          character.getNextTilePos().layer
        )
      )
      .delete(character);
  }

  private add(pos: string, character: GridCharacter): void {
    if (!this.tilePosToCharacters.has(pos)) {
      this.tilePosToCharacters.set(pos, new Set());
    }
    this.tilePosToCharacters.get(pos).add(character);
  }

  private addTilePosSetSub(character: GridCharacter) {
    const tilePosSetSub = character
      .tilePositionSet()
      .subscribe((_layerPosition) => {
        this.tilePosToCharacters
          .get(
            this.posToString(
              character.getNextTilePos().position,
              character.getNextTilePos().layer
            )
          )
          .delete(character);
      });
    this.tilePosSetSubs.set(character.getId(), tilePosSetSub);
  }

  private addPositionChangeSub(character: GridCharacter) {
    const positionChangeStartedSub = character
      .positionChangeStarted()
      .subscribe((positionChange) => {
        if (
          GlobalConfig.get().characterCollisionStrategy ===
          CollisionStrategy.BLOCK_ONE_TILE_AHEAD
        ) {
          this.tilePosToCharacters
            .get(
              this.posToString(
                positionChange.exitTile,
                positionChange.exitLayer
              )
            )
            .delete(character);
        }
        this.add(
          this.posToString(positionChange.enterTile, positionChange.enterLayer),
          character
        );
      });
    this.positionChangeStartedSubs.set(
      character.getId(),
      positionChangeStartedSub
    );
  }

  private addPositionChangeFinishedSub(character: GridCharacter) {
    const positionChangeFinishedSub = character
      .positionChangeFinished()
      .subscribe((positionChange) => {
        this.tilePosToCharacters
          .get(
            this.posToString(positionChange.exitTile, positionChange.exitLayer)
          )
          .delete(character);
      });
    this.positionChangeFinishedSubs.set(
      character.getId(),
      positionChangeFinishedSub
    );
  }

  private posToString(pos: Position, layer: string): string {
    return `${pos.x}#${pos.y}#${layer}`;
  }
}
