import { GridCharacterPhaser } from "./GridEnginePhaser/GridCharacterPhaser/GridCharacterPhaser";
import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import {
  Finished,
  MoveToConfig,
  MoveToResult,
} from "./Movement/TargetMovement/TargetMovement";
import { PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { Concrete } from "./Utils/TypeUtils";
import { MovementInfo } from "./Movement/Movement";
import {
  CharacterIndex,
  FrameRow,
} from "./GridCharacter/CharacterAnimation/CharacterAnimation";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter";

import { version as VERSION } from "../package.json";
import {
  IsPositionAllowedFn,
  PathfindingOptions,
} from "./Pathfinding/Pathfinding";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm";
import {
  GridEngineHeadless,
  TileSizePerSecond,
  Position,
  LayerPosition,
  CharLayer,
  GridEngineConfig as GridEngineConfigHeadless,
  CollisionConfig,
  CharacterData as CharacterDataHeadless,
  CharacterShift,
  CharacterShiftAction,
} from "./GridEngineHeadless";
import { GridTilemapPhaser } from "./GridEnginePhaser/GridTilemapPhaser/GridTilemapPhaser";
import { PhaserTilemap } from "./GridTilemap/Phaser/PhaserTilemap";

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
  GridEngineHeadless,
  TileSizePerSecond,
  Position,
  LayerPosition,
  CharLayer,
  CollisionConfig,
  CharacterShift,
  CharacterShiftAction,
};

/**
 * Configuration object for initializing GridEngine.
 */
export interface GridEngineConfig extends GridEngineConfigHeadless {
  /** An array of character data. Each describing a character on the map. */
  characters: CharacterData[];

  /**
   * Enables experimental
   * {@link https://annoraaq.github.io/grid-engine/features/layer-overlay | layer overlay feature}.
   *
   * @defaultValue `false`
   *
   * @beta
   */
  layerOverlay?: boolean;
}

export interface WalkingAnimationMapping {
  /** FrameRow for moving up */
  [Direction.UP]: FrameRow;
  /** FrameRow for moving right */
  [Direction.RIGHT]: FrameRow;
  /** FrameRow for moving down */
  [Direction.DOWN]: FrameRow;
  /** FrameRow for moving left */
  [Direction.LEFT]: FrameRow;
  /** FrameRow for moving up-left */
  [Direction.UP_LEFT]?: FrameRow;
  /** FrameRow for moving up-right */
  [Direction.UP_RIGHT]?: FrameRow;
  /** FrameRow for moving down-left */
  [Direction.DOWN_LEFT]?: FrameRow;
  /** FrameRow for moving down-right */
  [Direction.DOWN_RIGHT]?: FrameRow;
}

/** Configuration object used to initialize a new character in GridEngine. */
export interface CharacterData extends CharacterDataHeadless {
  /** The character’s sprite. */
  sprite?: Phaser.GameObjects.Sprite;

  /**
   * If not set, automatic walking animation will be disabed. Do this if you
   * want to use a custom animation. In case of number: The 0-based index of
   * the character on the spritesheet. Here is an
   * {@link https://annoraaq.github.io/grid-engine/img/charIndex.png | example image showing the character indices}.
   * In case of {@link WalkingAnimationMapping}: Alternatively to providing a
   * characterIndex you can also provide a custom frame mapping. This is
   * especially handy if your spritesheet has a different arrangement of frames
   * than you can see in the {@link https://annoraaq.github.io/grid-engine/img/charIndex.png | example image}
   * (4 rows with 3 columns). You can provide the frame number for every state
   * of the character.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/examples/custom-walking-animation-mapping.html | custom walking animation mapping example}.
   */
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;

  /**
   * A container that holds the character’s sprite. This can be used in order
   * to move more game objects along with the sprite (for example a character’s
   * name or health bar). In order to position the container correctly on the
   * tiles, it is necessary that you position the character’s sprite on
   * position (0, 0) in the container.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/examples/phaser-container | container example}.
   */
  container?: Phaser.GameObjects.Container;

  /**
   * A custom x-offset for the sprite/container.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/examples/custom-offset | custom offset example}.
   *
   * @defaultValue `0`
   */
  offsetX?: number;

  /**
   * A custom y-offset for the sprite/container.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/examples/custom-offset | custom offset example}.
   *
   * @defaultValue `0`
   */
  offsetY?: number;
}

