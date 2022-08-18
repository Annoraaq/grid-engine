import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { Subscription } from "rxjs";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Position } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";
import { LayerName } from "../GridTilemap";
import { LayerPosition } from "../../Pathfinding/ShortestPathAlgorithm";

export class CharBlockCache {
  private tilePosToCharacters: Map<string, Set<GridCharacter>> = new Map();
  private positionChangeStartedSubs: Map<string, Subscription> = new Map();
  private tilePosSetSubs: Map<string, Subscription> = new Map();
  private positionChangeFinishedSubs: Map<string, Subscription> = new Map();

  isCharBlockingAt(
    pos: Vector2,
    layer: LayerName,
    collisionGroups: string[]
  ): boolean {
    const posStr = this.posToString(pos, layer);
    const charSet = this.tilePosToCharacters.get(posStr);
    return !!(
      charSet &&
      charSet.size > 0 &&
      [...charSet].some((char: GridCharacter) =>
        char
          .getCollisionGroups()
          .some((group) => collisionGroups.includes(group))
      )
    );
  }

  getCharactersAt(pos: Vector2, layer: string): Set<GridCharacter> {
    const posStr = this.posToString(pos, layer);
    const characters = this.tilePosToCharacters.get(posStr);
    return new Set(characters);
  }

  private addTilePositions(pos: LayerPosition, character: GridCharacter): void {
    const tilePos = pos.position;
    for (let x = tilePos.x; x < tilePos.x + character.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + character.getTileHeight(); y++) {
        this.add(this.posToString(new Vector2(x, y), pos.layer), character);
      }
    }
  }

  private deleteTilePositions(
    pos: LayerPosition,
    character: GridCharacter
  ): void {
    const tilePos = pos.position;
    for (let x = tilePos.x; x < tilePos.x + character.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + character.getTileHeight(); y++) {
        this.tilePosToCharacters
          .get(this.posToString(new Vector2(x, y), pos.layer))
          ?.delete(character);
      }
    }
  }

  addCharacter(character: GridCharacter): void {
    this.addTilePositions(character.getTilePos(), character);
    this.addTilePositions(character.getNextTilePos(), character);
    this.addPositionChangeSub(character);
    this.addPositionChangeFinishedSub(character);
    this.addTilePosSetSub(character);
  }

  removeCharacter(character: GridCharacter): void {
    const charId = character.getId();
    this.positionChangeStartedSubs.get(charId)?.unsubscribe();
    this.positionChangeFinishedSubs.get(charId)?.unsubscribe();
    this.tilePosSetSubs.get(charId)?.unsubscribe();
    this.deleteTilePositions(character.getTilePos(), character);
    this.deleteTilePositions(character.getNextTilePos(), character);
  }

  private add(pos: string, character: GridCharacter): void {
    if (!this.tilePosToCharacters.has(pos)) {
      this.tilePosToCharacters.set(pos, new Set());
    }
    this.tilePosToCharacters.get(pos)?.add(character);
  }

  private addTilePosSetSub(character: GridCharacter) {
    const tilePosSetSub = character
      .tilePositionSet()
      .subscribe((layerPosition) => {
        this.deleteTilePositions(character.getNextTilePos(), character);
        this.addTilePositions(layerPosition, character);
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
          this.deleteTilePositions(
            {
              position: new Vector2(positionChange.exitTile),
              layer: positionChange.exitLayer,
            },
            character
          );
        }
        this.addTilePositions(
          {
            position: new Vector2(positionChange.enterTile),
            layer: positionChange.enterLayer,
          },
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
        this.deleteTilePositions(
          {
            position: new Vector2(positionChange.exitTile),
            layer: positionChange.exitLayer,
          },
          character
        );
        this.addTilePositions(
          {
            position: new Vector2(positionChange.enterTile),
            layer: positionChange.enterLayer,
          },
          character
        );
      });
    this.positionChangeFinishedSubs.set(
      character.getId(),
      positionChangeFinishedSub
    );
  }

  private posToString(pos: Position, layer: LayerName): string {
    return `${pos.x}#${pos.y}#${layer}`;
  }
}
