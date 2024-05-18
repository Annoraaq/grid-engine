import { CollisionStrategy } from "./Collisions/CollisionStrategy.js";
import { FollowMovement } from "./Movement/FollowMovement/FollowMovement.js";
import {
  Finished,
  MoveToConfig,
  MoveToResult,
  TargetMovement,
} from "./Movement/TargetMovement/TargetMovement.js";
import {
  CharConfig,
  GridCharacter,
  PositionChange,
} from "./GridCharacter/GridCharacter.js";
import {
  Direction,
  isDiagonal,
  isDirection,
  NumberOfDirections,
} from "./Direction/Direction.js";
import { RandomMovement } from "./Movement/RandomMovement/RandomMovement.js";
import { Observable, Subject, merge } from "rxjs";
import { take, takeUntil, filter, map, mergeWith } from "rxjs/operators";
import { Vector2 } from "./Utils/Vector2/Vector2.js";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy.js";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy.js";
import { MovementInfo } from "./Movement/Movement.js";
import { FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation.js";
import {
  CharacterFilteringOptions,
  filterCharacters,
} from "./GridCharacter/CharacterFilter/CharacterFilter.js";

import { version as VERSION } from "../package.json";
import { Pathfinding } from "./Pathfinding/Pathfinding.js";
import { LayerPositionUtils } from "./Utils/LayerPositionUtils/LayerPositionUtils.js";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm.js";
import { GridTilemap } from "./GridTilemap/GridTilemap.js";
import { Tilemap } from "./GridTilemap/Tilemap.js";
import {
  CharacterShift,
  CharacterShiftAction,
  FollowOptions,
  IGridEngine,
  PathfindingResult,
} from "./IGridEngine.js";
import { Rect } from "./Utils/Rect/Rect.js";
import {
  QueueMovement,
  QueueMovementConfig,
  QueueMovementEntry,
  Finished as QueueMovementFinished,
} from "./Movement/QueueMovement/QueueMovement.js";
import { GridCharacterState } from "./GridCharacter/GridCharacterState.js";
import { GridEngineState } from "./GridEngineState.js";
import {
  IsPositionAllowedFn,
  PathfindingOptions,
} from "./Pathfinding/PathfindingOptions.js";
import { CharLayer, LayerPosition, Position } from "./Position.js";

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
 *
 * @category Configuration
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

  /**
   * Specifies, whether a tile collision cache should be used. It can make
   * pathfinding significantly faster. However, if you change something on the
   * tilemap (adding layers, changing tiles, etc.) you need to call
   * {@link GridEngineHeadless.rebuildTileCollisionCache}. For more information on
   * pathfinding performance check out
   * {@link https://annoraaq.github.io/grid-engine/p/pathfinding-performance/| pathfinding performance}.
   *
   * @defaultValue false
   */
  cacheTileCollisions?: boolean;

  /**
   * Specifies a custom collision group relation. You can define which group
   * collides with which other groups.
   *
   * Example:
   * {'group1': ['group2', 'group3']}
   * This means that `group1` collides with `group2` and `group3` (but not with
   * itself!). Also neither `group2` nor `group3` collide with `group1`, so the
   * relation can be non-symmetric.
   *
   * If this property is omitted, the default relation is that each group only
   * collides with itself.
   */
  collisionGroupRelation?: Record<string, string[]>;
}

/**
 * @category Configuration
 */
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

  /**
   * Array with collision groups to ignore. Only characters with none of these
   * collision groups collide. If a group is both in
   * {@link CollisionConfig.collisionGroups} and
   * {@link CollisionConfig.ignoreCollisionGroups}, the entry in
   * {@link CollisionConfig.collisionGroups} will be ignored/overridden.
   *
   * @defaultValue `[]`
   */
  ignoreCollisionGroups?: string[];
}

/**
 * Configuration object used to initialize a new character in GridEngine.
 *
 * @category Configuration
 */
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

interface ConcreteConfig
  extends Omit<Required<GridEngineConfigHeadless>, "collisionGroupRelation"> {
  collisionGroupRelation?: Record<string, string[]>;
}

/**
 * @category Main Modules
 */
