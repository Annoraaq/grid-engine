import { GridCharacterPhaser } from "./GridEnginePhaser/GridCharacterPhaser/GridCharacterPhaser.js";
import { CollisionStrategy } from "./Collisions/CollisionStrategy.js";
import {
  Finished,
  MoveToConfig,
  MoveToInfo,
  MoveToResult,
} from "./Movement/TargetMovement/TargetMovement.js";
import { PositionChange } from "./GridCharacter/GridCharacter.js";
import {
  Direction,
  NumberOfDirections,
  directionFromPos,
} from "./Direction/Direction.js";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy.js";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy.js";
import { MovementInfo } from "./Movement/Movement.js";
import {
  CharacterIndex,
  FrameRow,
} from "./GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter.js";

import { version as VERSION } from "../package.json";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm.js";
import {
  GridEngineHeadless,
  TileSizePerSecond,
  GridEngineConfigHeadless,
  CollisionConfig,
  CharacterDataHeadless,
} from "./GridEngineHeadless.js";
import { GridTilemapPhaser } from "./GridEnginePhaser/GridTilemapPhaser/GridTilemapPhaser.js";
import {
  PhaserTilemap,
  TiledProject,
} from "./GridTilemap/Phaser/PhaserTilemap.js";
import {
  Orientation,
  Tile,
  TileLayer,
  Tilemap,
} from "./GridTilemap/Tilemap.js";
import { PhaserTileLayer } from "./GridTilemap/Phaser/PhaserTileLayer.js";
import { PhaserTile } from "./GridTilemap/Phaser/PhaserTile.js";
import {
  QueueMovementConfig,
  QueuedPathBlockedStrategy,
  Finished as QueueMovementFinished,
  QueueMovementResult,
  QueueMovementEntry,
} from "./Movement/QueueMovement/QueueMovement.js";
import {
  CharacterShift,
  CharacterShiftAction,
  FollowOptions,
  IGridEngine,
  PathfindingResult,
} from "./IGridEngine.js";
import {
  ArrayTilemap,
  ArrayTilemapInputLayer,
} from "./GridTilemap/ArrayTilemap/ArrayTilemap.js";
import { TiledTilemap } from "./GridTilemap/TiledTilemap/TiledTilemap.js";
import { TiledLayer } from "./GridTilemap/TiledTilemap/TiledLayer.js";
import { TiledTile } from "./GridTilemap/TiledTilemap/TiledTile.js";
import { GridEngineState } from "./GridEngineState.js";
import { GridCharacterState } from "./GridCharacter/GridCharacterState.js";
import { GridEngineStatePhaser } from "./GridEnginePhaser/GridEngineStatePhaser.js";
import {
  IsPositionAllowedFn,
  PathfindingOptions,
} from "./Pathfinding/PathfindingOptions.js";
import { CharLayer, LayerPosition, Position } from "./Position.js";
import { Concrete } from "./Utils/TypeUtils.js";
import { GridCharacterStatePhaser } from "./GridEnginePhaser/GridCharacterStatePhaser.js";
import {
  RawTiledLayer,
  RawTiledTileset,
  RawTiledTilesetTile,
  RawTiledTilesetTileProp,
} from "./GridTilemap/TiledTilemap/TiledMap.js";

export {
  ArrayTilemap,
  ArrayTilemapInputLayer,
  CharacterDataHeadless,
  CharacterFilteringOptions,
  CharacterShift,
  CharacterShiftAction,
  CharLayer,
  CollisionConfig,
  CollisionStrategy,
  Concrete,
  Direction,
  Finished,
  FollowOptions,
  FrameRow,
  GridCharacterState,
  GridCharacterStatePhaser,
  GridEngineConfigHeadless,
  GridEngineHeadless,
  GridEngineState,
  GridEngineStatePhaser,
  IGridEngine,
  IsPositionAllowedFn,
  LayerPosition,
  MovementInfo,
  MoveToConfig,
  MoveToInfo,
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
  RawTiledLayer,
  RawTiledTileset,
  RawTiledTilesetTile,
  RawTiledTilesetTileProp,
  ShortestPathAlgorithmType,
  Tile,
  TiledProject,
  TiledTilemap,
  TiledLayer,
  TiledTile,
  TileLayer,
  Tilemap,
  TileSizePerSecond,
  directionFromPos,
};

