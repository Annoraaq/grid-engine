import { Direction } from "./Direction/Direction.js";
import { MovementInfo } from "./Movement/Movement.js";
import {
  Finished,
  MoveToConfig,
} from "./Movement/TargetMovement/TargetMovement.js";
import {
  QueueMovementConfig,
  QueueMovementEntry,
  Finished as QueueMovementFinished,
} from "./Movement/QueueMovement/QueueMovement.js";
import { Observable } from "rxjs";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter.js";
import { CharId, PositionChange } from "./GridCharacter/GridCharacter.js";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm.js";
import {
  IsPositionAllowedFn,
  PathfindingOptions,
} from "./Pathfinding/PathfindingOptions.js";
import { CharLayer, LayerPosition, Position } from "./Position.js";

/**
 * Result of a pathfinding algorithm run.
 *
 * @category Pathfinding
 */
export interface PathfindingResult {
  steps: number;
  /**
   * Actual shortest path. Contains an empty array if no path has
   * been found.
   */
  path: LayerPosition[];

  /**
   * Only set, if {@link PathfindingOptions.calculateClosestToTarget} is set.
   * It will still be set in algorithms where it does not come with a
   * performance penalty (like BFS).
   * If no path could be found, it contains one position that has the closest
   * distance to the target. The distance is either
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   * in case of 4 direction mode or
   * {@link https://en.wikipedia.org/wiki/Chebyshev_distance | Chebyshev distance}
   * in case of 8 direction mode.
   */
  closestToTarget?: LayerPosition;

  /**
   * In case that {@link PathfindingOptions.maxPathLength} was set, this
   * property indicates that pathfinding stopped because it reached that maximum
   * path lenght.
   */
  reachedMaxPathLength: boolean;
}

