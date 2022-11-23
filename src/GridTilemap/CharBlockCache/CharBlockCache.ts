import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import {
  filter,
  map,
  Observable,
  OperatorFunction,
  pipe,
  Subject,
  take,
  takeUntil,
} from "rxjs";
import {
  CharId,
  GridCharacter,
  PositionChange,
} from "../../GridCharacter/GridCharacter";
import { CharLayer, Position } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";

export class CharBlockCache {
  private tilePosToCharacters: Map<string, Set<GridCharacter>> = new Map();
  private charRemoved$ = new Subject<string>();

  isCharBlockingAt(
    pos: Vector2,
    layer: CharLayer,
    collisionGroups: string[],
    exclude = new Set<CharId>()
  ): boolean {
    const posStr = this.posToString(pos, layer);
    const charSet = this.tilePosToCharacters.get(posStr);
    return !!(
      charSet &&
      charSet.size > 0 &&
      [...charSet]
        .filter((char: GridCharacter) => !exclude.has(char.getId()))
        .some((char: GridCharacter) =>
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

  addCharacter(character: GridCharacter): void {
    this.addTilePositions(character.getTilePos(), character);
    this.addTilePositions(character.getNextTilePos(), character);
    this.addPositionChangeSub(character);
    this.addPositionChangeFinishedSub(character);
    this.addTilePosSetSub(character);
  }

  removeCharacter(character: GridCharacter): void {
    const charId = character.getId();
    this.charRemoved$.next(charId);
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
    character
      .tilePositionSet()
      .pipe(takeUntil(this.charRemoved(character.getId())))
      .subscribe((layerPosition) => {
        this.deleteTilePositions(character.getNextTilePos(), character);
        this.addTilePositions(layerPosition, character);
      });
  }

  private charRemoved(charId: string): Observable<string> {
    return this.charRemoved$?.pipe(
      take(1),
      filter((cId) => cId == charId)
    );
  }

  private addPositionChangeSub(character: GridCharacter) {
    character
      .positionChangeStarted()
      .pipe(
        takeUntil(this.charRemoved(character.getId())),
        this.posChangeToLayerPos()
      )
      .subscribe((posChange) => {
        if (
          GlobalConfig.get().characterCollisionStrategy ===
          CollisionStrategy.BLOCK_ONE_TILE_AHEAD
        ) {
          this.deleteTilePositions(posChange.exit, character);
        }
        this.addTilePositions(posChange.enter, character);
      });
  }

  private addPositionChangeFinishedSub(character: GridCharacter) {
    character
      .positionChangeFinished()
      .pipe(
        takeUntil(this.charRemoved(character.getId())),
        this.posChangeToLayerPos()
      )
      .subscribe((posChange) => {
        this.deleteTilePositions(posChange.exit, character);
        this.addTilePositions(posChange.enter, character);
      });
  }

  private addTilePositions(pos: LayerVecPos, character: GridCharacter): void {
    this.forEachCharTile(pos, character, (x, y) => {
      this.add(this.posToString(new Vector2(x, y), pos.layer), character);
    });
  }

  private deleteTilePositions(
    pos: LayerVecPos,
    character: GridCharacter
  ): void {
    this.forEachCharTile(pos, character, (x, y) => {
      this.tilePosToCharacters
        .get(this.posToString(new Vector2(x, y), pos.layer))
        ?.delete(character);
    });
  }

  private forEachCharTile(
    pos: LayerVecPos,
    character: GridCharacter,
    fn: (x: number, y: number) => void
  ): void {
    const tilePos = pos.position;
    for (let x = tilePos.x; x < tilePos.x + character.getTileWidth(); x++) {
      for (let y = tilePos.y; y < tilePos.y + character.getTileHeight(); y++) {
        fn(x, y);
      }
    }
  }

  private posChangeToLayerPos(): OperatorFunction<
    PositionChange,
    {
      enter: LayerVecPos;
      exit: LayerVecPos;
    }
  > {
    return pipe(
      map((posChange: PositionChange) => {
        return {
          enter: {
            position: new Vector2(posChange.enterTile),
            layer: posChange.enterLayer,
          },
          exit: {
            position: new Vector2(posChange.exitTile),
            layer: posChange.exitLayer,
          },
        };
      })
    );
  }

  private posToString(pos: Position, layer: CharLayer): string {
    return `${pos.x}#${pos.y}#${layer}`;
  }
}
