import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { Finished, MoveToConfig, MoveToResult } from "./Movement/TargetMovement/TargetMovement";
import { PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { MovementInfo } from "./Movement/Movement";
import { FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter";
import { IsPositionAllowedFn, PathfindingOptions } from "./Pathfinding/Pathfinding";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm";
import { Tilemap } from "./GridTilemap/Tilemap";
export { CollisionStrategy, CharacterFilteringOptions, Direction, MoveToConfig, MoveToResult, Finished, FrameRow, NumberOfDirections, NoPathFoundStrategy, PathBlockedStrategy, MovementInfo, PositionChange, IsPositionAllowedFn, PathfindingOptions, ShortestPathAlgorithmType, };
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
 * Configuration object for initializing GridEngineHeadless.
 */
export interface GridEngineConfigHeadless {
    /** An array of character data. Each describing a character on the map. */
    characters: CharacterDataHeadless[];
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
export declare enum CharacterShiftAction {
    /** removed existing character */
    REMOVED = "REMOVED",
    /** added new character */
    ADDED = "ADDED"
}
export declare class GridEngineHeadless {
    private gridCharacters?;
    private config?;
    private gridTilemap?;
    private isCreatedInternal;
    private movementStopped$?;
    private movementStarted$?;
    private directionChanged$?;
    private positionChangeStarted$?;
    private positionChangeFinished$?;
    private charRemoved$?;
    private charAdded$?;
    constructor();
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
     * Initializes GridEngine. Must be called before any other methods of
     * GridEngine are called.
     */
    create(tilemap: Tilemap, config: GridEngineConfigHeadless): void;
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
    /** @returns Speed in tiles per second for a character. */
    getSpeed(charId: string): number;
    /** @returns Whether character collides with tiles */
    collidesWithTiles(charId: string): boolean;
    update(_time: number, delta: number): void;
    /** Adds a character after calling {@link create}. */
    addCharacter(charData: CharacterDataHeadless): void;
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
     * Finds the identifiers of all characters at the provided tile position.
     * @returns The identifiers of all characters on this tile.
     */
    getCharactersAt(position: Position, layer: string): string[];
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
     * Gets the tile position and character layer adjacent to the given
     * position in the given direction.
     */
    getTilePosInDirection(position: Position, charLayer: string | undefined, direction: Direction): LayerPosition;
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
    findShortestPath(source: LayerPosition, dest: LayerPosition, options?: PathfindingOptions): {
        path: LayerPosition[];
        closestToTarget: LayerPosition;
    };
    /**
     * @returns Observable that, whenever a specified position is entered on optionally provided layers,
     *  will notify with the target characters position change
     */
    steppedOn(charIds: string[], tiles: Position[], layer?: CharLayer[]): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * @returns Observable that emits when a new character is added or an existing is removed.
     */
    characterShifted(): Observable<CharacterShift>;
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
     *  It also emits when you call {@link GridEngine.turnTowards}.
     *
     * This obsersable never emits more than one time in a row for the same
     * direction.
     * So for instance, if {@link GridEngine.turnTowards} is called multiple times
     * in a row (without any facing direction change occurring inbetween) with the
     * same direction, this observable would only emit once.
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
    /**
     * Returns the movement progress (0-1000) of a character to the next tile. For
     * example, if a character has movement progress 400 that means that it has
     * moved 400/1000th of the distance to the next tile already.
     */
    getMovementProgress(charId: string): number;
    private charRemoved;
    private initGuard;
    private createUninitializedErr;
    private addCharacters;
    private moveChar;
    private createCharUnknownErr;
    private assembleMoveToConfig;
    private setConfigDefaults;
}
