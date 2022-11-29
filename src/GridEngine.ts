import { GridCharacterPhaser } from "./GridEnginePhaser/GridCharacterPhaser/GridCharacterPhaser";
import { GlobalConfig } from "./GlobalConfig/GlobalConfig";
import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { FollowMovement } from "./Movement/FollowMovement/FollowMovement";
import {
  Finished,
  IsPositionAllowedFn,
  MoveToConfig,
  MoveToResult,
  TargetMovement,
} from "./Movement/TargetMovement/TargetMovement";
import { GridCharacter, PositionChange } from "./GridCharacter/GridCharacter";
import {
  Direction,
  isDiagonal,
  NumberOfDirections,
} from "./Direction/Direction";
import { GridTilemap } from "./GridTilemap/GridTilemap";
import { RandomMovement } from "./Movement/RandomMovement/RandomMovement";
import { Observable, Subject } from "rxjs";
import { take, takeUntil, filter, map, mergeWith } from "rxjs/operators";
import { Vector2 } from "./Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { Concrete } from "./Utils/TypeUtils";
import { MovementInfo } from "./Movement/Movement";
import {
  CharacterIndex,
  FrameRow,
} from "./GridCharacter/CharacterAnimation/CharacterAnimation";
import {
  CharacterFilteringOptions,
  filterCharacters,
} from "./GridCharacter/CharacterFilter/CharacterFilter";

import { version as VERSION } from "../package.json";

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
};

export type TileSizePerSecond = number;

export interface Position {
  x: number;
  y: number;
}

/**
 * Specifies a tile position along with a character layer.
 */
export interface LayerPosition {
  position: Position;
  charLayer: CharLayer;
}

export type CharLayer = string | undefined;

/**
 * Configuration object for initializing GridEngine.
 */
export interface GridEngineConfig {
  /** An array of character data. Each describing a character on the map. */
  characters: CharacterData[];

  /** A custom name for the collision tile property of your tilemap. */

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

export interface CollisionConfig {
  /**
   * Determines whether the character should collide with the tilemap.
   *
   * @defaultValue `true`
   */
  collidesWithTiles?: boolean;

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
export interface CharacterData {
  /**
   * A unique identifier for the character on the map. If you provice two
   * characters with the same id, the last one will override the previous one.
   */
  id: string;

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

export class GridEngine {
  private gridCharacters?: Map<string, GridCharacterPhaser>;
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

  /**
   * Should only be called by Phaser and never directly.
   * @internal
   */
  constructor(private scene: Phaser.Scene) {
    console.log(`Using GridEngine v${VERSION}`);
    this.scene.sys.events.once("boot", this.boot, this);
  }

  /** @internal */
  boot(): void {
    this.scene.sys.events.on("update", this.update, this);
  }

  /**
   * Returns the character layer of the given character.
   * You can read more about character layers and transitions
   * {@link https://annoraaq.github.io/grid-engine/api/features/character-layers.html | here}
   */
  getCharLayer(charId: string): string | undefined {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().layer;
  }

  /**
   * @returns The character layer that the transition on the given position and
   * character layer leads to.
   *
   * @beta
   */
  getTransition(position: Position, fromLayer: string): string | undefined {
    this.initGuard();
    return this.gridTilemap?.getTransition(new Vector2(position), fromLayer);
  }

  /**
   * Sets the character layer `toLayer` that the transition on position
   * `position` from character layer `fromLayer` should lead to.
   * You can read more about character layers and transitions
   * {@link https://annoraaq.github.io/grid-engine/api/features/character-layers.html | here}
   *
   * @param position Position of the new transition
   * @param fromLayer Character layer the new transition should start at
   * @param toLayer Character layer the new transition should lead to
   *
   * @beta
   */
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
  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void {
    this.isCreatedInternal = true;
    this.gridCharacters = new Map();

    const concreteConfig = this.setConfigDefaults(config);

    GlobalConfig.set(concreteConfig);
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
    this.gridTilemap = new GridTilemap(tilemap);

    this.addCharacters();
  }

  /**
   * @returns The tile position of the character with the given id
   */
  getPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getTilePos().position;
  }

