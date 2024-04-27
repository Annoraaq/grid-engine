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
} from "../../GridCharacter/GridCharacter.js";
import { CharLayer, Position } from "../../GridEngine.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

export class CharBlockCache {
  private tilePosToCharacters: Cache = new Cache();
  private charRemoved$ = new Subject<string>();

  constructor(
    private collistionStrategy: CollisionStrategy,
    private collisionGroupRelation?: Map<string, Set<string>>,
  ) {}

  isCharBlockingAt(
    pos: Vector2,
    layer: CharLayer,
    collisionGroups: string[],
    exclude = new Set<CharId>(),
    ignoredCollisionGroups = new Set<string>(),
  ): boolean {
    if (collisionGroups.length === 0) return false;
    const charSet = this.tilePosToCharacters.get(pos, layer);
    return !!(
      charSet &&
      charSet.size > 0 &&
      [...charSet]
        .filter((char: GridCharacter) => !exclude.has(char.getId()))
        .filter(
          (char: GridCharacter) =>
            !this.doIntersect(
              char.getCollisionGroups(),
              ignoredCollisionGroups,
            ),
        )
        .some((char: GridCharacter) =>
          collisionGroups.some((group) =>
            char
              .getCollisionGroups()
              .some((charCGroup) => this.collidesWith(group, charCGroup)),
          ),
        )
    );
  }

  private doIntersect(arrSet: string[], set: Set<string>): boolean {
    for (const val of arrSet) {
      if (set.has(val)) return true;
    }
    return false;
  }

  private collidesWith(group1: string, group2: string): boolean {
    if (!this.collisionGroupRelation) return group1 === group2;
    return (this.collisionGroupRelation.get(group1) || new Set()).has(group2);
  }

  getCharactersAt(pos: Vector2, layer?: string): Set<GridCharacter> {
    const characters = this.tilePosToCharacters.get(pos, layer);
    return characters || new Set();
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

  private add(pos: Vector2, layer: CharLayer, character: GridCharacter): void {
    const set = this.tilePosToCharacters.get(pos, layer);
    if (!set) {
      this.tilePosToCharacters.set(pos, layer, new Set([character]));
    }
    set?.add(character);
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
      filter((cId) => cId == charId),
    );
  }

  private addPositionChangeSub(character: GridCharacter) {
    character
      .positionChangeStarted()
      .pipe(
        takeUntil(this.charRemoved(character.getId())),
        this.posChangeToLayerPos(),
      )
      .subscribe((posChange) => {
        if (
          this.collistionStrategy === CollisionStrategy.BLOCK_ONE_TILE_AHEAD
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
        this.posChangeToLayerPos(),
      )
      .subscribe((posChange) => {
        this.deleteTilePositions(posChange.exit, character);
        this.addTilePositions(posChange.enter, character);
      });
  }

  private addTilePositions(pos: LayerVecPos, character: GridCharacter): void {
    this.forEachCharTile(pos, character, (x, y) => {
      this.add(new Vector2(x, y), pos.layer, character);
    });
  }

  private deleteTilePositions(
    pos: LayerVecPos,
    character: GridCharacter,
  ): void {
    this.forEachCharTile(pos, character, (x, y) => {
      this.tilePosToCharacters
        .get(new Vector2(x, y), pos.layer)
        ?.delete(character);
    });
  }

  private forEachCharTile(
    pos: LayerVecPos,
    character: GridCharacter,
    fn: (x: number, y: number) => void,
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
      }),
    );
  }

  private posToString(pos: Position, layer: CharLayer): string {
    return `${pos.x}#${pos.y}#${layer}`;
  }
}

class Cache {
  private memo: Map<
    /* parentX */ number,
    Map<
      /* parentY */ number,
      Map</* parentLayer */ CharLayer, Set<GridCharacter>>
    >
  > = new Map();

  set(pos: Vector2, layer: CharLayer, val: Set<GridCharacter>) {
    let pX = this.memo.get(pos.x);
    if (!pX) {
      pX = new Map();
      this.memo.set(pos.x, pX);
    }

    let pY = pX.get(pos.y);
    if (!pY) {
      pY = new Map();
      pX.set(pos.y, pY);
    }

    pY.set(layer, val);
  }

  /**
   * Returns null if no entry was found. undefined is a valid cached result.
   */
  get(pos: Vector2, layer: CharLayer): Set<GridCharacter> | undefined {
    const pX = this.memo.get(pos.x);
    if (!pX) return undefined;

    const pY = pX.get(pos.y);
    if (!pY) return undefined;

    return pY.get(layer);
  }
}