/**
 * Configuration object for initializing GridEngine.
 *
 * @category Configuration
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

  /**
   * Object, parsed from Tiled project file. This is used to provide Tiled
   * project features like tile classes.
   */
  tiledProject?: TiledProject;
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

/**
 * Configuration object used to initialize a new character in GridEngine.
 *
 * @category Configuration
 */
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
   * If you pass both, a container and a sprite, only the container's pixel
   * position will be changed on movement. That is only relevant if you pass a
   * sprite that is not included in the container.
   *
   * The height of the container is needed for depth sorting. Because
   * calculating the container height is an expensive operation, it will be
   * cached in Grid Engine. If you change the height of the container, make sure
   * to set it to for character again to refresh the cached height.
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

  /**
   * A custom y-offset for the sprite/container depth. In GridEngine the depth
   * sorting of characters depends on their character layer and on their y pixel
   * position. By setting a depthOffset you can change the y pixel position for
   * the depth sorting without changing the actual y pixel position.
   *
   * For example: Consider two characters A and B that are on the same character
   * layer. If char A is on y pixel position 100 and char B is on y pixel
   * position 120, then char B would be rendered in front of char A. If you set
   * `depthOffset = -50` for char B then char A would be rendered on top of char
   * B instead (because the depth relevant y pos of char B is 120 - 50 = 80 and
   * that of char A is 100).
   *
   * @defaultValue `0`
   */
  depthOffset?: number;
}

/**
 * @category Main Modules
 */
export class GridEngine implements IGridEngine {
  static welcomeMessagePrinted = false;
  private geHeadless: GridEngineHeadless = new GridEngineHeadless(false);
  private config?: Omit<
    Required<GridEngineConfig>,
    "tiledProject" | "collisionGroupRelation"
  >;
  private gridCharacters?: Map<string, GridCharacterPhaser>;
  private gridTilemap?: GridTilemapPhaser;
  private isCreatedInternal = false;

  /**
   * Should only be called by Phaser and never directly.
   * @internal
   */
  constructor(private scene: Phaser.Scene) {
    if (!GridEngine.welcomeMessagePrinted) {
      console.log(`Using GridEngine Phaser Plugin v${VERSION}`);
      GridEngine.welcomeMessagePrinted = true;
    }
    this.scene.sys.events.once("boot", this.boot, this);
  }

  /** @internal */
  boot(): void {
    this.scene.sys.events.on("update", this.update, this);
  }

  /**
   * {@inheritDoc IGridEngine.getCharLayer}
   *
   * @category Character
   */
  getCharLayer(charId: string): string | undefined {
    return this.geHeadless.getCharLayer(charId);
  }

  /**
   * {@inheritDoc IGridEngine.getTransition}
   *
   * @category Tilemap
   */
  getTransition(position: Position, fromLayer: string): string | undefined {
    return this.geHeadless.getTransition(position, fromLayer);
  }

  /**
   * {@inheritDoc IGridEngine.setTransition}
   *
   * @category Tilemap
   */
  setTransition(position: Position, fromLayer: string, toLayer: string): void {
    this.geHeadless.setTransition(position, fromLayer, toLayer);
  }

  /**
   * Initializes GridEngine. Must be called before any other methods of
   * GridEngine are called.
   *
   * @category Grid Engine
   */
  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void {
    this.geHeadless.create(
      new PhaserTilemap(tilemap, config.tiledProject),
      config,
    );
    this.isCreatedInternal = true;
    this.gridCharacters = new Map();

    const concreteConfig = this.setConfigDefaults(config);

    this.config = concreteConfig;
    this.gridTilemap = new GridTilemapPhaser(tilemap);

    this.addCharacters();
  }