export class GridEngine {
  private geHeadless: GridEngineHeadless = new GridEngineHeadless();
  private config?: Concrete<GridEngineConfig>;
  private gridCharacters?: Map<string, GridCharacterPhaser>;
  private gridTilemap?: GridTilemapPhaser;
  private isCreatedInternal = false;

  /**
   * Should only be called by Phaser and never directly.
   * @internal
   */
  constructor(private scene: Phaser.Scene) {
    console.log(`Using GridEngine Phaser Plugin v${VERSION}`);
    this.scene.sys.events.once("boot", this.boot, this);
  }

  /** @internal */
  boot(): void {
    this.scene.sys.events.on("update", this.update, this);
  }

  /**
   * Returns the character layer of the given character.
   * You can read more about character layers and transitions
   * {@link https://annoraaq.github.io/grid-engine/p/character-layers | here}
   */
  getCharLayer(charId: string): string | undefined {
    return this.geHeadless.getCharLayer(charId);
  }

  /**
   * @returns The character layer that the transition on the given position and
   * character layer leads to.
   *
   * @beta
   */
  getTransition(position: Position, fromLayer: string): string | undefined {
    return this.geHeadless.getTransition(position, fromLayer);
  }

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
  setTransition(position: Position, fromLayer: string, toLayer: string): void {
    this.geHeadless.setTransition(position, fromLayer, toLayer);
  }

  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   */
  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void {
    this.geHeadless.create(new PhaserTilemap(tilemap), config);
    this.isCreatedInternal = true;
    this.gridCharacters = new Map();

    const concreteConfig = this.setConfigDefaults(config);

    this.config = concreteConfig;
    this.gridTilemap = new GridTilemapPhaser(
      tilemap,
      this.config.collisionTilePropertyName,
      this.config.characterCollisionStrategy
    );

    this.addCharacters();
  }

  /**
   * @returns The tile position of the character with the given id
   */
  getPosition(charId: string): Position {
    return this.geHeadless.getPosition(charId);
  }

  /**
   * Initiates movement of the character with the given id. If the character is
   * already moving nothing happens. If the movement direction is currently
   * blocked, the character will only turn towards that direction. Movement
   * commands are **not** queued.
   */
  move(charId: string, direction: Direction): void {
    this.geHeadless.move(charId, direction);
  }

