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
  GridEngineConfigHeadless,
  CollisionConfig,
  CharacterDataHeadless,
} from "./GridEngineHeadless";
import { GridTilemapPhaser } from "./GridEnginePhaser/GridTilemapPhaser/GridTilemapPhaser";
import { PhaserTilemap } from "./GridTilemap/Phaser/PhaserTilemap";
import { Orientation, Tile, TileLayer, Tilemap } from "./GridTilemap/Tilemap";
import { PhaserTileLayer } from "./GridTilemap/Phaser/PhaserTileLayer";
import { PhaserTile } from "./GridTilemap/Phaser/PhaserTile";
import {
  QueueMovementConfig,
  QueuedPathBlockedStrategy,
  Finished as QueueMovementFinished,
  QueueMovementResult,
  QueueMovementEntry,
} from "./Movement/QueueMovement/QueueMovement";
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
  CharacterDataHeadless,
  CharacterFilteringOptions,
  CharacterShift,
  CharacterShiftAction,
  CharLayer,
  CollisionConfig,
  CollisionStrategy,
  Direction,
  Finished,
  FollowOptions,
  FrameRow,
  GridEngineConfigHeadless,
  GridEngineHeadless,
  IGridEngine,
  IsPositionAllowedFn,
  LayerPosition,
  MovementInfo,
  MoveToConfig,
  MoveToResult,
  NoPathFoundStrategy,
  NumberOfDirections,
  Orientation,
  PathBlockedStrategy,
  PathfindingOptions,
  PathfindingResult,
  Position,
  PositionChange,
  PhaserTile,
  PhaserTileLayer,
  PhaserTilemap,
  QueueMovementConfig,
  QueueMovementEntry,
  QueueMovementFinished,
  QueueMovementResult,
  QueuedPathBlockedStrategy,
  ShortestPathAlgorithmType,
  Tile,
  TileLayer,
  Tilemap,
  TileSizePerSecond,
};

/**
 * Configuration object for initializing GridEngine.
 */
export interface GridEngineConfig extends GridEngineConfigHeadless {
  /** An array of character data. Each describing a character on the map. */
  characters: CharacterData[];

  /**
   * Enables experimental
   * {@link https://annoraaq.github.io/grid-engine/p/layer-overlay/ | layer overlay feature}.
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
   * {@link https://github.com/Annoraaq/grid-engine/raw/master/images/charIndex.png | example image showing the character indices}.
   * In case of {@link WalkingAnimationMapping}: Alternatively to providing a
   * characterIndex you can also provide a custom frame mapping. This is
   * especially handy if your spritesheet has a different arrangement of frames
   * than you can see in the {@link https://github.com/Annoraaq/grid-engine/raw/master/images/charIndex.png  | example image}
   * (4 rows with 3 columns). You can provide the frame number for every state
   * of the character.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/example/custom-walking-animation-mapping/ | custom walking animation mapping example}.
   */
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;

  /**
   * A container that holds the character’s sprite. This can be used in order
   * to move more game objects along with the sprite (for example a character’s
   * name or health bar). In order to position the container correctly on the
   * tiles, it is necessary that you position the character’s sprite on
   * position (0, 0) in the container.
   *
   * For more details see the {@link https://annoraaq.github.io/grid-engine/example/phaser-containers/ | container example}.
   */
  container?: Phaser.GameObjects.Container;

  /**
   * A custom x-offset for the sprite/container.
   *
   * @defaultValue `0`
   */
  offsetX?: number;

  /**
   * A custom y-offset for the sprite/container.
   *
   * @defaultValue `0`
   */
  offsetY?: number;
}

export class GridEngine implements IGridEngine {
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

  /** {@inheritDoc IGridEngine.getCharLayer} */
  getCharLayer(charId: string): string | undefined {
    return this.geHeadless.getCharLayer(charId);
  }

  /** {@inheritDoc IGridEngine.getTransition} */
  getTransition(position: Position, fromLayer: string): string | undefined {
    return this.geHeadless.getTransition(position, fromLayer);
  }