  /**
   * Initiates movement of the character with the given id. If the character is
   * already moving nothing happens. If the movement direction is currently
   * blocked, the character will only turn towards that direction. Movement
   * commands are **not** queued.
   */
  move(charId: string, direction: Direction): void {
    this.moveChar(charId, direction);
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
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const randomMovement = new RandomMovement(gridChar, delay, radius);
    gridChar.setMovement(randomMovement);
  }

  /**
   * @returns Information about the current automatic movement (including
   * random movement, follow movement and target movement)
   */
  getMovement(charId: string): MovementInfo {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
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
    const moveToConfig = this.assembleMoveToConfig(config);

    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
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

  /**
   * Stops any automated movement such as random movement
   * ({@link moveRandomly}), following ({@link follow}) or moving to a
   * specified position ({@link moveTo})
   */
  stopMovement(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setMovement(undefined);
  }

  /** Sets the speed in tiles per second for a character. */
  setSpeed(charId: string, speed: number): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setSpeed(speed);
  }

  /** @returns Speed in tiles per second for a character. */
  getSpeed(charId: string): number {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getSpeed();
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
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.collidesWithTiles();
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
    return GlobalConfig.get().layerOverlay;
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
  update(_time: number, delta: number): void {
    if (this.isCreatedInternal && this.gridCharacters) {
      for (const [_key, gridChar] of this.gridCharacters) {
        gridChar.update(delta);
      }
    }
  }

  /** Adds a character after calling {@link create}. */
  addCharacter(charData: CharacterData): void {
    this.initGuard();
    if (!this.gridTilemap) throw this.createUninitializedErr();

    const gridCharPhaser = new GridCharacterPhaser(
      charData,
      this.scene,
      this.gridTilemap,
      GlobalConfig.get().layerOverlay
    );
    const gridChar = gridCharPhaser.getGridCharacter();

    this.gridCharacters?.set(charData.id, gridCharPhaser);

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

  /** Checks whether a character with the given ID is registered. */
  hasCharacter(charId: string): boolean {
    this.initGuard();
    return !!this.gridCharacters?.has(charId);
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
    this.gridTilemap?.removeCharacter(charId);
    this.gridCharacters?.delete(charId);
    this.charRemoved$?.next(charId);
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
  }

  /**
   * @returns All character IDs that are registered in the plugin, satisfying
   * the provided filtering options.
   */
  getAllCharacters(options?: CharacterFilteringOptions): string[] {
    this.initGuard();
    if (!this.gridCharacters) return [];
    const allChars = [...this.gridCharacters.values()].map((char) =>
      char.getGridCharacter()
    );
    const filteredChars = options
      ? filterCharacters(allChars, options)
      : allChars;

    return filteredChars.map((char: GridCharacter) => char.getId());
  }

  /**
   * @returns All labels, attached to the character.
   */
  getLabels(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getLabels();
  }

  /**
   * Add labels to the character.
   */
  addLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.addLabels(labels);
  }

  /**
   * Remove labels from the character.
   */
  removeLabels(charId: string, labels: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.removeLabels(labels);
  }

  /**
   * Removes all labels from the character.
   */
  clearLabels(charId: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.clearLabels();
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
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    const gridCharToFollow = this.gridCharacters
      ?.get(charIdToFollow)
      ?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    if (!gridCharToFollow) throw this.createCharUnknownErr(charIdToFollow);
    if (!this.gridTilemap) throw this.createUninitializedErr();
    const followMovement = new FollowMovement(
      gridChar,
      this.gridTilemap,
      gridCharToFollow,
      distance,
      closestPointIfBlocked
        ? NoPathFoundStrategy.CLOSEST_REACHABLE
        : NoPathFoundStrategy.STOP
    );
    gridChar.setMovement(followMovement);
  }

  /**
   * @returns True if the character is currently moving.
   */
  isMoving(charId: string): boolean {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.isMoving();
  }

  /**
   * @returns Direction the character is currently facing. At time of creation
   *  this is `down`.
   */
  getFacingDirection(charId: string): Direction {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getFacingDirection();
  }

  /**
   * @returns Position the character is currently facing.
   */
  getFacingPosition(charId: string): Position {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    const vectorPos = gridChar.getFacingPosition();
    return { x: vectorPos.x, y: vectorPos.y };
  }

  /**
   * Turns the character towards the given direction without moving it.
   */
  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId);
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.turnTowards(direction);
  }

