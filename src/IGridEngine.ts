import { Direction } from "./Direction/Direction";
import { MovementInfo } from "./Movement/Movement";
import {
  Finished,
  MoveToConfig,
} from "./Movement/TargetMovement/TargetMovement";
import {
  QueueMovementConfig,
  QueueMovementEntry,
  Finished as QueueMovementFinished,
} from "./Movement/QueueMovement/QueueMovement";
import { Observable } from "rxjs";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter";
import { PathfindingOptions } from "./Pathfinding/Pathfinding";
import { PositionChange } from "./GridCharacter/GridCharacter";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm";

export type CharLayer = string | undefined;

/**
 * Specifies a tile position along with a character layer.
 */
export interface LayerPosition {
  position: Position;
  charLayer: CharLayer;
}

export interface Position {
  x: number;
  y: number;
}

/** Result of a pathfinding algorithm run. */
export interface PathfindingResult {
  steps: number;
  /**
   * Actual shortest path. Contains an empty array if no path has
   * been found.
   */
  path: LayerPosition[];

  /**
   * If no path could be found, it contains one position that has the closest
   * distance to the target. The distance is either
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   * in case of 4 direction mode or
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   * in case of 8 direction mode.
   */
  closestToTarget: LayerPosition;

  /**
   * In case that {@link PathfindingOptions.maxPathLength} was set, this
   * property indicates that pathfinding stopped because it reached that maximum
   * path lenght.
   */
  reachedMaxPathLength: boolean;
}

export interface FollowOptions {
  /**
   *  Minimum distance to keep to `charIdToFollow` in
   *  {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   *  in case of 4 direction mode and with and
   *  {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   *  in case of 8 direction mode.
   */
  distance?: number;

  /**
   * `charId` will move to the closest point
   *  ({@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   *  in case of 4 direction mode and with and
   *  {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   *  in case of 8 direction mode)
   *  to `charIdToFollow` that is reachable from `charId` in case that there
   *  does not exist a path between `charId` and `charIdToFollow`.
   */
  closestPointIfBlocked?: boolean;

  /**
   * If this is set, the algorithm will stop once it reaches a path length of
   * this value. This is useful to avoid running out of memory on large or
   * infinite maps.
   */
  maxPathLength?: number;

  /**
   * Algorithm to use for pathfinding.
   */
  algorithm?: ShortestPathAlgorithmType;

  /**
   * If set to `true`, pathfinding will only be performed on the char layer of
   * the start position. If you don't use char layers, activating this setting
   * can improve pathfinding performance.
   *
   * @default false
   */
  ignoreLayers?: boolean;
}

/**
 * Result of a modification of the internal characters array
 */
export interface CharacterShift {
  /** the modified character */
  charId: string;
  /** The action that was performed when modifying the character */
  action: CharacterShiftAction;
}

/**
 * Type of modification of grid engine characters
 */
export enum CharacterShiftAction {
  /** removed existing character */
  REMOVED = "REMOVED",
  /** added new character */
  ADDED = "ADDED",
}

export interface IGridEngine {
  /**
   * Returns the character layer of the given character.
   * You can read more about character layers and transitions
   * {@link https://annoraaq.github.io/grid-engine/p/character-layers | here}
   */
  getCharLayer(charId: string): string | undefined;

  /**
   * @returns The character layer that the transition on the given position and
   * character layer leads to.
   *
   * @beta
   */
  getTransition(position: Position, fromLayer: string): string | undefined;

  /**
   * Sets the character layer `toLayer` that the transition on position
   * `position` from character layer `fromLayer` should lead to.
   * You can read more about character layers and transitions
   * {@link https://annoraaq.github.io/grid-engine/p/character-layers | here}
   *
   * @param position Position of the new transition
   * @param fromLayer Character layer the new transition should start at
   * @param toLayer Character layer the new transition should lead to
   *
   * @beta
   */
  setTransition(position: Position, fromLayer: string, toLayer: string): void;

  /**
   * @returns The tile position of the character with the given id
   */
  getPosition(charId: string): Position;
  /**
   * Initiates movement of the character with the given id. If the character is
   * already moving nothing happens. If the movement direction is currently
   * blocked, the character will only turn towards that direction. Movement
   * commands are **not** queued.
   */
  move(charId: string, direction: Direction): void;

  /**
   * Initiates random movement of the character with the given id. The
   * character will randomly pick one of the non-blocking directions.
   * Optionally a `delay` in milliseconds can be provided. This represents the
   * waiting time after a finished movement, before the next is being initiated.
   * If a `radius` other than -1 is provided, the character will not move
   * further than that radius from its initial position (the position it has
   * been, when `moveRandomly` was called). The distance is calculated with the
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   * in case of 4 direction mode and with and
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   * in case of 8 direction mode. Additionally, if a `radius` other than -1 was
   * given, the character might move more than one tile into a random direction
   * in one run (as long as the route is neither blocked nor outside of the
   * radius).
   */
  moveRandomly(charId: string, delay: number, radius: number): void;