  /** {@inheritDoc IGridEngine.setTransition} */
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
    this.gridTilemap = new GridTilemapPhaser(tilemap);

    this.addCharacters();
  }

  /** {@inheritDoc IGridEngine.getPosition} */
  getPosition(charId: string): Position {
    return this.geHeadless.getPosition(charId);
  }

  /** {@inheritDoc IGridEngine.move} */
  move(charId: string, direction: Direction): void {
    this.geHeadless.move(charId, direction);
  }

  /** {@inheritDoc IGridEngine.moveRandomly} */
  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.geHeadless.moveRandomly(charId, delay, radius);
  }

  /** {@inheritDoc IGridEngine.getMovement} */
  getMovement(charId: string): MovementInfo {
    return this.geHeadless.getMovement(charId);
  }

  /** {@inheritDoc IGridEngine.moveTo} */
  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig
  ): Observable<{ charId: string } & Finished> {
    return this.geHeadless.moveTo(charId, targetPos, config);
  }

  /** {@inheritDoc IGridEngine.stopMovement} */
  stopMovement(charId: string): void {
    this.geHeadless.stopMovement(charId);
  }

  /** {@inheritDoc IGridEngine.setSpeed} */
  setSpeed(charId: string, speed: number): void {
    this.geHeadless.setSpeed(charId, speed);
  }

  /** {@inheritDoc IGridEngine.getSpeed} */
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

  /** {@inheritDoc IGridEngine.collidesWithTiles} */
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
   * @returns `true` if {@link https://annoraaq.github.io/grid-engine/p/layer-overlay/ | layer overlay}
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

  /** {@inheritDoc IGridEngine.hasCharacter} */
  hasCharacter(charId: string): boolean {
    return this.geHeadless.hasCharacter(charId);
  }

  /** {@inheritDoc IGridEngine.removeCharacter} */
  removeCharacter(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.destroy();
    this.gridCharacters?.delete(charId);

    this.geHeadless.removeCharacter(charId);
  }

  /** {@inheritDoc IGridEngine.removeAllCharacters} */
  removeAllCharacters(): void {
    this.initGuard();
    if (!this.gridCharacters) return;
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }

    this.geHeadless.removeAllCharacters();
  }

  /** {@inheritDoc IGridEngine.getAllCharacters} */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    return this.geHeadless.getAllCharacters(options);
  }

  /** {@inheritDoc IGridEngine.getLabels} */
  getLabels(charId: string): string[] {
    return this.geHeadless.getLabels(charId);
  }

  /** {@inheritDoc IGridEngine.addLabels} */
  addLabels(charId: string, labels: string[]): void {
    this.geHeadless.addLabels(charId, labels);
  }

  /** {@inheritDoc IGridEngine.removeLabels} */
  removeLabels(charId: string, labels: string[]): void {
    this.geHeadless.removeLabels(charId, labels);
  }

  /** {@inheritDoc IGridEngine.clearLabels} */
  clearLabels(charId: string): void {
    this.geHeadless.clearLabels(charId);
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
    this.geHeadless.follow(charId, charIdToFollow, options);
  }

  /** {@inheritDoc IGridEngine.isMoving} */
  isMoving(charId: string): boolean {
    return this.geHeadless.isMoving(charId);
  }

  /** {@inheritDoc IGridEngine.getFacingDirection} */
  getFacingDirection(charId: string): Direction {
    return this.geHeadless.getFacingDirection(charId);
  }

  /** {@inheritDoc IGridEngine.getFacingPosition} */
  getFacingPosition(charId: string): Position {
    return this.geHeadless.getFacingPosition(charId);
  }

  /** {@inheritDoc IGridEngine.turnTowards} */
  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.turnTowards(direction);
    this.geHeadless.turnTowards(charId, direction);
  }

  /** {@inheritDoc IGridEngine.getCharactersAt} */
  getCharactersAt(position: Position, layer: string): string[] {
    return this.geHeadless.getCharactersAt(position, layer);
  }

  /** {@inheritDoc IGridEngine.setPosition} */
  setPosition(charId: string, pos: Position, layer?: string): void {
    this.geHeadless.setPosition(charId, pos, layer);
  }

  /**
   * @returns Sprite of given character
   */
  getSprite(charId: string): Phaser.GameObjects.Sprite | undefined {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    return gridCharPhaser.getSprite();
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

  /** {@inheritDoc IGridEngine.isBlocked} */
  isBlocked(
    position: Position,
    layer?: string,
    collisionGroups: string[] = ["geDefault"]
  ): boolean {
    return this.geHeadless.isBlocked(position, layer, collisionGroups);
  }

  /** {@inheritDoc IGridEngine.isTileBlocked} */
  isTileBlocked(position: Position, layer?: string): boolean {
    return this.geHeadless.isTileBlocked(position, layer);
  }

  /** {@inheritDoc IGridEngine.getCollisionGroups} */
  getCollisionGroups(charId: string): string[] {
    return this.geHeadless.getCollisionGroups(charId);
  }

  /** {@inheritDoc IGridEngine.setCollisionGroups} */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.geHeadless.setCollisionGroups(charId, collisionGroups);
  }

  /** {@inheritDoc IGridEngine.getTilePosInDirection} */
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
   * {@inheritDoc IGridEngine.findShortestPath}
   * @alpha
   */
  findShortestPath(
    source: LayerPosition,
    dest: LayerPosition,
    options: PathfindingOptions = {}
  ): PathfindingResult {
    return this.geHeadless.findShortestPath(source, dest, options);
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
    return this.geHeadless.steppedOn(charIds, tiles, layer);
  }

  /** {@inheritDoc IGridEngine.characterShifted} */
  characterShifted(): Observable<CharacterShift> {
    return this.geHeadless.characterShifted();
  }

  /** {@inheritDoc IGridEngine.movementStarted} */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStarted();
  }

  /** {@inheritDoc IGridEngine.movementStopped} */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStopped();
  }

  /** {@inheritDoc IGridEngine.directionChanged} */
  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.directionChanged();
  }

  /** {@inheritDoc IGridEngine.positionChangeStarted} */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeStarted();
  }

  /** {@inheritDoc IGridEngine.positionChangeFinished} */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeFinished();
  }

  /** {@inheritDoc IGridEngine.getMovementProgress} */
  getMovementProgress(charId: string): number {
    return this.geHeadless.getMovementProgress(charId);
  }

  /** {@inheritDoc IGridEngine.rebuildTileCollisionCache} */
  rebuildTileCollisionCache(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.geHeadless.rebuildTileCollisionCache(x, y, width, height);
  }

  /** {@inheritDoc IGridEngine.addQueueMovements} */
  addQueueMovements(
    charId: string,
    positions: Array<LayerPosition | Direction>,
    options?: QueueMovementConfig
  ): void {
    this.geHeadless.addQueueMovements(charId, positions, options);
  }

  /** {@inheritDoc IGridEngine.getEnqueuedMovements} */
  getEnqueuedMovements(charId: string): QueueMovementEntry[] {
    return this.geHeadless.getEnqueuedMovements(charId);
  }

  /** {@inheritDoc IGridEngine.queueMovementFinished} */
  queueMovementFinished(): Observable<
    { charId: string } & QueueMovementFinished
  > {
    return this.geHeadless.queueMovementFinished();
  }

  /** {@inheritDoc IGridEngine.clearEnqueuedMovements} */
  clearEnqueuedMovements(charId: string): void {
    return this.geHeadless.clearEnqueuedMovements(charId);
  }

  private setConfigDefaults(
    config: GridEngineConfig
  ): Concrete<GridEngineConfig> {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      layerOverlay: false,
      cacheTileCollisions: false,
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

  private setCharSprite(
    sprite: Phaser.GameObjects.Sprite,
    gridCharPhaser: GridCharacterPhaser
  ) {
    gridCharPhaser.setSprite(sprite);
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
}