export class GridEngineHeadless implements IGridEngine {
  private gridCharacters?: Map<string, GridCharacter>;
  private config?: ConcreteConfig;
  private gridTilemap?: GridTilemap;
  private isCreatedInternal = false;
  private movementStopped$?: Subject<{ charId: string; direction: Direction }>;
  private movementStarted$?: Subject<{ charId: string; direction: Direction }>;
  private directionChanged$?: Subject<{ charId: string; direction: Direction }>;
  private positionChangeStarted$?: Subject<{ charId: string } & PositionChange>;
  private positionChangeFinished$?: Subject<
    { charId: string } & PositionChange
  >;
  private queueMovementFinished$?: Subject<
    { charId: string } & QueueMovementFinished
  >;
  private charRemoved$?: Subject<string>;
  private charAdded$?: Subject<string>;

  constructor(printWelcomeMessage = true) {
    if (printWelcomeMessage) {
      console.log(`Using GridEngine v${VERSION}`);
    }
  }

  /**
   * {@inheritDoc IGridEngine.getCharLayer}
   *
   * @category Character
   */
  getCharLayer(charId: string): string | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().layer;
  }

  /**
   * {@inheritDoc IGridEngine.getTransition}
   *
   * @category Tilemap
   */
  getTransition(position: Position, fromLayer: string): string | undefined {
    this.initGuard();
    return this.gridTilemap?.getTransition(new Vector2(position), fromLayer);
  }

  /**
   * {@inheritDoc IGridEngine.setTransition}
   *
   * @category Tilemap
   */
  setTransition(position: Position, fromLayer: string, toLayer: string): void {
    this.initGuard();
    return this.gridTilemap?.setTransition(
      new Vector2(position),
      fromLayer,
      toLayer,
    );
  }

  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   *
   * @category Grid Engine
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
    this.queueMovementFinished$ = new Subject<
      { charId: string } & QueueMovementFinished
    >();
    this.charRemoved$ = new Subject<string>();
    this.charAdded$ = new Subject<string>();

    this.gridTilemap = new GridTilemap(
      tilemap,
      this.config.collisionTilePropertyName,
      this.config.characterCollisionStrategy,
      this.recordToMap(this.config.collisionGroupRelation),
      this.config.cacheTileCollisions,
    );
    this.addCharacters();
  }

  private recordToMap(
    rec?: Record<string, string[]>,
  ): Map<string, Set<string>> | undefined {
    if (!rec) return undefined;
    const map = new Map<string, Set<string>>(
      Object.entries(rec).map(([k, v]) => [k, new Set(v)]),
    );
    return map;
  }

  /**
   * {@inheritDoc IGridEngine.getPosition}
   *
   * @category Character
   */
  getPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().position;
  }

  /**
   * {@inheritDoc IGridEngine.move}
   *
   * @category Basic Movement
   */
  move(charId: string, direction: Direction): void {
    this.moveChar(charId, direction);
  }

  /**
   * {@inheritDoc IGridEngine.moveRandomly}
   *
   * @category Random Movement
   */
  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const randomMovement = new RandomMovement(gridChar, delay, radius);
    gridChar.setMovement(randomMovement);
  }

  /**
   * {@inheritDoc IGridEngine.getMovement}
   *
   * @category Character
   */
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

  /**
   * {@inheritDoc IGridEngine.moveTo}
   *
   * @category Pathfinding
   */
  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig,
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
      },
    );
    gridChar.setMovement(targetMovement);
    return targetMovement.finishedObs().pipe(
      map((finished: Finished) => ({
        charId,
        position: finished.position,
        result: finished.result,
        description: finished.description,
        layer: finished.layer,
      })),
    );
  }

  /**
   * {@inheritDoc IGridEngine.stopMovement}
   *
   * @category Character
   */
  stopMovement(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setMovement(undefined);
  }

  /**
   * {@inheritDoc IGridEngine.setSpeed}
   *
   * @category Character
   */
  setSpeed(charId: string, speed: number): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setSpeed(speed);
  }

  /**
   * {@inheritDoc IGridEngine.getSpeed}
   *
   * @category Character
   *
   */
  getSpeed(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getSpeed();
  }

  /**
   * {@inheritDoc IGridEngine.collidesWithTiles}
   *
   * @category Character
   */
  collidesWithTiles(charId: string): boolean {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.collidesWithTiles();
  }

  /**
   * @category Grid Engine
   */
  update(_time: number, delta: number): void {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
    this.gridTilemap?.invalidateFrameCache();
  }

  /**
   * Adds a character after calling {@link create}.
   *
   * @category Grid Engine
   */
  addCharacter(charData: CharacterDataHeadless): void {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();

    const charConfig: CharConfig = {
      speed: charData.speed || 4,
      tilemap: this.gridTilemap,
      collidesWithTiles: true,
      collisionGroups: ["geDefault"],
      ignoreCollisionGroups: [],
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
      if (charData.collides.ignoreCollisionGroups) {
        charConfig.ignoreCollisionGroups =
          charData.collides.ignoreCollisionGroups;
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

  /**
   * {@inheritDoc IGridEngine.hasCharacter}
   *
   * @category Grid Engine
   */
  hasCharacter(charId: string): boolean {
    this.initGuard();
    return !!this.gridCharacters?.has(charId);
  }

  /**
   * {@inheritDoc IGridEngine.removeCharacter}
   *
   * @category Grid Engine
   */
  removeCharacter(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    this.gridTilemap?.removeCharacter(charId);
    this.gridCharacters?.delete(charId);
    this.charRemoved$?.next(charId);
  }

  /**
   * {@inheritDoc IGridEngine.removeAllCharacters}
   *
   * @category Grid Engine
   */
  removeAllCharacters(): void {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }
  }

  /**
   * {@inheritDoc IGridEngine.getAllCharacters}
   *
   * @category Grid Engine
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    this.initGuard();
    if (!this.gridCharacters) return [];
    const allChars = [...this.gridCharacters.values()];
    const filteredChars = options
      ? filterCharacters(allChars, options)
      : allChars;
    return filteredChars.map((char: GridCharacter) => char.getId());
  }

  /**
   * {@inheritDoc IGridEngine.getLabels}
   *
   * @category Character
   */
  getLabels(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getLabels();
  }

  /**
   * {@inheritDoc IGridEngine.addLabels}
   *
   * @category Character
   */
  addLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.addLabels(labels);
  }

  /**
   * {@inheritDoc IGridEngine.removeLabels}
   *
   * @category Character
   */
  removeLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.removeLabels(labels);
  }

  /**
   * {@inheritDoc IGridEngine.clearLabels}
   *
   * @category Character
   */
  clearLabels(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.clearLabels();
  }

  /**
   * {@inheritDoc IGridEngine.follow}
   *
   * @category Pathfinding
   */
  follow(charId: string, charIdToFollow: string, options?: FollowOptions): void;
  follow(
    charId: string,
    charIdToFollow: string,
    distance?: number,
    closestPointIfBlocked?: boolean,
  ): void;
  follow(
    charId: string,
    charIdToFollow: string,
    distance?: FollowOptions | number,
    closestPointIfBlocked?: boolean,
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
        distance: options.distance ?? 0,
        noPathFoundStrategy: options.closestPointIfBlocked
          ? NoPathFoundStrategy.CLOSEST_REACHABLE
          : NoPathFoundStrategy.STOP,
        maxPathLength: options.maxPathLength ?? Infinity,
        shortestPathAlgorithm: options.algorithm ?? "BIDIRECTIONAL_SEARCH",
        ignoreLayers: !!options.ignoreLayers,
        facingDirection: options.facingDirection ?? Direction.NONE,
        considerCosts: options.considerCosts ?? false,
        isPositionAllowedFn: options.isPositionAllowedFn ?? (() => true),
        ignoredChars: options.ignoredChars ?? [],
      },
    );
    gridChar.setMovement(followMovement);
  }

  /**
   * {@inheritDoc IGridEngine.isMoving}
   *
   * @category Character
   */
  isMoving(charId: string): boolean {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.isMoving();
  }

  /**
   * {@inheritDoc IGridEngine.getFacingDirection}
   *
   * @category Character
   */
  getFacingDirection(charId: string): Direction {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getFacingDirection();
  }

  /**
   * {@inheritDoc IGridEngine.getFacingPosition}
   *
   * @category Character
   */
  getFacingPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const vectorPos = gridChar.getFacingPosition();
    return { x: vectorPos.x, y: vectorPos.y };
  }

  /**
   * {@inheritDoc IGridEngine.turnTowards}
   *
   * @category Basic Movement
   */
  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.turnTowards(direction);
  }

  /**
   * {@inheritDoc IGridEngine.getCharactersAt}
   *
   * @category Tilemap
   */
  getCharactersAt(position: Position, layer?: string): string[] {
    this.initGuard();
    if (!this.gridTilemap) return [];
    const characters = this.gridTilemap.getCharactersAt(
      new Vector2(position),
      layer,
    );
    return Array.from(characters).map((char) => char.getId());
  }

  /**
   * {@inheritDoc IGridEngine.setPosition}
   *
   * @category Character
   */
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

  /**
   * {@inheritDoc IGridEngine.isBlocked}
   *
   * @category Tilemap
   */
  isBlocked(
    position: Position,
    layer?: string,
    collisionGroups: string[] = ["geDefault"],
  ): boolean {
    this.initGuard();
    const positionVec = new Vector2(position);
    return !!(
      this.gridTilemap?.hasBlockingTile(positionVec, layer) ||
      this.gridTilemap?.hasBlockingChar(positionVec, layer, collisionGroups)
    );
  }

  /**
   * {@inheritDoc IGridEngine.isTileBlocked}
   *
   * @category Tilemap
   */
  isTileBlocked(position: Position, layer?: string): boolean {
    this.initGuard();
    return !!this.gridTilemap?.hasBlockingTile(new Vector2(position), layer);
  }

  /**
   * {@inheritDoc IGridEngine.getCollisionGroups}
   *
   * @category Character
   */
  getCollisionGroups(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getCollisionGroups() || [];
  }

  /**
   * {@inheritDoc IGridEngine.setCollisionGroups}
   *
   * @category Character
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setCollisionGroups(collisionGroups);
  }

  /**
   * {@inheritDoc IGridEngine.getIgnoreCollisionGroups}
   *
   * @category Character
   */
  getIgnoreCollisionGroups(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getIgnoreCollisionGroups() || [];
  }

  /**
   * {@inheritDoc IGridEngine.setIgnoreCollisionGroups}
   *
   * @category Character
   */
  setIgnoreCollisionGroups(
    charId: string,
    ignoreCollisionGroups: string[],
  ): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setIgnoreCollisionGroups(ignoreCollisionGroups);
  }

  /**
   * {@inheritDoc IGridEngine.getTilePosInDirection}
   *
   * @category Tilemap
   */
  getTilePosInDirection(
    position: Position,
    charLayer: string | undefined,
    direction: Direction,
  ): LayerPosition {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const posInDirection = this.gridTilemap.getTilePosInDirection(
      {
        position: new Vector2(position),
        layer: charLayer,
      },
      direction,
    );
    return {
      position: posInDirection.position.toPosition(),
      charLayer: posInDirection.layer,
    };
  }

  /**
   * {@inheritDoc IGridEngine.findShortestPath}
   * @alpha
   *
   * @category Pathfinding
   */
  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    options: PathfindingOptions = {},
  ): PathfindingResult {
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const algo: ShortestPathAlgorithmType =
      options.shortestPathAlgorithm || "BFS";
    if (options.considerCosts && algo !== "A_STAR") {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with` +
          ` algorithm '${algo}'. It can only be used with A* algorithm.`,
      );
    }
    const nonDefaultPathWidth =
      options.pathWidth !== undefined && options.pathWidth !== 1;
    const nonDefaultPathHeight =
      options.pathHeight !== undefined && options.pathHeight !== 1;
    if ((nonDefaultPathWidth || nonDefaultPathHeight) && algo === "JPS") {
      console.warn(
        `GridEngine: Pathfinding options 'pathWidth' and 'pathHeight' > 1 ` +
          `cannot be used with algorithm 'JPS'.`,
      );
    }
    const pathfinding = new Pathfinding(this.gridTilemap);
    const res = pathfinding.findShortestPath(
      LayerPositionUtils.toInternal(source),
      LayerPositionUtils.toInternal(dest),
      {
        ...options,
        shortestPathAlgorithm: algo,
      },
    );
    return {
      path: res.path.map(LayerPositionUtils.fromInternal),
      closestToTarget: res.closestToTarget
        ? LayerPositionUtils.fromInternal(res.closestToTarget)
        : undefined,
      reachedMaxPathLength: false,
      steps: res.steps,
    };
  }

  /**
   * {@inheritDoc IGridEngine.steppedOn}
   *
   * @category Basic Movement
   */
  steppedOn(
    charIds: string[],
    tiles: Position[],
    layer?: CharLayer[],
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
            (target) =>
              target.x === t.enterTile.x && target.y === t.enterTile.y,
          ) &&
          (layer === undefined || layer.includes(t.enterLayer)),
      ),
    );
  }

  /**
   * {@inheritDoc IGridEngine.characterShifted}
   *
   * @category GridEngine
   */
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
          })),
        ),
      ),
    );
  }

  /**
   * {@inheritDoc IGridEngine.movementStarted}
   *
   * @category Character
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }

  /**
   * {@inheritDoc IGridEngine.movementStopped}
   *
   * @category Character
   */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
  }

  /**
   * {@inheritDoc IGridEngine.directionChanged}
   *
   * @category Character
   */
  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }

  /**
   * {@inheritDoc IGridEngine.positionChangeStarted}
   *
   * @category Character
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }

  /**
   * {@inheritDoc IGridEngine.positionChangeFinished}
   *
   * @category Character
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
  }

  /**
   * {@inheritDoc IGridEngine.getMovementProgress}
   *
   * @category Character
   */
  getMovementProgress(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getMovementProgress();
  }

  /**
   * {@inheritDoc IGridEngine.rebuildTileCollisionCache}
   *
   * @category Character
   */
  rebuildTileCollisionCache(
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.gridTilemap?.rebuildTileCollisionCache(new Rect(x, y, width, height));
  }

  /**
   * {@inheritDoc IGridEngine.addQueueMovements}
   *
   * @category Queue Movement
   */
  addQueueMovements(
    charId: string,
    positions: Array<LayerPosition | Direction>,
    options?: QueueMovementConfig,
  ): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    let queueMovement: QueueMovement;
    if (gridChar?.getMovement()?.getInfo().type === "Queue") {
      queueMovement = gridChar.getMovement() as QueueMovement;
    } else {
      queueMovement = new QueueMovement(gridChar, this.gridTilemap);
      gridChar.setMovement(queueMovement);
      queueMovement
        .finished()
        .pipe(
          takeUntil(
            merge(this.charRemoved(charId), gridChar.autoMovementSet()),
          ),
        )
        .subscribe((finished: QueueMovementFinished) => {
          this.queueMovementFinished$?.next({ charId, ...finished });
        });
    }
    queueMovement.enqueue(
      positions.map((p) => {
        if (isDirection(p)) {
          return p;
        }
        return {
          position: new Vector2(p.position),
          layer: p.charLayer,
        };
      }),
      options,
    );
  }

  /**
   * {@inheritDoc IGridEngine.queueMovementFinished}
   *
   * @category Queue Movement
   */
  queueMovementFinished(): Observable<
    { charId: string } & QueueMovementFinished
  > {
    if (!this.queueMovementFinished$) throw this.createUninitializedErr();
    return this.queueMovementFinished$;
  }

  /**
   * {@inheritDoc IGridEngine.getEnqueuedMovements}
   *
   * @category Queue Movement
   */
  getEnqueuedMovements(charId: string): QueueMovementEntry[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getMovement()?.getInfo().type === "Queue") {
      const queueMovement = gridChar.getMovement() as QueueMovement;
      return queueMovement.peekAll().map((entry) => {
        return {
          command: isDirection(entry.command)
            ? entry.command
            : LayerPositionUtils.fromInternal(entry.command),
          config: entry.config,
        };
      });
    }
    return [];
  }

  /**
   * {@inheritDoc IGridEngine.clearEnqueuedMovements}
   *
   * @category Queue Movement
   */
  clearEnqueuedMovements(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (gridChar.getMovement()?.getInfo().type === "Queue") {
      const queueMovement = gridChar.getMovement() as QueueMovement;
      queueMovement.clear();
    }
  }

  /**
   * {@inheritDoc IGridEngine.getTileCost}
   *
   * @category Pathfinding
   */
  getTileCost(
    position: Position,
    charLayer?: string,
    srcDirection?: Direction,
  ): number {
    this.initGuard();
    return (
      this.gridTilemap?.getTileCosts(
        { position: new Vector2(position), layer: charLayer },
        srcDirection,
      ) ?? 1
    );
  }

  /**
   * Returns the current state of Grid Engine. This is useful for persiting or
   * sharing the state.
   *
   * @category GridEngine
   *
   * @beta
   */
  getState(): GridEngineState {
    const chars: GridCharacterState[] = [];
    if (this.gridCharacters) {
      for (const [id, char] of this.gridCharacters.entries()) {
        chars.push({
          id,
          position: LayerPositionUtils.fromInternal(char.getTilePos()),
          facingDirection: char.getFacingDirection(),
          speed: char.getSpeed(),
          labels: char.getLabels(),
          movementProgress: char.getMovementProgress(),
          collisionConfig: {
            collisionGroups: char.getCollisionGroups(),
            ignoreCollisionGroups: char.getIgnoreCollisionGroups(),
            collidesWithTiles: char.collidesWithTiles(),
            ignoreMissingTiles: char.getIgnoreMissingTiles(),
          },
        });
      }
    }
    return {
      characters: chars,
    };
  }

  /**
   * Sets the given state for Grid Engine. Be aware that it will **not** remove
   * any characters from Grid Engine. If you want to completely reset the state,
   * you should call {@link GridEngineHeadless.create}
   * or remove all characters via
   * {@link GridEngineHeadless.removeAllCharacters}.
   *
   * @category GridEngine
   *
   * @beta
   */
  setState(state: GridEngineState): void {
    if (this.gridCharacters) {
      for (const charState of state.characters) {
        const char = this.gridCharacters.get(charState.id);
        if (char) {
          const currentTilePos = char.getTilePos();
          if (
            !LayerPositionUtils.equal(
              currentTilePos,
              LayerPositionUtils.toInternal(charState.position),
            )
          ) {
            char.setTilePosition(
              LayerPositionUtils.toInternal(charState.position),
            );
          }
          char.setSpeed(charState.speed);
          char.turnTowards(charState.facingDirection);
          if (charState.collisionConfig.collisionGroups) {
            char.setCollisionGroups(charState.collisionConfig.collisionGroups);
          }
          if (charState.collisionConfig.collidesWithTiles !== undefined) {
            char.setCollidesWithTiles(
              charState.collisionConfig.collidesWithTiles,
            );
          }
          if (charState.collisionConfig.ignoreMissingTiles !== undefined) {
            char.setIgnoreMissingTiles(
              charState.collisionConfig.ignoreMissingTiles,
            );
          }
          char.setMovementProgress(charState.movementProgress);
          char.clearLabels();
          char.addLabels(charState.labels);
        }
      }
    }
  }

  private charRemoved(charId: string): Observable<string> {
    if (!this.charRemoved$) throw this.createUninitializedErr();
    return this.charRemoved$?.pipe(
      take(1),
      filter((cId) => cId == charId),
    );
  }

  private initGuard() {
    if (!this.isCreatedInternal) {
      throw this.createUninitializedErr();
    }
  }

  private createUninitializedErr() {
    throw new Error(
      "GridEngine not initialized. You need to call create() first.",
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
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction mode.`,
        );
        return;
      } else if (this.gridTilemap?.isIsometric() && !isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction isometric mode.`,
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
          `GridEngine: Unknown NoPathFoundStrategy '${config.noPathFoundStrategy}'. Falling back to '${NoPathFoundStrategy.STOP}'`,
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
          `GridEngine: Unknown PathBlockedStrategy '${config.pathBlockedStrategy}'. Falling back to '${PathBlockedStrategy.WAIT}'`,
        );
      }
    }
    return moveToConfig;
  }

  private setConfigDefaults(config: GridEngineConfigHeadless): ConcreteConfig {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      cacheTileCollisions: false,
      ...config,
    };
  }
}