  /**
   * @returns Information about the current automatic movement (including
   * random movement, follow movement and target movement)
   */
  getMovement(charId: string): MovementInfo;
  /**
   * Initiates movement toward the specified `targetPos`. The movement will
   * happen along one shortest path. Check out {@link MoveToConfig} for
   * pathfinding configurations.
   *
   * @returns an observable that will fire
   * whenever the moveTo movement is finished or aborted. It will provide a
   * {@link MoveToResult | result code} as well as a description and a character
   * layer.
   */
  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig
  ): Observable<{ charId: string } & Finished>;
  /**
   * Stops any automated movement such as random movement
   * ({@link moveRandomly}), following ({@link follow}), moving to a
   * specified position ({@link moveTo}) or queued movements ({@link addQueueMovements}).
   */
  stopMovement(charId: string): void;

  /** Sets the speed in tiles per second for a character. */
  setSpeed(charId: string, speed: number): void;

  /** @returns Speed in tiles per second for a character. */
  getSpeed(charId: string): number;

  /**
   * @returns true if the character is able to collide with the tilemap. Don't
   * confuse this with an actual collision check. You should use
   * {@link isBlocked} or {@link isTileBlocked} for this.
   */
  collidesWithTiles(charId: string): boolean;

  update(_time: number, delta: number): void;

  /** Checks whether a character with the given ID is registered. */
  hasCharacter(charId: string): boolean;

  /**
   * Removes the character with the given ID from the plugin.
   * Please note that the corresponding sprites need to be remove separately.
   */
  removeCharacter(charId: string): void;

  /**
   * Removes all characters from the plugin.
   * Please note that the corresponding sprites need to be remove separately.
   */
  removeAllCharacters(): void;

  /**
   * @returns All character IDs that are registered in the plugin, satisfying
   * the provided filtering options.
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[];

  /**
   * @returns All labels, attached to the character.
   */
  getLabels(charId: string): string[];

  /**
   * Add labels to the character.
   */
  addLabels(charId: string, labels: string[]): void;

  /**
   * Remove labels from the character.
   */
  removeLabels(charId: string, labels: string[]): void;

  /**
   * Removes all labels from the character.
   */
  clearLabels(charId: string): void;

  /**
   * Character `charId` will start to walk towards `charIdToFollow` on a
   * shortest path until it reaches the specified `distance`.
   *
   * @param charId ID of character that should follow
   * @param charIdToFollow ID of character that should be followed
   */
  follow(charId: string, charIdToFollow: string, options?: FollowOptions): void;
  /**
   * @deprecated
   * Use follow(charId: string, charIdToFollow: string, options: FollowOptions): void;
   * instead.
   *
   * Character `charId` will start to walk towards `charIdToFollow` on a
   * shortest path until it reaches the specified `distance`.
   *
   * @param charId ID of character that should follow
   * @param charIdToFollow ID of character that should be followed
   * @param distance Minimum distance to keep to `charIdToFollow` in
   *  {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   *  in case of 4 direction mode and with and
   *  {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   *  in case of 8 direction mode.
   * @param closestPointIfBlocked `charId` will move to the closest point
   *  ({@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   *  in case of 4 direction mode and with and
   *  {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   *  in case of 8 direction mode)
   *  to `charIdToFollow` that is reachable from `charId` in case that there
   *  does not exist a path between `charId` and `charIdToFollow`.
   */
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
  ): void;
  /**
   * @returns True if the character is currently moving.
   */
  isMoving(charId: string): boolean;
  /**
   * @returns Direction the character is currently facing. At time of creation
   *  this is `down`.
   */
  getFacingDirection(charId: string): Direction;

  /**
   * @returns Position the character is currently facing.
   */
  getFacingPosition(charId: string): Position;

  /**
   * Turns the character towards the given direction without moving it.
   */
  turnTowards(charId: string, direction: Direction): void;

  /**
   * Finds the identifiers of all characters at the provided tile position.
   * @returns The identifiers of all characters on this tile.
   */
  getCharactersAt(position: Position, layer?: string): string[];

  /**
   * Places the character with the given id to the provided tile position. If
   * that character is moving, the movement is stopped. The
   * {@link positionChangeStarted} and {@link positionChangeFinished} observables will
   * emit. If the character was moving, the {@link movementStopped} observable
   * will also emit.
   */
  setPosition(charId: string, pos: Position, layer?: string): void;

  /**
   * Checks whether the given position is blocked by either the tilemap or a
   * blocking character. If you provide no layer, be sure not to use character
   * layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap or a
   *  character
   */
  isBlocked(
    position: Position,
    layer?: string,
    collisionGroups?: string[]
  ): boolean;

  /**
   * Checks whether the given position is blocked by the tilemap. If you provide
   * no layer, be sure not to use character layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap.
   */
  isTileBlocked(position: Position, layer?: string): boolean;

  /**
   * Returns all collision groups of the given character.
   * {@link https://annoraaq.github.io/grid-engine/examples/collision-groups | Collision Groups Example}
   *
   * @returns All collision groups of the given character.
   */
  getCollisionGroups(charId: string): string[];

  /**
   * Sets collision groups for the given character. Previous collision groups
   * will be overwritten.
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void;

  /**
   * Gets the tile position and character layer adjacent to the given
   * position in the given direction.
   */
  getTilePosInDirection(
    position: Position,
    charLayer: string | undefined,
    direction: Direction
  ): LayerPosition;

  /**
   * Returns the shortest path from source to destination.
   *
   * @param source Source position
   * @param dest Destination position
   * @param options Pathfinding options
   * @returns Shortest path. In case that no path could be found,
   * `closestToTarget` is a position with a minimum distance to the target.
   *
   * @alpha
   */
  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    options?: PathfindingOptions
  ): PathfindingResult;

  /**
   * @returns Observable that, whenever a specified position is entered on optionally provided layers,
   *  will notify with the target characters position change
   */
  steppedOn(
    charIds: string[],
    tiles: Position[],
    layer?: CharLayer[]
  ): Observable<
    {
      charId: string;
    } & PositionChange
  >;

  /**
   * @returns Observable that emits when a new character is added or an existing is removed.
   */
  characterShifted(): Observable<CharacterShift>;

  /**
   * @returns Observable that on each start of a movement will provide the
   *  character ID and the direction.
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }>;

  /**
   * @returns Observable that on each stopped movement of a character will
   *  provide it’s ID and the direction of that movement.
   */
  movementStopped(): Observable<{ charId: string; direction: Direction }>;

  /**
   * @returns Observable that will notify about every change of direction that
   *  is not part of a movement. This is the case if the character tries to walk
   *  towards a blocked tile. The character will turn but not move.
   *  It also emits when you call {@link GridEngine.turnTowards}.
   *
   * This obsersable never emits more than one time in a row for the same
   * direction.
   * So for instance, if {@link GridEngine.turnTowards} is called multiple times
   * in a row (without any facing direction change occurring inbetween) with the
   * same direction, this observable would only emit once.
   */
  directionChanged(): Observable<{ charId: string; direction: Direction }>;

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the beginning of the movement.
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange>;

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the end of the movement.
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange>;

  /**
   * Returns the movement progress (0-1000) of a character to the next tile. For
   * example, if a character has movement progress 400 that means that it has
   * moved 400/1000th of the distance to the next tile already.
   */
  getMovementProgress(charId: string): number;

  /**
   * Refresh the tile collision cache. For performance reasons, you should
   * provide an area that needs to be rebuilt, if possible. You need to have
   * {@link GridEngineConfigHeadless.cacheTileCollisions} enabled.
   *
   * For more information on pathfinding performance check out
   * {@link https://annoraaq.github.io/grid-engine/p/pathfinding-performance/| pathfinding performance}.
   */
  rebuildTileCollisionCache(
    x: number,
    y: number,
    width: number,
    height: number
  ): void;

  /**
   * Adds new positions to the movement queue. Any other automatic movement of
   * the character will be stopped.
   * @param charId
   * @param positions Positions to enqueue
   * @param options Options for the queue movement. These options take effect
   *  immediately (also for previously enqueued but not yet executed movements).
   */
  addQueueMovements(
    charId: string,
    positions: Array<LayerPosition | Direction>,
    options?: QueueMovementConfig
  );

  /** Returns all enqueued movements for the given character. */
  getEnqueuedMovements(charId: string): QueueMovementEntry[];

  /**
   * Clears the complete movement queue for the character, that was filled by
   * using {@link IGridEngine.addQueueMovements}.
   */
  clearEnqueuedMovements(charId: string): void;

  /**
   * Emits whenever queued movements for a character finish (with success or
   * failure).
   */
  queueMovementFinished(): Observable<
    { charId: string } & QueueMovementFinished
  >;

  /**
   * Returns the {@link https://annoraaq.github.io/grid-engine/p/tile-properties/#pathfinding-costs | tile cost}
   * for a position.
   */
  getTileCost(
    position: Position,
    charLayer?: string,
    srcDirection?: Direction
  ): number;
}