/**
 * @category Pathfinding
 */
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

  /**
   * This setting is ignored if you provide a {@link FollowOptions.distance}
   * other than 0.
   *
   * An unblocked position adjacent to the target character with the shortest
   * distance to the source character (the one following) is taken as a target.
   * If there are multiple of these positions any one of them is picked.
   * With this setting you can give an explicit position based on the current
   * facing direction of the target character.
   *
   * For Example:
   * If you provide a {@link FollowOptions.facingDirection} of 'down', that
   * means that you want to follow the position the character is turned away
   * from. So if the target character's facing direction is `right`, that would
   * translate to this:
   * ```
   *   down-left  | left  | up-left
   *   down       | (=>)  | up
   *   down-right | right | up-right
   * ```
   */
  facingDirection?: Direction;

  /**
   * Function to specify whether a certain position is allowed for pathfinding.
   * If the function returns false, the tile will be consindered as blocked.
   *
   * It can be used to restrict pathfinding to specific regions.
   *
   * Beware that this method can become a performance bottleneck easily. So be
   * careful and keep it as efficient as possible. An asymptotic runtime
   * complexity of O(1) is recommended.
   */
  isPositionAllowedFn?: IsPositionAllowedFn;

  /**
   * Only considered by A* algorithm.
   * If set to `true`, pathfinding will consider costs. Costs are set via tile
   * properties.
   *
   * @default false
   */
  considerCosts?: boolean;

  /**
   * Set of characters to ignore at collision checking.
   */
  ignoredChars?: CharId[];
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
   *
   * @category Character
   */
  getCharLayer(charId: string): string | undefined;

  /**
   * @returns The character layer that the transition on the given position and
   * character layer leads to.
   *
   * @beta
   *
   * @category Tilemap
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
   *
   * @category Tilemap
   */
  setTransition(position: Position, fromLayer: string, toLayer: string): void;

  /**
   * @returns The tile position of the character with the given id
   *
   * @category Character
   */
  getPosition(charId: string): Position;
  /**
   * Initiates movement of the character with the given id. If the character is
   * already moving nothing happens. If the movement direction is currently
   * blocked, the character will only turn towards that direction. Movement
   * commands are **not** queued.
   *
   * @category Basic Movement
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
   *
   * @category Random Movement
   */
  moveRandomly(charId: string, delay: number, radius: number): void;

  /**
   * @returns Information about the current automatic movement (including
   * random movement, follow movement and target movement)
   *
   * @category Character
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
   *
   * @category Pathfinding
   */
  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig,
  ): Observable<{ charId: string } & Finished>;
  /**
   * Stops any automated movement such as random movement
   * ({@link moveRandomly}), following ({@link follow}), moving to a
   * specified position ({@link moveTo}) or queued movements ({@link addQueueMovements}).
   *
   * @category Character
   */
  stopMovement(charId: string): void;

  /**
   * Sets the speed in tiles per second for a character.
   *
   * @category Character
   */
  setSpeed(charId: string, speed: number): void;

  /**
   * @returns Speed in tiles per second for a character.
   *
   * @category Character
   */
  getSpeed(charId: string): number;

  /**
   * @returns true if the character is able to collide with the tilemap. Don't
   * confuse this with an actual collision check. You should use
   * {@link isBlocked} or {@link isTileBlocked} for this.
   *
   * @category Character
   */
  collidesWithTiles(charId: string): boolean;

  /**
   * @category Grid Engine
   */
  update(_time: number, delta: number): void;

  /**
   * Checks whether a character with the given ID is registered.
   *
   * @category Grid Engine
   */
  hasCharacter(charId: string): boolean;

  /**
   * Removes the character with the given ID from the plugin.
   * Please note that the corresponding sprite and container need to be removed
   * separately.
   *
   * @category Grid Engine
   */
  removeCharacter(charId: string): void;

  /**
   * Removes all characters from the plugin.
   * Please note that the corresponding sprites and containers need to be
   * removed separately.
   *
   * @category Grid Engine
   */
  removeAllCharacters(): void;

  /**
   * @returns All character IDs that are registered in the plugin, satisfying
   * the provided filtering options.
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[];

  /**
   * @returns All labels, attached to the character.
   *
   * @category Character
   */
  getLabels(charId: string): string[];

  /**
   * Add labels to the character.
   *
   * @category Character
   */
  addLabels(charId: string, labels: string[]): void;

  /**
   * Remove labels from the character.
   *
   * @category Character
   */
  removeLabels(charId: string, labels: string[]): void;

  /**
   * Removes all labels from the character.
   *
   * @category Character
   */
  clearLabels(charId: string): void;

  /**
   * Character `charId` will start to walk towards `charIdToFollow` on a
   * shortest path until it reaches the specified `distance`.
   *
   * @param charId ID of character that should follow
   * @param charIdToFollow ID of character that should be followed
   *
   * @category Pathfinding
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
    closestPointIfBlocked?: boolean,
  ): void;
  follow(
    charId: string,
    charIdToFollow: string,
    distance?: FollowOptions | number,
    closestPointIfBlocked?: boolean,
  ): void;
  /**
   * @returns True if the character is currently moving.
   *
   * @category Chatacter State
   */
  isMoving(charId: string): boolean;
  /**
   * @returns Direction the character is currently facing. At time of creation
   *  this is `down`.
   *
   * @category Character
   */
  getFacingDirection(charId: string): Direction;

  /**
   * @returns Position the character is currently facing.
   *
   * @category Character
   */
  getFacingPosition(charId: string): Position;

  /**
   * Turns the character towards the given direction without moving it.
   *
   * @category Basic Movement
   */
  turnTowards(charId: string, direction: Direction): void;

  /**
   * Finds the identifiers of all characters at the provided tile position.
   * @returns The identifiers of all characters on this tile.
   *
   * @category Tilemap
   */
  getCharactersAt(position: Position, layer?: string): string[];

  /**
   * Places the character with the given id to the provided tile position. If
   * that character is moving, the movement is stopped. The
   * {@link positionChangeStarted} and {@link positionChangeFinished} observables will
   * emit. If the character was moving, the {@link movementStopped} observable
   * will also emit.
   *
   * @category Character
   */
  setPosition(charId: string, pos: Position, layer?: string): void;

  /**
   * Checks whether the given position is blocked by either the tilemap or a
   * blocking character. If you provide no layer, be sure not to use character
   * layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap or a
   *  character
   *
   * @category Tilemap
   */
  isBlocked(
    position: Position,
    layer?: string,
    collisionGroups?: string[],
  ): boolean;

  /**
   * Checks whether the given position is blocked by the tilemap. If you provide
   * no layer, be sure not to use character layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap.
   *
   * @category Tilemap
   */
  isTileBlocked(position: Position, layer?: string): boolean;

  /**
   * Returns all collision groups of the given character.
   * {@link https://annoraaq.github.io/grid-engine/examples/collision-groups | Collision Groups Example}
   *
   * @returns All collision groups of the given character.
   *
   * @category Character
   */
  getCollisionGroups(charId: string): string[];

  /**
   * Sets collision groups for the given character. Previous collision groups
   * will be overwritten.
   *
   * @category Character
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void;

  /**
   * Sets collision groups for the given character. Previous collision groups
   * will be overwritten.
   *
   * @category Character
   */
  setIgnoreCollisionGroups(
    charId: string,
    ignoreCollisionGroups: string[],
  ): void;

  /**
   * Returns all collision groups the character should ignore.
   *
   * @category Character
   */
  getIgnoreCollisionGroups(charId: string): string[];

  /**
   * Gets the tile position and character layer adjacent to the given
   * position in the given direction.
   *
   * @category Tilemap
   */
  getTilePosInDirection(
    position: Position,
    charLayer: string | undefined,
    direction: Direction,
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
   *
   * @category Pathfinding
   */
  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    options?: PathfindingOptions,
  ): PathfindingResult;

  /**
   * @returns Observable that, whenever a specified position is entered on optionally provided layers,
   *  will notify with the target characters position change
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
  >;

  /**
   * @returns Observable that emits when a new character is added or an existing is removed.
   *
   * @category Grid Engine
   */
  characterShifted(): Observable<CharacterShift>;

  /**
   * @returns Observable that on each start of a movement will provide the
   *  character ID and the direction.
   *
   * @category Character
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }>;

  /**
   * @returns Observable that on each stopped movement of a character will
   *  provide it’s ID and the direction of that movement.
   *
   * @category Character
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
   *
   * @category Character
   */
  directionChanged(): Observable<{ charId: string; direction: Direction }>;

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the beginning of the movement.
   *
   * @category Character
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange>;

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the end of the movement.
   *
   * @category Character
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange>;

  /**
   * Returns the movement progress (0-1000) of a character to the next tile. For
   * example, if a character has movement progress 400 that means that it has
   * moved 400/1000th of the distance to the next tile already.
   *
   * @category Character
   */
  getMovementProgress(charId: string): number;

  /**
   * Refresh the tile collision cache. For performance reasons, you should
   * provide an area that needs to be rebuilt, if possible. You need to have
   * {@link GridEngineConfigHeadless.cacheTileCollisions} enabled.
   *
   * For more information on pathfinding performance check out
   * {@link https://annoraaq.github.io/grid-engine/p/pathfinding-performance/| pathfinding performance}.
   *
   * @category Grid Engine
   */
  rebuildTileCollisionCache(
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;

  /**
   * Adds new positions to the movement queue. Any other automatic movement of
   * the character will be stopped.
   * @param charId
   * @param positions Positions to enqueue
   * @param options Options for the queue movement. These options take effect
   *  immediately (also for previously enqueued but not yet executed movements).
   *
   * @category Queue Movement
   */
  addQueueMovements(
    charId: string,
    positions: Array<LayerPosition | Direction>,
    options?: QueueMovementConfig,
  );

  /**
   * Returns all enqueued movements for the given character.
   *
   * @category Queue Movement
   */
  getEnqueuedMovements(charId: string): QueueMovementEntry[];

  /**
   * Clears the complete movement queue for the character, that was filled by
   * using {@link IGridEngine.addQueueMovements}.
   *
   * @category Queue Movement
   */
  clearEnqueuedMovements(charId: string): void;

  /**
   * Emits whenever queued movements for a character finish (with success or
   * failure).
   *
   * @category Queue Movement
   */
  queueMovementFinished(): Observable<
    { charId: string } & QueueMovementFinished
  >;

  /**
   * Returns the {@link https://annoraaq.github.io/grid-engine/p/tile-properties/#pathfinding-costs | tile cost}
   * for a position.
   *
   * @category Pathfinding
   */
  getTileCost(
    position: Position,
    charLayer?: string,
    srcDirection?: Direction,
  ): number;
}