  /**
   * Finds the identifiers of all characters at the provided tile position.
   * @returns The identifiers of all characters on this tile.
   */
  getCharactersAt(position: Position, layer: string): string[] {
    this.initGuard();
    if (!this.gridTilemap) return [];
    const characters = this.gridTilemap.getCharactersAt(
      new Vector2(position),
      layer
    );
    return Array.from(characters).map((char) => char.getId());
  }

  /**
   * Places the character with the given id to the provided tile position. If
   * that character is moving, the movement is stopped. The
   * {@link positionChangeStarted} and {@link positionChangeFinished} observables will
   * emit. If the character was moving, the {@link movementStopped} observable
   * will also emit.
   */
  setPosition(charId: string, pos: Position, layer?: string): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
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
   * @returns Sprite of given character
   */
  getSprite(charId: string): Phaser.GameObjects.Sprite | undefined {
    this.initGuard();
    const gridCharPhaser = this.gridCharacters?.get(charId);
    const gridChar = gridCharPhaser?.getGridCharacter();
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
    this.initGuard();
    const positionVec = new Vector2(position);
    return !!(
      this.gridTilemap?.hasBlockingTile(positionVec, layer) ||
      this.gridTilemap?.hasBlockingChar(positionVec, layer, collisionGroups)
    );
  }

  /**
   * Checks whether the given position is blocked by the tilemap. If you provide
   * no layer, be sure not to use character layers in your tilemap.
   *
   * @returns True if position on given layer is blocked by the tilemap.
   */
  isTileBlocked(position: Position, layer?: string): boolean {
    this.initGuard();
    return !!this.gridTilemap?.hasBlockingTile(new Vector2(position), layer);
  }

  /**
   * Returns all collision groups of the given character.
   * {@link https://annoraaq.github.io/grid-engine/examples/collision-groups | Collision Groups Example}
   *
   * @returns All collision groups of the given character.
   */
  getCollisionGroups(charId: string): string[] {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    return gridChar.getCollisionGroups() || [];
  }

  /**
   * Sets collision groups for the given character. Previous collision groups
   * will be overwritten.
   */
  setCollisionGroups(charId: string, collisionGroups: string[]): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);
    gridChar.setCollisionGroups(collisionGroups);
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
    this.initGuard();
    // This can't actually happen, but TypeScript can't know.
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

  /**
   * @returns Observable that emits when a new character is added or an existing is removed.
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
          }))
        )
      )
    );
  }

  /**
   * @returns Observable that on each start of a movement will provide the
   *  character ID and the direction.
   */
  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStarted$) throw this.createUninitializedErr();
    return this.movementStarted$;
  }

  /**
   * @returns Observable that on each stopped movement of a character will
   *  provide it’s ID and the direction of that movement.
   */
  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    if (!this.movementStopped$) throw this.createUninitializedErr();
    return this.movementStopped$;
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
    if (!this.directionChanged$) throw this.createUninitializedErr();
    return this.directionChanged$;
  }

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the beginning of the movement.
   */
  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeStarted$) throw this.createUninitializedErr();
    return this.positionChangeStarted$;
  }

  /**
   * @returns Observable that will notify about every change of tile position.
   *  It will notify at the end of the movement.
   */
  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    if (!this.positionChangeFinished$) throw this.createUninitializedErr();
    return this.positionChangeFinished$;
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
    throw new Error("Plugin not initialized. You need to call create() first.");
  }

  private addCharacters() {
    GlobalConfig.get().characters.forEach((charData) =>
      this.addCharacter(charData)
    );
  }

  private moveChar(charId: string, direction: Direction): void {
    this.initGuard();
    const gridChar = this.gridCharacters?.get(charId)?.getGridCharacter();
    if (!gridChar) throw this.createCharUnknownErr(charId);

    if (GlobalConfig.get().numberOfDirections === NumberOfDirections.FOUR) {
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
}
