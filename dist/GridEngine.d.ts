import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { Finished, MoveToConfig, MoveToResult } from "./Movement/TargetMovement/TargetMovement";
import { CharacterIndex, FrameRow, PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
export { CollisionStrategy, Direction, MoveToConfig, MoveToResult, Finished, FrameRow, NumberOfDirections, NoPathFoundStrategy, PathBlockedStrategy, };
export declare type TileSizePerSecond = number;
export interface Position {
    x: number;
    y: number;
}
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
    sprite: Phaser.GameObjects.Sprite;
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
}
export declare class GridEngine {
    private scene;
    private gridCharacters;
    private gridTilemap;
    private isCreated;
    private movementStopped$;
    private movementStarted$;
    private directionChanged$;
    private positionChangeStarted$;
    private positionChangeFinished$;
    private charRemoved$;
    /**
     * Should only be called by Phaser and never directly.
     * @internal
     */
    constructor(scene: Phaser.Scene);
    /** @internal */
    boot(): void;
    /** @internal */
    destroy(): void;
    /**
     * Returns the character layer of the given character.
     * You can read more about character layers and transitions
     * {@link https://annoraaq.github.io/grid-engine/api/features/character-layers.html | here}
     */
    getCharLayer(charId: string): string;
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
     * {@link https://annoraaq.github.io/grid-engine/api/features/character-layers.html | here}
     *
     * @param position Position of the new transition
     * @param fromLayer Character layer the new transition should start at
     * @param toLayer Character layer the new transition should lead to
     *
     * @beta
     */
    setTransition(position: Position, fromLayer: string, toLayer: string): void;
    /**
     * Initializes GridEngine. Must be called before any other methods of
     * GridEngine are called.
     */
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
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
     * . Additionally, if a `radius` other than -1 was given, the character might
     * move more than one tile into a random direction in one run (as long as the
     * route is neither blocked nor outside of the radius).
     */
    moveRandomly(charId: string, delay?: number, radius?: number): void;
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
    moveTo(charId: string, targetPos: Position, config?: MoveToConfig): Observable<{
        charId: string;
    } & Finished>;
    /**
     * Stops any automated movement such as random movement
     * ({@link moveRandomly}), following ({@link follow}) or moving to a
     * specified position ({@link moveTo})
     */
    stopMovement(charId: string): void;
    /** Sets the speed in tiles per second for a character. */
    setSpeed(charId: string, speed: number): void;
    /**
     * Sets the {@link WalkingAnimationMapping} for a character. Alternatively you
     * can provide a number which is the character index (see also
     * {@link CharacterData | Character Config}). If you provide `undefined`, it
     * will disable walking animations for the character.
     */
    setWalkingAnimationMapping(charId: string, walkingAnimationMapping: WalkingAnimationMapping): void;
    /** @internal */
    update(_time: number, delta: number): void;
    /** Adds a character after calling {@link create}. */
    addCharacter(charData: CharacterData): void;
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
     * @returns All character IDs that are registered in the plugin.
     */
    getAllCharacters(): string[];
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
    follow(charId: string, charIdToFollow: string, distance?: number, closestPointIfBlocked?: boolean): void;
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
     * Places the character with the given id to the provided tile position. If
     * that character is moving, the movement is stopped. The
     * {@link positionChanged} and {@link positionChangeFinished} observables will
     * emit. If the character was moving, the {@link movementStopped} observable
     * will also emit.
     */
    setPosition(charId: string, pos: Position, layer?: string): void;
    /**
     * @returns Sprite of given character
     */
    getSprite(charId: string): Phaser.GameObjects.Sprite;
    /**
     * Sets the sprite for a character.
     */
    setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void;
    /**
     * Checks whether the given position is blocked by either the tilemap or a
     * blocking character. If you provide no layer, be sure not to use character
     * layers in your tilemap.
     *
     * @returns True if position on given layer is blocked by the tilemap or a
     *  character
     */
    isBlocked(position: Position, layer?: string, collisionGroups?: string[]): boolean;
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
     * @returns Observable that, whenever a specified position is entered on optionally provided layers,
     *  will notify with the target characters position change
     */
    steppedOn(charIds: string[], tiles: Position[], layer?: string[]): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * @returns Observable that on each start of a movement will provide the
     *  character ID and the direction.
     */
    movementStarted(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * @returns Observable that on each stopped movement of a character will
     *  provide it’s ID and the direction of that movement.
     */
    movementStopped(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * @returns Observable that will notify about every change of direction that
     *  is not part of a movement. This is the case if the character tries to walk
     *  towards a blocked tile. The character will turn but not move.
     */
    directionChanged(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * @returns Observable that will notify about every change of tile position.
     *  It will notify at the beginning of the movement.
     */
    positionChangeStarted(): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * @returns Observable that will notify about every change of tile position.
     *  It will notify at the end of the movement.
     */
    positionChangeFinished(): Observable<{
        charId: string;
    } & PositionChange>;
    private setConfigDefaults;
    private takeUntilCharRemoved;
    private initGuard;
    private unknownCharGuard;
    private createCharacter;
    private addCharacters;
    private moveChar;
    private assembleMoveToConfig;
}
