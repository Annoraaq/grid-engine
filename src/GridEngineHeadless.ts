import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { FollowMovement } from "./Movement/FollowMovement/FollowMovement";
import {
  Finished,
  MoveToConfig,
  MoveToResult,
  TargetMovement,
} from "./Movement/TargetMovement/TargetMovement";
import {
  CharConfig,
  GridCharacter,
  PositionChange,
} from "./GridCharacter/GridCharacter";
import {
  Direction,
  isDiagonal,
  NumberOfDirections,
} from "./Direction/Direction";
import { RandomMovement } from "./Movement/RandomMovement/RandomMovement";
import { Observable, Subject } from "rxjs";
import { take, takeUntil, filter, map, mergeWith } from "rxjs/operators";
import { Vector2 } from "./Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { Concrete } from "./Utils/TypeUtils";
import { MovementInfo } from "./Movement/Movement";
import { FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation";
import {
  CharacterFilteringOptions,
  filterCharacters,
} from "./GridCharacter/CharacterFilter/CharacterFilter";

import { version as VERSION } from "../package.json";
import {
  IsPositionAllowedFn,
  Pathfinding,
  PathfindingOptions,
} from "./Pathfinding/Pathfinding";
import { LayerPositionUtils } from "./Utils/LayerPositionUtils/LayerPositionUtils";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm";
import { GridTilemap } from "./GridTilemap/GridTilemap";
import { Tilemap } from "./GridTilemap/Tilemap";
import {
  CharacterShift,
  CharacterShiftAction,
  CharLayer,
  FollowOptions,
  IGridEngine,
  LayerPosition,
  PathfindingResult,
  Position,
} from "./IGridEngine";

export {
  CollisionStrategy,
  CharacterFilteringOptions,
  Direction,
  MoveToConfig,
  MoveToResult,
  Finished,
  FrameRow,
  NumberOfDirections,
  NoPathFoundStrategy,
  PathBlockedStrategy,
  MovementInfo,
  PositionChange,
  IsPositionAllowedFn,
  PathfindingOptions,
  ShortestPathAlgorithmType,
};

export type TileSizePerSecond = number;

/**
 * Configuration object for initializing GridEngineHeadless.
 */
export interface GridEngineConfigHeadless {
  /** An array of character data. Each describing a character on the map. */
  characters: CharacterDataHeadless[];

  /**
   * A custom name for the
   * {@link https://annoraaq.github.io/grid-engine/p/tile-properties/#collisions | collision tile property}
   * of your tilemap.
   *
   * @defaultValue 'ge_collide'
   */
  collisionTilePropertyName?: string;

  /**
   * The possible number of directions for moving a character. Default is 4
   * (up, down, left, right). If set to 8 it additionaly enables diagonal
   * movement (up-left, up-right, down-left, down-right).
   *
   * @defaultValue {@link NumberOfDirections.FOUR}
   */
  numberOfDirections?: NumberOfDirections;

  /**
   * The character collision strategy.
   *
   * @defaultValue {@link CollisionStrategy.BLOCK_TWO_TILES}
   */
  characterCollisionStrategy?: CollisionStrategy;
}

export interface CollisionConfig {
  /**
   * Determines whether the character should collide with the tilemap.
   *
   * @defaultValue `true`
   */
  collidesWithTiles?: boolean;

  /**
   * If set to `true`, the character will not collide with a position that has
   * no tile on any layer. This is especially useful if you want the character
   * to be able to move outside of the map boundaries.
   *
   * @defaultValue `false`
   */
  ignoreMissingTiles?: boolean;

  /**
   * Array with collision groups. Only characters with at least one matching
   * collision group collide. If omitted it will be initialized with a default
   * collision group called `'geDefault'`. If you want to keep a character from
   * colliding with any other character, you can simply provide an empty array
   * here.
   *
   * @defaultValue `['geDefault']`
   */
  collisionGroups?: string[];
}

/** Configuration object used to initialize a new character in GridEngine. */
export interface CharacterDataHeadless {
  /**
   * A unique identifier for the character on the map. If you provice two
   * characters with the same id, the last one will override the previous one.
   */
  id: string;

  /**
   * The speed of a player in tiles per second.
   *
   * @defaultValue `4`
   */
  speed?: TileSizePerSecond;

  /**
   * Start tile position of the player.
   *
   * @defaultValue `{x: 0, y:0}`
   */
  startPosition?: Position;

  /**
   * Sets the direction the character is initially facing.
   *
   * @defaultValue {@link Direction.DOWN}
   */
  facingDirection?: Direction;

  /**
   * Set to false, if character should not collide (neither with the tilemap,
   * nor with other characters). For more control, pass a
   * {@link CollisionConfig} object.
   *
   * @defaultValue `true`
   */
  collides?: boolean | CollisionConfig;

  /**
   * Sets the
   * {@link https://annoraaq.github.io/grid-engine/features/character-layers | character layer}
   * of the character. If omitted the lowest character layer of the tilemap is
   * taken. If there are no character layers in the tilemap, it will get the
   * char layer `undefined`.
   *
   * @beta
   */
  charLayer?: string;

  /**
   * Sets labels for the character. They can be used to filter and logically
   * group characters.
   *
   * @defaultValue `[]`
   */
  labels?: string[];

  /**
   * The possible number of directions for moving a character. This setting can
   * be used to override the {@link GridEngineConfig.numberOfDirections | global setting}
   * in the GridEngine configuration for specific characters.
   */
  numberOfDirections?: NumberOfDirections;

  /**
   * With of the character in tiles. This allows to specify character that span
   * more than just one tile.
   *
   * @defaultValue 1
   */
  tileWidth?: number;

  /**
   * Height of the character in tiles. This allows to specify character that span
   * more than just one tile.
   *
   * @defaultValue 1
   */
  tileHeight?: number;
}

export class GridEngineHeadless implements IGridEngine {
  private gridCharacters?: Map<string, GridCharacter>;
  private config?: Concrete<GridEngineConfigHeadless>;
  private gridTilemap?: GridTilemap;
  private isCreatedInternal = false;
  private movementStopped$?: Subject<{ charId: string; direction: Direction }>;
  private movementStarted$?: Subject<{ charId: string; direction: Direction }>;
  private directionChanged$?: Subject<{ charId: string; direction: Direction }>;
  private positionChangeStarted$?: Subject<{ charId: string } & PositionChange>;
  private positionChangeFinished$?: Subject<
    { charId: string } & PositionChange
  >;
  private charRemoved$?: Subject<string>;
  private charAdded$?: Subject<string>;

  constructor() {
    console.log(`Using GridEngine v${VERSION}`);
  }

  /** {@inheritDoc IGridEngine.getCharLayer} */
  getCharLayer(charId: string): string | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().layer;
  }

  /** {@inheritDoc IGridEngine.getTransition} */
  getTransition(position: Position, fromLayer: string): string | undefined {
    this.initGuard();
    return this.gridTilemap?.getTransition(new Vector2(position), fromLayer);
  }

  /** {@inheritDoc IGridEngine.setTransition} */
  setTransition(position: Position, fromLayer: string, toLayer: string): void {
    this.initGuard();
    return this.gridTilemap?.setTransition(
      new Vector2(position),
      fromLayer,
      toLayer
    );
  }

  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   */
  create(tilemap: Tilemap, config: GridEngineConfigHeadless): void {
    this.isCreatedInternal = true;
    this.gridCharacters = new Map();
    const concreteConfig = this.setConfigDefaults(config);
    this.config = concreteConfig;
    this.movementStopped$ = new Subject<{
      charId: string;
      direction: Direction;
    }>();
    this.movementStarted$ = new Subject<{
      charId: string;
      direction: Direction;
    }>();
    this.directionChanged$ = new Subject<{
      charId: string;
      direction: Direction;
    }>();
    this.positionChangeStarted$ = new Subject<
      { charId: string } & PositionChange
    >();
    this.positionChangeFinished$ = new Subject<
      { charId: string } & PositionChange
    >();
    this.charRemoved$ = new Subject<string>();
    this.charAdded$ = new Subject<string>();
    this.gridTilemap = new GridTilemap(
      tilemap,
      this.config.collisionTilePropertyName,
      this.config.characterCollisionStrategy,
      true
    );
    this.addCharacters();
  }

  /** {@inheritDoc IGridEngine.getPosition} */
  getPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().position;
  }

  /** {@inheritDoc IGridEngine.move} */
  move(charId: string, direction: Direction): void {
    this.moveChar(charId, direction);
  }

  /** {@inheritDoc IGridEngine.moveRandomly} */
  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const randomMovement = new RandomMovement(gridChar, delay, radius);
    gridChar.setMovement(randomMovement);
  }

  /** {@inheritDoc IGridEngine.getMovement} */
  getMovement(charId: string): MovementInfo {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const movement = gridChar.getMovement();
    if (!movement) {
      return {
        type: "None",
      };
    }
    return movement.getInfo();
  }

  /** {@inheritDoc IGridEngine.moveTo} */
  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig
  ): Observable<{ charId: string } & Finished> {
    const moveToConfig = this.assembleMoveToConfig(config);
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const targetMovement = new TargetMovement(
      gridChar,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: config?.targetLayer || gridChar.getNextTilePos().layer,
      },
      {
        distance: 0,
        config: moveToConfig,
      }
    );
    gridChar.setMovement(targetMovement);
    return targetMovement.finishedObs().pipe(
      map((finished: Finished) => ({
        charId,
        position: finished.position,
        result: finished.result,
        description: finished.description,
        layer: finished.layer,
      }))
    );
  }

  /** {@inheritDoc IGridEngine.stopMovement} */
  stopMovement(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setMovement(undefined);
  }

  /** {@inheritDoc IGridEngine.setSpeed} */
  setSpeed(charId: string, speed: number): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setSpeed(speed);
  }

  /** {@inheritDoc IGridEngine.getSpeed} */
  getSpeed(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getSpeed();
  }

  /** {@inheritDoc IGridEngine.collidesWithTiles} */
  collidesWithTiles(charId: string): boolean {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.collidesWithTiles();
  }

  update(_time: number, delta: number): void {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
    this.gridTilemap?.invalidateFrameCache();
  }

  /** Adds a character after calling {@link create}. */
  addCharacter(charData: CharacterDataHeadless): void {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();

    const charConfig: CharConfig = {
      speed: charData.speed || 4,
      tilemap: this.gridTilemap,
      collidesWithTiles: true,
      collisionGroups: ["geDefault"],
      charLayer: charData.charLayer,
      facingDirection: charData.facingDirection,
      labels: charData.labels,
      numberOfDirections:
        charData.numberOfDirections ?? this.config.numberOfDirections,
      tileWidth: charData.tileWidth,
      tileHeight: charData.tileHeight,
    };

    if (typeof charData.collides === "boolean") {
      if (charData.collides === false) {
        charConfig.collidesWithTiles = false;
        charConfig.collisionGroups = [];
      }
    } else if (charData.collides !== undefined) {
      if (charData.collides.collidesWithTiles === false) {
        charConfig.collidesWithTiles = false;
      }
      if (charData.collides.collisionGroups) {
        charConfig.collisionGroups = charData.collides.collisionGroups;
      }
      charConfig.ignoreMissingTiles =
        charData.collides?.ignoreMissingTiles ?? false;
    }
    const gridChar = new GridCharacter(charData.id, charConfig);

    if (charData.startPosition) {
      gridChar.setTilePosition({
        position: new Vector2(charData.startPosition),
        layer: gridChar.getTilePos().layer,
      });
    }
    this.gridCharacters?.set(charData.id, gridChar);
    this.gridTilemap.addCharacter(gridChar);
    const id = gridChar.getId();
    gridChar
      .movementStopped()
      .pipe(takeUntil(this.charRemoved(id)))
      .subscribe((direction: Direction) => {
        this.movementStopped$?.next({ charId: id, direction });
      });
    gridChar
      .movementStarted()
      .pipe(takeUntil(this.charRemoved(id)))
      .subscribe((direction: Direction) => {
        this.movementStarted$?.next({ charId: id, direction });
      });
    gridChar
      .directionChanged()
      .pipe(takeUntil(this.charRemoved(id)))
      .subscribe((direction: Direction) => {
        this.directionChanged$?.next({ charId: id, direction });
      });
    gridChar
      .positionChangeStarted()
      .pipe(takeUntil(this.charRemoved(id)))
      .subscribe((positionChange: PositionChange) => {
        this.positionChangeStarted$?.next({
          charId: id,
          ...positionChange,
        });
      });
    gridChar
      .positionChangeFinished()
      .pipe(takeUntil(this.charRemoved(id)))
      .subscribe((positionChange: PositionChange) => {
        this.positionChangeFinished$?.next({
          charId: id,
          ...positionChange,
        });
      });
    this.charAdded$?.next(id);
  }

  /** {@inheritDoc IGridEngine.hasCharacter} */
  hasCharacter(charId: string): boolean {
    this.initGuard();
    return !!this.gridCharacters?.has(charId);
  }

  /** {@inheritDoc IGridEngine.removeCharacter} */
  removeCharacter(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    this.gridTilemap?.removeCharacter(charId);
    this.gridCharacters?.delete(charId);
    this.charRemoved$?.next(charId);
  }

  /** {@inheritDoc IGridEngine.removeAllCharacters} */
  removeAllCharacters(): void {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }
  }

  /** {@inheritDoc IGridEngine.getAllCharacters} */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    this.initGuard();
    if (!this.gridCharacters) return [];
    const allChars = [...this.gridCharacters.values()];
    const filteredChars = options
      ? filterCharacters(allChars, options)
      : allChars;
    return filteredChars.map((char: GridCharacter) => char.getId());
  }

  /** {@inheritDoc IGridEngine.getLabels} */
  getLabels(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getLabels();
  }

  /** {@inheritDoc IGridEngine.addLabels} */
  addLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.addLabels(labels);
  }

  /** {@inheritDoc IGridEngine.removeLabels} */
  removeLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.removeLabels(labels);
  }

  /** {@inheritDoc IGridEngine.clearLabels} */
  clearLabels(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.clearLabels();
  }

  /** {@inheritDoc IGridEngine.follow} */
  follow(charId: string, charIdToFollow: string, options?: FollowOptions): void;
  follow(
    charId: string,
    charIdToFollow: string,
    distance?: number,
    closestPointIfBlocked?: boolean
  ): void;
  follow(
    charId: string,
    charIdToFollow: string,
    distance?: FollowOptions | number,
    closestPointIfBlocked?: boolean
  ): void {
    let options: FollowOptions;

    if (distance === undefined) {
      options = {
        distance: 0,
        closestPointIfBlocked: false,
      };
    } else if (typeof distance === "number") {
      options = {
        distance,
        closestPointIfBlocked: false,
      };
      if (closestPointIfBlocked) {
        options.closestPointIfBlocked = true;
      }
    } else {
      options = distance;
    }

    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    const gridCharToFollow = this.gridCharacters?.get(charIdToFollow);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!gridCharToFollow) throw this.createCharUnknownErr(charIdToFollow);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const followMovement = new FollowMovement(
      gridChar,
      this.gridTilemap,
      gridCharToFollow,
      {
        distance: options.distance,
        noPathFoundStrategy: options.closestPointIfBlocked
          ? NoPathFoundStrategy.CLOSEST_REACHABLE
          : NoPathFoundStrategy.STOP,
        maxPathLength: options.maxPathLength ?? Infinity,
        shortestPathAlgorithm: options.algorithm ?? "BIDIRECTIONAL_SEARCH",
      }
    );
    gridChar.setMovement(followMovement);
  }

  /** {@inheritDoc IGridEngine.isMoving} */
  isMoving(charId: string): boolean {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.isMoving();
  }

  /** {@inheritDoc IGridEngine.getFacingDirection} */
  getFacingDirection(charId: string): Direction {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getFacingDirection();
  }

  /** {@inheritDoc IGridEngine.getFacingPosition} */
  getFacingPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const vectorPos = gridChar.getFacingPosition();
    return { x: vectorPos.x, y: vectorPos.y };
  }

  /** {@inheritDoc IGridEngine.turnTowards} */
  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.turnTowards(direction);
  }

  /** {@inheritDoc IGridEngine.getCharactersAt} */
  getCharactersAt(position: Position, layer: string): string[] {
    // this.initGuard();
    if (!this.gridTilemap) return [];
    const characters = this.gridTilemap.getCharactersAt(
      new Vector2(position),
      layer
    );
    return Array.from(characters).map((char) => char.getId());
  }

  /** {@inheritDoc IGridEngine.setPosition} */
  setPosition(charId: string, pos: Position, layer?: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!layer) {
      gridChar.setTilePosition({
        position: new Vector2(pos),
        layer: gridChar.getTilePos().layer,
      });
    }
    gridChar.setTilePosition({ position: new Vector2(pos), layer });
  }

  /** {@inheritDoc IGridEngine.isBlocked} */
  isBlocked(
    position: Position,
    layer?: string,
    collisionGroups: string[] = ["geDefault"]
  ): boolean {
    this.initGuard();
    const positionVec = new Vector2(position);
    return !!(
      this.gridTilemap?.hasBlockingTile(positionVec, layer) ||
      this.gridTilemap?.hasBlockingChar(positionVec, layer, collisionGroups)
    );
  }

  /** {@inheritDoc IGridEngine.isTileBlocked} */
  isTileBlocked(position: Position, layer?: string): boolean {
    this.initGuard();
    return !!this.gridTilemap?.hasBlockingTile(new Vector2(position), layer);
  }

  /** {@inheritDoc IGridEngine.getCollisionGroups} */
  getCollisionGroups(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getCollisionGroups() || [];
  }

  /** {@inheritDoc IGridEngine.setCollisionGroups} */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setCollisionGroups(collisionGroups);
  }

  /** {@inheritDoc IGridEngine.getTilePosInDirection} */
  getTilePosInDirection(
    position: Position,
    charLayer: string | undefined,
    direction: Direction
  ): LayerPosition {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const posInDirection = this.gridTilemap.getTilePosInDirection(
      {
        position: new Vector2(position),
        layer: charLayer,
      },
      direction
    );
    return {
      position: posInDirection.position.toPosition(),
      charLayer: posInDirection.layer,
    };
  }

  /**
   * {@inheritDoc IGridEngine.findShortestPath}
   * @alpha
   */
  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    options: PathfindingOptions = {}
  ): PathfindingResult {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const pathfinding = new Pathfinding(this.gridTilemap);
    const res = pathfinding.findShortestPath(
      LayerPositionUtils.toInternal(source),
      LayerPositionUtils.toInternal(dest),
      {
        ...options,
        shortestPathAlgorithm: options.shortestPathAlgorithm || "BFS",
      }
    );
    return {
      path: res.path.map(LayerPositionUtils.fromInternal),
      closestToTarget: LayerPositionUtils.fromInternal(res.closestToTarget),
      reachedMaxPathLength: false,
      steps: res.steps,
    };
  }

  /** {@inheritDoc IGridEngine.steppedOn} */
  steppedOn(
    charIds: string[],
    tiles: Position[],
    layer?: CharLayer[]
  ): Observable<
    {
      charId: string;
    } & PositionChange
  > {
    return this.positionChangeFinished().pipe(
      filter(
        (t) =>
          charIds.includes(t.charId) &&
          tiles.some(
            (target) => target.x === t.enterTile.x && target.y === t.enterTile.y
          ) &&
          (layer === undefined || layer.includes(t.enterLayer))
      )
    );
  }

  /** {@inheritDoc IGridEngine.characterShifted} */
  characterShifted(): Observable<CharacterShift> {
    if (!this.charAdded$ || !this.charRemoved$) {
      throw this.createUninitializedErr();
    }
    return this.charAdded$.pipe(
      map((c) => ({
        charId: c,
        action: CharacterShiftAction.ADDED,
      })),
      mergeWith(
        this.charRemoved$.pipe(
          map((c) => ({
            charId: c,
            action: CharacterShiftAction.REMOVED,
          }))
        )
      )
    );
  }

  /** {@inheritDoc IGridEngine.movementStarted} */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }

  /** {@inheritDoc IGridEngine.movementStopped} */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
  }

  /** {@inheritDoc IGridEngine.directionChanged} */
  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }

  /** {@inheritDoc IGridEngine.positionChangeStarted} */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }

  /** {@inheritDoc IGridEngine.positionChangeFinished} */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
  }

  /** {@inheritDoc IGridEngine.getMovementProgress} */
  getMovementProgress(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getMovementProgress();
  }

  private charRemoved(charId: string): Observable<string> {
    if (!this.charRemoved$) throw this.createUninitializedErr();
    return this.charRemoved$?.pipe(
      take(1),
      filter((cId) => cId == charId)
    );
  }

  private initGuard() {
    if (!this.isCreatedInternal) {
      throw this.createUninitializedErr();
    }
  }

  private createUninitializedErr() {
    throw new Error(
      "GridEngine not initialized. You need to call create() first."
    );
  }

  private addCharacters() {
    this.config?.characters.forEach((charData) => this.addCharacter(charData));
  }

  private moveChar(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getNumberOfDirections() === NumberOfDirections.FOUR) {
      if (!this.gridTilemap?.isIsometric() && isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction mode.`
        );
        return;
      } else if (this.gridTilemap?.isIsometric() && !isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction isometric mode.`
        );
        return;
      }
    }
    gridChar.move(direction);
  }

  private createCharUnknownErr(charId: string): Error {
    return new Error(`Character unknown: ${charId}`);
  }
  private assembleMoveToConfig(config: MoveToConfig = {}): MoveToConfig {
    const moveToConfig = {
      ...config,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      pathBlockedStrategy: PathBlockedStrategy.WAIT,
    };
    if (config?.noPathFoundStrategy) {
      if (
        Object.values(NoPathFoundStrategy).includes(config.noPathFoundStrategy)
      ) {
        moveToConfig.noPathFoundStrategy = config.noPathFoundStrategy;
      } else {
        console.warn(
          `GridEngine: Unknown NoPathFoundStrategy '${config.noPathFoundStrategy}'. Falling back to '${NoPathFoundStrategy.STOP}'`
        );
      }
    }
    if (config?.pathBlockedStrategy) {
      if (
        Object.values(PathBlockedStrategy).includes(config.pathBlockedStrategy)
      ) {
        moveToConfig.pathBlockedStrategy = config.pathBlockedStrategy;
      } else {
        console.warn(
          `GridEngine: Unknown PathBlockedStrategy '${config.pathBlockedStrategy}'. Falling back to '${PathBlockedStrategy.WAIT}'`
        );
      }
    }
    return moveToConfig;
  }

  private setConfigDefaults(
    config: GridEngineConfigHeadless
  ): Concrete<GridEngineConfigHeadless> {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      ...config,
    };
  }
}