  /**
   * Initiates random movement of the character with the given id. The
   * character will randomly pick one of the non-blocking directions.
   * Optionally a `delay` in milliseconds can be provided. This represents the
   * waiting time after a finished movement, before the next is being initiated.
   * If a `radius` other than -1 is provided, the character will not move
   * further than that radius from its initial position (the position it has
   * been, when `moveRandomly` was called). The distance is calculated with the
   * {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   * . Additionally, if a `radius` other than -1 was given, the character might
   * move more than one tile into a random direction in one run (as long as the
   * route is neither blocked nor outside of the radius).
   */
  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.geHeadless.moveRandomly(charId, delay, radius);
  }

  /**
   * @returns Information about the current automatic movement (including
   * random movement, follow movement and target movement)
   */
  getMovement(charId: string): MovementInfo {
    return this.geHeadless.getMovement(charId);
  }

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
  ): Observable<{ charId: string } & Finished> {
    return this.geHeadless.moveTo(charId, targetPos, config);
  }

  /**
   * Stops any automated movement such as random movement
   * ({@link moveRandomly}), following ({@link follow}) or moving to a
   * specified position ({@link moveTo})
   */
  stopMovement(charId: string): void {
    this.geHeadless.stopMovement(charId);
  }

  /** Sets the speed in tiles per second for a character. */
  setSpeed(charId: string, speed: number): void {
    this.geHeadless.setSpeed(charId, speed);
  }

  /** @returns Speed in tiles per second for a character. */
  getSpeed(charId: string): number {
    return this.geHeadless.getSpeed(charId);
  }

  /** @returns Container for a character. */
  getContainer(charId: string): Phaser.GameObjects.Container | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getContainer();
  }

  /** @returns X-offset for a character. */
  getOffsetX(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetX();
  }

  /** @returns Y-offset for a character. */
  getOffsetY(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetY();
  }

  /** @returns Whether character collides with tiles */
  collidesWithTiles(charId: string): boolean {
    return this.geHeadless.collidesWithTiles(charId);
  }

  /**
   * @returns {@link WalkingAnimationMapping} for a character. If a character
   * index was set, it will be returned instead.
   */
  getWalkingAnimationMapping(
    charId: string
  ): WalkingAnimationMapping | number | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const animation = gridChar.getAnimation();
    return animation?.getWalkingAnimationMapping();
  }

  /**
   * @returns `true` if {@link https://annoraaq.github.io/grid-engine/features/layer-overlay | layer overlay}
   * is activated.
   */
  hasLayerOverlay(): boolean {
    this.initGuard();
    return !!this.config?.layerOverlay;
  }

  /**
   * Sets the {@link WalkingAnimationMapping} for a character. Alternatively you
   * can provide a number which is the character index (see also
   * {@link CharacterData | Character Config}). If you provide `undefined`, it
   * will disable walking animations for the character.
   */
  setWalkingAnimationMapping(
    charId: string,
    walkingAnimationMapping?: WalkingAnimationMapping | number
  ): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);

    const animation = gridChar.getAnimation();
    animation?.setWalkingAnimationMapping(walkingAnimationMapping);
  }

  /** @internal */
  update(time: number, delta: number): void {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
    this.geHeadless.update(time, delta);
  }

  /** Adds a character after calling {@link create}. */
  addCharacter(charData: CharacterData): void {
    this.geHeadless.addCharacter(charData);
    this.addCharacterInternal(charData);
  }

  private addCharacterInternal(charData: CharacterData): void {
    this.initGuard();
    if (!this.gridTilemap) throw this.createUninitializedErr();
    if (!this.config) throw this.createUninitializedErr();

    const gridCharPhaser = new GridCharacterPhaser(
      charData,
      this.scene,
      this.gridTilemap,
      this.config.layerOverlay,
      this.geHeadless
    );

    this.gridCharacters?.set(charData.id, gridCharPhaser);
  }

  /** Checks whether a character with the given ID is registered. */
  hasCharacter(charId: string): boolean {
    return this.geHeadless.hasCharacter(charId);
  }

  /**
   * Removes the character with the given ID from the plugin.
   * Please note that the corresponding sprites need to be remove separately.
   */
  removeCharacter(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.destroy();
    this.gridCharacters?.delete(charId);

    this.geHeadless.removeCharacter(charId);
  }

  /**
   * Removes all characters from the plugin.
   * Please note that the corresponding sprites need to be remove separately.
   */
  removeAllCharacters(): void {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }

    this.geHeadless.removeAllCharacters();
  }

  /**
   * @returns All character IDs that are registered in the plugin, satisfying
   * the provided filtering options.
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    return this.geHeadless.getAllCharacters(options);
  }

  /**
   * @returns All labels, attached to the character.
   */
  getLabels(charId: string): string[] {
    return this.geHeadless.getLabels(charId);
  }

  /**
   * Add labels to the character.
   */
  addLabels(charId: string, labels: string[]): void {
    this.geHeadless.addLabels(charId, labels);
  }

  /**
   * Remove labels from the character.
   */
  removeLabels(charId: string, labels: string[]): void {
    this.geHeadless.removeLabels(charId, labels);
  }

  /**
   * Removes all labels from the character.
   */
  clearLabels(charId: string): void {
    this.geHeadless.clearLabels(charId);
  }

  /**
   * Character `charId` will start to walk towards `charIdToFollow` on a
   * shortest path until it reaches the specified `distance`.
   *
   * @param charId ID of character that should follow
   * @param charIdToFollow ID of character that should be followed
   * @param distance Minimum distance to keep to `charIdToFollow` in
   *  {@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance}
   * @param closestPointIfBlocked `charId` will move to the closest point
   *  ({@link https://en.wikipedia.org/wiki/Taxicab_geometry | manhattan distance})
   * to `charIdToFollow` that is reachable from `charId` in case that there does
   * not exist a path between `charId` and `charIdToFollow`.
   */
  follow(
    charId: string,
    charIdToFollow: string,
    distance = 0,
    closestPointIfBlocked = false
  ): void {
    this.geHeadless.follow(
      charId,
      charIdToFollow,
      distance,
      closestPointIfBlocked
    );
  }

  /**
   * @returns True if the character is currently moving.
   */
  isMoving(charId: string): boolean {
    return this.geHeadless.isMoving(charId);
  }

  /**
   * @returns Direction the character is currently facing. At time of creation
   *  this is `down`.
   */
  getFacingDirection(charId: string): Direction {
    return this.geHeadless.getFacingDirection(charId);
  }

  /**
   * @returns Position the character is currently facing.
   */
  getFacingPosition(charId: string): Position {
    return this.geHeadless.getFacingPosition(charId);
  }

  /**
   * Turns the character towards the given direction without moving it.
   */
  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.turnTowards(direction);
    this.geHeadless.turnTowards(charId, direction);
  }

  /**
   * Finds the identifiers of all characters at the provided tile position.
   * @returns The identifiers of all characters on this tile.
   */
  getCharactersAt(position: Position, layer: string): string[] {
    return this.geHeadless.getCharactersAt(position, layer);
  }

  /**
   * Places the character with the given id to the provided tile position. If
   * that character is moving, the movement is stopped. The
   * {@link positionChangeStarted} and {@link positionChangeFinished} observables will
   * emit. If the character was moving, the {@link movementStopped} observable
   * will also emit.
   */
  setPosition(charId: string, pos: Position, layer?: string): void {
    this.geHeadless.setPosition(charId, pos, layer);
  }

  /**
   * @returns Sprite of given character
   */
  getSprite(charId: string): Phaser.GameObjects.Sprite | undefined {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    const gridChar = gridCharPhaser;
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridCharPhaser?.getSprite();
  }

  /**
   * Sets the sprite for a character.
   */
  setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    sprite.setOrigin(0, 0);

    this.setCharSprite(sprite, gridCharPhaser);
  }

  private setCharSprite(
    sprite: Phaser.GameObjects.Sprite,
    gridCharPhaser: GridCharacterPhaser
  ) {
    gridCharPhaser.setSprite(sprite);
  }

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
    collisionGroups: string[] = ["geDefault"]
  ): boolean {
    return this.geHeadless.isBlocked(position, layer, collisionGroups);
  }

  /**
   * Checks whether the given position is blocked by the tilemap. If you provide
   * no layer, be sure not to use character layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap.
   */
  isTileBlocked(position: Position, layer?: string): boolean {
    return this.geHeadless.isTileBlocked(position, layer);
  }

  /**
   * Returns all collision groups of the given character.
   * {@link https://annoraaq.github.io/grid-engine/examples/collision-groups | Collision Groups Example}
   *
   * @returns All collision groups of the given character.
   */
  getCollisionGroups(charId: string): string[] {
    return this.geHeadless.getCollisionGroups(charId);
  }

  /**
   * Sets collision groups for the given character. Previous collision groups
   * will be overwritten.
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.geHeadless.setCollisionGroups(charId, collisionGroups);
  }

  /**
   * Gets the tile position and character layer adjacent to the given
   * position in the given direction.
   */
  getTilePosInDirection(
    position: Position,
    charLayer: string | undefined,
    direction: Direction
  ): LayerPosition {
    return this.geHeadless.getTilePosInDirection(
      position,
      charLayer,
      direction
    );
  }

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
    options: PathfindingOptions = {}
  ): { path: LayerPosition[]; closestToTarget: LayerPosition } {
    return this.geHeadless.findShortestPath(source, dest, options);
  }

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
  > {
    return this.geHeadless.steppedOn(charIds, tiles, layer);
  }

  /**
   * @returns Observable that emits when a new character is added or an existing is removed.
   */
  characterShifted(): Observable<CharacterShift> {
    return this.geHeadless.characterShifted();
  }

  /**
   * @returns Observable that on each start of a movement will provide the
   *  character ID and the direction.
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStarted();
  }

  /**
   * @returns Observable that on each stopped movement of a character will
   *  provide it’s ID and the direction of that movement.
   */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStopped();
  }

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
  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.directionChanged();
  }

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the beginning of the movement.
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeStarted();
  }

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the end of the movement.
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeFinished();
  }

  /**
   * Returns the movement progress (0-1000) of a character to the next tile. For
   * example, if a character has movement progress 400 that means that it has
   * moved 400/1000th of the distance to the next tile already.
   */
  getMovementProgress(charId: string): number {
    return this.geHeadless.getMovementProgress(charId);
  }

  private setConfigDefaults(
    config: GridEngineConfig
  ): Concrete<GridEngineConfig> {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      layerOverlay: false,
      ...config,
    };
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
    this.config?.characters.forEach((charData) =>
      this.addCharacterInternal(charData)
    );
  }

  private createCharUnknownErr(charId: string): Error {
    return new Error(`Character unknown: ${charId}`);
  }
}