  /**
   * {@inheritDoc IGridEngine.getPosition}
   *
   * @category Character
   */
  getPosition(charId: string): Position {
    return this.geHeadless.getPosition(charId);
  }

  /**
   * {@inheritDoc IGridEngine.move}
   *
   * @category Basic Movement
   */
  move(charId: string, direction: Direction): void {
    this.geHeadless.move(charId, direction);
  }

  /**
   * {@inheritDoc IGridEngine.moveRandomly}
   *
   * @category Random Movement
   */
  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.geHeadless.moveRandomly(charId, delay, radius);
  }

  /**
   * {@inheritDoc IGridEngine.getMovement}
   *
   * @category Character
   */
  getMovement(charId: string): MovementInfo {
    return this.geHeadless.getMovement(charId);
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
    return this.geHeadless.moveTo(charId, targetPos, config);
  }

  /**
   * {@inheritDoc IGridEngine.stopMovement}
   *
   * @category Basic Movement
   */
  stopMovement(charId: string): void {
    this.geHeadless.stopMovement(charId);
  }

  /**
   * {@inheritDoc IGridEngine.setSpeed}
   *
   * @category Character
   */
  setSpeed(charId: string, speed: number): void {
    this.geHeadless.setSpeed(charId, speed);
  }

  /**
   * {@inheritDoc IGridEngine.getSpeed}
   *
   * @category Character
   */
  getSpeed(charId: string): number {
    return this.geHeadless.getSpeed(charId);
  }

  /**
   * Sets the container for a character.
   *
   * @category Character
   */
  setContainer(charId: string, container?: Phaser.GameObjects.Container): void {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);

    gridCharPhaser.setContainer(container);
  }

  /**
   * @returns Container for a character.
   *
   * @category Character
   */
  getContainer(charId: string): Phaser.GameObjects.Container | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getContainer();
  }

  /**
   * @returns X-offset for a character.
   *
   * @category Character
   */
  getOffsetX(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetX();
  }

  /**
   * Set custom x-offset for the sprite/container.
   *
   * @category Character
   */
  setOffsetX(charId: string, offsetX: number): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setOffsetX(offsetX);
  }

  /**
   * @returns Y-offset for a character.
   *
   * @category Character
   */
  getOffsetY(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getOffsetY();
  }

  /**
   * Set custom y-offset for the sprite/container.
   *
   * @category Character
   */
  setOffsetY(charId: string, offsetY: number): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setOffsetY(offsetY);
  }

  /**
   * @returns depth-offset for a character.
   *
   * @category Character
   */
  getDepthOffset(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getDepthOffset();
  }

  /**
   * {@inheritDoc IGridEngine.collidesWithTiles}
   *
   * @category Character
   */
  collidesWithTiles(charId: string): boolean {
    return this.geHeadless.collidesWithTiles(charId);
  }

  /**
   * @returns {@link WalkingAnimationMapping} for a character. If a character
   * index was set, it will be returned instead.
   *
   * @category Character
   */
  getWalkingAnimationMapping(
    charId: string,
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
   *
   * @category Grid Engine
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
   *
   * @category Character
   */
  setWalkingAnimationMapping(
    charId: string,
    walkingAnimationMapping?: WalkingAnimationMapping | number,
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

  /**
   * Adds a character after calling {@link create}.
   *
   * @category Grid Engine
   */
  addCharacter(charData: CharacterData): void {
    this.geHeadless.addCharacter(charData);
    this.addCharacterInternal(charData);
  }

  /**
   * {@inheritDoc IGridEngine.hasCharacter}
   *
   * @category Grid Engine
   */
  hasCharacter(charId: string): boolean {
    return this.geHeadless.hasCharacter(charId);
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
    gridChar.destroy();
    this.gridCharacters?.delete(charId);

    this.geHeadless.removeCharacter(charId);
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

    this.geHeadless.removeAllCharacters();
  }

  /**
   * {@inheritDoc IGridEngine.getAllCharacters}
   *
   * @category Character
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    return this.geHeadless.getAllCharacters(options);
  }

  /**
   * {@inheritDoc IGridEngine.getLabels}
   *
   * @category Character
   */
  getLabels(charId: string): string[] {
    return this.geHeadless.getLabels(charId);
  }

  /**
   * {@inheritDoc IGridEngine.addLabels}
   *
   * @category Character
   */
  addLabels(charId: string, labels: string[]): void {
    this.geHeadless.addLabels(charId, labels);
  }

  /**
   * {@inheritDoc IGridEngine.removeLabels}
   *
   * @category Character
   */
  removeLabels(charId: string, labels: string[]): void {
    this.geHeadless.removeLabels(charId, labels);
  }

  /**
   * {@inheritDoc IGridEngine.clearLabels}
   *
   * @category Character
   */
  clearLabels(charId: string): void {
    this.geHeadless.clearLabels(charId);
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
    this.geHeadless.follow(charId, charIdToFollow, options);
  }

  /**
   * {@inheritDoc IGridEngine.isMoving}
   *
   * @category Character
   */
  isMoving(charId: string): boolean {
    return this.geHeadless.isMoving(charId);
  }

  /**
   * {@inheritDoc IGridEngine.getFacingDirection}
   *
   * @category Character
   */
  getFacingDirection(charId: string): Direction {
    return this.geHeadless.getFacingDirection(charId);
  }

  /**
   * {@inheritDoc IGridEngine.getFacingPosition}
   *
   * @category Character
   */
  getFacingPosition(charId: string): Position {
    return this.geHeadless.getFacingPosition(charId);
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
    gridChar.turnTowards(direction);
    this.geHeadless.turnTowards(charId, direction);
  }

  /**
   * {@inheritDoc IGridEngine.getCharactersAt}
   *
   * @category Tilemap
   */
  getCharactersAt(position: Position, layer?: string): string[] {
    return this.geHeadless.getCharactersAt(position, layer);
  }

  /**
   * {@inheritDoc IGridEngine.setPosition}
   *
   * @category Character
   */
  setPosition(charId: string, pos: Position, layer?: string): void {
    this.geHeadless.setPosition(charId, pos, layer);
  }

  /**
   * @returns Sprite of given character
   *
   * @category Character
   */
  getSprite(charId: string): Phaser.GameObjects.Sprite | undefined {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    return gridCharPhaser.getSprite();
  }

  /**
   * Sets the sprite for a character.
   *
   * @category Character
   */
  setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    if (!gridCharPhaser) throw this.createCharUnknownErr(charId);
    sprite.setOrigin(0, 0);

    gridCharPhaser.setSprite(sprite);
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
    return this.geHeadless.isBlocked(position, layer, collisionGroups);
  }

  /**
   * {@inheritDoc IGridEngine.isTileBlocked}
   *
   * @category Tilemap
   */
  isTileBlocked(position: Position, layer?: string): boolean {
    return this.geHeadless.isTileBlocked(position, layer);
  }

  /**
   * {@inheritDoc IGridEngine.getCollisionGroups}
   *
   * @category Character
   */
  getCollisionGroups(charId: string): string[] {
    return this.geHeadless.getCollisionGroups(charId);
  }

  /**
   * {@inheritDoc IGridEngine.setCollisionGroups}
   *
   * @category Character
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.geHeadless.setCollisionGroups(charId, collisionGroups);
  }

  /**
   * {@inheritDoc IGridEngine.getIgnoreCollisionGroups}
   *
   * @category Character
   */
  getIgnoreCollisionGroups(charId: string): string[] {
    return this.geHeadless.getIgnoreCollisionGroups(charId);
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
    this.geHeadless.setIgnoreCollisionGroups(charId, ignoreCollisionGroups);
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
    return this.geHeadless.getTilePosInDirection(
      position,
      charLayer,
      direction,
    );
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
    return this.geHeadless.findShortestPath(source, dest, options);
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
    return this.geHeadless.steppedOn(charIds, tiles, layer);
  }

  /**
   * {@inheritDoc IGridEngine.characterShifted}
   *
   * @category GridEngine
   */
  characterShifted(): Observable<CharacterShift> {
    return this.geHeadless.characterShifted();
  }

  /**
   * {@inheritDoc IGridEngine.movementStarted}
   *
   * @category Character
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStarted();
  }

  /**
   * {@inheritDoc IGridEngine.movementStopped}
   *
   * @category Character
   */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.movementStopped();
  }

  /**
   * {@inheritDoc IGridEngine.directionChanged}
   *
   * @category Character
   */
  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    return this.geHeadless.directionChanged();
  }

  /**
   * {@inheritDoc IGridEngine.positionChangeStarted}
   *
   * @category Character
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeStarted();
  }

  /**
   * {@inheritDoc IGridEngine.positionChangeFinished}
   *
   * @category Character
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    return this.geHeadless.positionChangeFinished();
  }

  /**
   * {@inheritDoc IGridEngine.getMovementProgress}
   *
   * @category Character
   */
  getMovementProgress(charId: string): number {
    return this.geHeadless.getMovementProgress(charId);
  }

  /**
   * {@inheritDoc IGridEngine.rebuildTileCollisionCache}
   *
   * @category Grid Engine
   */
  rebuildTileCollisionCache(
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.geHeadless.rebuildTileCollisionCache(x, y, width, height);
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
    this.geHeadless.addQueueMovements(charId, positions, options);
  }

  /**
   * {@inheritDoc IGridEngine.getEnqueuedMovements}
   *
   * @category Queue Movement
   */
  getEnqueuedMovements(charId: string): QueueMovementEntry[] {
    return this.geHeadless.getEnqueuedMovements(charId);
  }

  /**
   * {@inheritDoc IGridEngine.queueMovementFinished}
   *
   * @category Queue Movement
   */
  queueMovementFinished(): Observable<
    { charId: string } & QueueMovementFinished
  > {
    return this.geHeadless.queueMovementFinished();
  }

  /**
   * {@inheritDoc IGridEngine.clearEnqueuedMovements}
   *
   * @category Queue Movement
   */
  clearEnqueuedMovements(charId: string): void {
    return this.geHeadless.clearEnqueuedMovements(charId);
  }

  /**
   * Returns the current state of Grid Engine. This is useful for persiting or
   * sharing the state.
   *
   * @category GridEngine
   *
   * @beta
   */
  getState(): GridEngineStatePhaser {
    return {
      characters: this.geHeadless.getState().characters.map((c) => ({
        ...c,
        offsetX: this.getOffsetX(c.id),
        offsetY: this.getOffsetY(c.id),
      })),
    };
  }

  /**
   * Sets the given state for Grid Engine. Be aware that it will **not** remove
   * any characters from Grid Engine. If you want to completely reset the state,
   * you should call {@link GridEngine.create}
   * or remove all characters via
   * {@link GridEngine.removeAllCharacters}.
   *
   * @category GridEngine
   *
   * @beta
   */
  setState(state: GridEngineStatePhaser): void {
    this.geHeadless.setState(state);
    if (this.gridCharacters) {
      for (const charState of state.characters) {
        const char = this.gridCharacters.get(charState.id);
        if (char) {
          char.setOffsetX(charState.offsetX);
          char.setOffsetY(charState.offsetY);
        }
      }
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
    return this.geHeadless.getTileCost(position, charLayer, srcDirection);
  }

  private setConfigDefaults(
    config: GridEngineConfig,
  ): Omit<
    Required<GridEngineConfig>,
    "tiledProject" | "collisionGroupRelation"
  > {
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
      "GridEngine not initialized. You need to call create() first.",
    );
  }

  private addCharacters() {
    this.config?.characters.forEach((charData) =>
      this.addCharacterInternal(charData),
    );
  }

  private createCharUnknownErr(charId: string): Error {
    return new Error(`Character unknown: ${charId}`);
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
      this.geHeadless,
    );

    this.gridCharacters?.set(charData.id, gridCharPhaser);
  }
}
