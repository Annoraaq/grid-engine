import { CollisionStrategy } from "./Collisions/CollisionStrategy.js";
import { Finished, MoveToConfig, MoveToResult } from "./Movement/TargetMovement/TargetMovement.js";
import { PositionChange } from "./GridCharacter/GridCharacter.js";
import { Direction, NumberOfDirections } from "./Direction/Direction.js";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy.js";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy.js";
import { MovementInfo } from "./Movement/Movement.js";
import { FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter.js";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm.js";
import { Tilemap } from "./GridTilemap/Tilemap.js";
import { CharacterShift, FollowOptions, IGridEngine, PathfindingResult } from "./IGridEngine.js";
import { QueueMovementConfig, QueueMovementEntry, Finished as QueueMovementFinished } from "./Movement/QueueMovement/QueueMovement.js";
import { GridEngineState } from "./GridEngineState.js";
import { IsPositionAllowedFn, PathfindingOptions } from "./Pathfinding/PathfindingOptions.js";
import { CharLayer, LayerPosition, Position } from "./Position.js";
export { CollisionStrategy, CharacterFilteringOptions, Direction, MoveToConfig, MoveToResult, Finished, FrameRow, NumberOfDirections, NoPathFoundStrategy, PathBlockedStrategy, MovementInfo, PositionChange, IsPositionAllowedFn, PathfindingOptions, ShortestPathAlgorithmType, };
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
/**
 * @category Main Modules
 */
export declare class GridEngineHeadless implements IGridEngine {
    private gridCharacters?;
    private config?;
    private gridTilemap?;
    private isCreatedInternal;
    private movementStopped$?;
    private movementStarted$?;
    private directionChanged$?;
    private positionChangeStarted$?;
    private positionChangeFinished$?;
    private queueMovementFinished$?;
    private charRemoved$?;
    private charAdded$?;
    constructor(printWelcomeMessage?: boolean);
    /**
     * {@inheritDoc IGridEngine.getCharLayer}
     *
     * @category Character
     */
    getCharLayer(charId: string): string | undefined;
    /**
     * {@inheritDoc IGridEngine.getTransition}
     *
     * @category Tilemap
     */
    getTransition(position: Position, fromLayer: string): string | undefined;
    /**
     * {@inheritDoc IGridEngine.setTransition}
     *
     * @category Tilemap
     */
    setTransition(position: Position, fromLayer: string, toLayer: string): void;
    /**
     * Initializes GridEngine. Must be called before any other methods of
     * GridEngine are called.
     *
     * @category Grid Engine
     */
    create(tilemap: Tilemap, config: GridEngineConfigHeadless): void;
    private recordToMap;
    /**
     * {@inheritDoc IGridEngine.getPosition}
     *
     * @category Character
     */
    getPosition(charId: string): Position;
    /**
     * {@inheritDoc IGridEngine.move}
     *
     * @category Basic Movement
     */
    move(charId: string, direction: Direction): void;
    /**
     * {@inheritDoc IGridEngine.moveRandomly}
     *
     * @category Random Movement
     */
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    /**
     * {@inheritDoc IGridEngine.getMovement}
     *
     * @category Character
     */
    getMovement(charId: string): MovementInfo;
    /**
     * {@inheritDoc IGridEngine.moveTo}
     *
     * @category Pathfinding
     */
    moveTo(charId: string, targetPos: Position, config?: MoveToConfig): Observable<{
        charId: string;
    } & Finished>;
    /**
     * {@inheritDoc IGridEngine.stopMovement}
     *
     * @category Character
     */
    stopMovement(charId: string): void;
    /**
     * {@inheritDoc IGridEngine.setSpeed}
     *
     * @category Character
     */
    setSpeed(charId: string, speed: number): void;
    /**
     * {@inheritDoc IGridEngine.getSpeed}
     *
     * @category Character
     *
     */
    getSpeed(charId: string): number;
    /**
     * {@inheritDoc IGridEngine.collidesWithTiles}
     *
     * @category Character
     */
    collidesWithTiles(charId: string): boolean;
    /**
     * @category Grid Engine
     */
    update(_time: number, delta: number): void;
    /**
     * Adds a character after calling {@link create}.
     *
     * @category Grid Engine
     */
    addCharacter(charData: CharacterDataHeadless): void;
    /**
     * {@inheritDoc IGridEngine.hasCharacter}
     *
     * @category Grid Engine
     */
    hasCharacter(charId: string): boolean;
    /**
     * {@inheritDoc IGridEngine.removeCharacter}
     *
     * @category Grid Engine
     */
    removeCharacter(charId: string): void;
    /**
     * {@inheritDoc IGridEngine.removeAllCharacters}
     *
     * @category Grid Engine
     */
    removeAllCharacters(): void;
    /**
     * {@inheritDoc IGridEngine.getAllCharacters}
     *
     * @category Grid Engine
     */
    getAllCharacters(options?: CharacterFilteringOptions): string[];
    /**
     * {@inheritDoc IGridEngine.getLabels}
     *
     * @category Character
     */
    getLabels(charId: string): string[];
    /**
     * {@inheritDoc IGridEngine.addLabels}
     *
     * @category Character
     */
    addLabels(charId: string, labels: string[]): void;
    /**
     * {@inheritDoc IGridEngine.removeLabels}
     *
     * @category Character
     */
    removeLabels(charId: string, labels: string[]): void;
    /**
     * {@inheritDoc IGridEngine.clearLabels}
     *
     * @category Character
     */
    clearLabels(charId: string): void;
    /**
     * {@inheritDoc IGridEngine.follow}
     *
     * @category Pathfinding
     */
    follow(charId: string, charIdToFollow: string, options?: FollowOptions): void;
    follow(charId: string, charIdToFollow: string, distance?: number, closestPointIfBlocked?: boolean): void;
    /**
     * {@inheritDoc IGridEngine.isMoving}
     *
     * @category Character
     */
    isMoving(charId: string): boolean;
    /**
     * {@inheritDoc IGridEngine.getFacingDirection}
     *
     * @category Character
     */
    getFacingDirection(charId: string): Direction;
    /**
     * {@inheritDoc IGridEngine.getFacingPosition}
     *
     * @category Character
     */
    getFacingPosition(charId: string): Position;
    /**
     * {@inheritDoc IGridEngine.turnTowards}
     *
     * @category Basic Movement
     */
    turnTowards(charId: string, direction: Direction): void;
    /**
     * {@inheritDoc IGridEngine.getCharactersAt}
     *
     * @category Tilemap
     */
    getCharactersAt(position: Position, layer?: string): string[];
    /**
     * {@inheritDoc IGridEngine.setPosition}
     *
     * @category Character
     */
    setPosition(charId: string, pos: Position, layer?: string): void;
    /**
     * {@inheritDoc IGridEngine.isBlocked}
     *
     * @category Tilemap
     */
    isBlocked(position: Position, layer?: string, collisionGroups?: string[]): boolean;
    /**
     * {@inheritDoc IGridEngine.isTileBlocked}
     *
     * @category Tilemap
     */
    isTileBlocked(position: Position, layer?: string): boolean;
    /**
     * {@inheritDoc IGridEngine.getCollisionGroups}
     *
     * @category Character
     */
    getCollisionGroups(charId: string): string[];
    /**
     * {@inheritDoc IGridEngine.setCollisionGroups}
     *
     * @category Character
     */
    setCollisionGroups(charId: string, collisionGroups: string[]): void;
    /**
     * {@inheritDoc IGridEngine.getIgnoreCollisionGroups}
     *
     * @category Character
     */
    getIgnoreCollisionGroups(charId: string): string[];
    /**
     * {@inheritDoc IGridEngine.setIgnoreCollisionGroups}
     *
     * @category Character
     */
    setIgnoreCollisionGroups(charId: string, ignoreCollisionGroups: string[]): void;
    /**
     * {@inheritDoc IGridEngine.getTilePosInDirection}
     *
     * @category Tilemap
     */
    getTilePosInDirection(position: Position, charLayer: string | undefined, direction: Direction): LayerPosition;
    /**
     * {@inheritDoc IGridEngine.findShortestPath}
     * @alpha
     *
     * @category Pathfinding
     */
    findShortestPath(source: LayerPosition, dest: LayerPosition, options?: PathfindingOptions): PathfindingResult;
    /**
     * {@inheritDoc IGridEngine.steppedOn}
     *
     * @category Basic Movement
     */
    steppedOn(charIds: string[], tiles: Position[], layer?: CharLayer[]): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * {@inheritDoc IGridEngine.characterShifted}
     *
     * @category GridEngine
     */
    characterShifted(): Observable<CharacterShift>;
    /**
     * {@inheritDoc IGridEngine.movementStarted}
     *
     * @category Character
     */
    movementStarted(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * {@inheritDoc IGridEngine.movementStopped}
     *
     * @category Character
     */
    movementStopped(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * {@inheritDoc IGridEngine.directionChanged}
     *
     * @category Character
     */
    directionChanged(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /**
     * {@inheritDoc IGridEngine.positionChangeStarted}
     *
     * @category Character
     */
    positionChangeStarted(): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * {@inheritDoc IGridEngine.positionChangeFinished}
     *
     * @category Character
     */
    positionChangeFinished(): Observable<{
        charId: string;
    } & PositionChange>;
    /**
     * {@inheritDoc IGridEngine.getMovementProgress}
     *
     * @category Character
     */
    getMovementProgress(charId: string): number;
    /**
     * {@inheritDoc IGridEngine.rebuildTileCollisionCache}
     *
     * @category Character
     */
    rebuildTileCollisionCache(x: number, y: number, width: number, height: number): void;
    /**
     * {@inheritDoc IGridEngine.addQueueMovements}
     *
     * @category Queue Movement
     */
    addQueueMovements(charId: string, positions: Array<LayerPosition | Direction>, options?: QueueMovementConfig): void;
    /**
     * {@inheritDoc IGridEngine.queueMovementFinished}
     *
     * @category Queue Movement
     */
    queueMovementFinished(): Observable<{
        charId: string;
    } & QueueMovementFinished>;
    /**
     * {@inheritDoc IGridEngine.getEnqueuedMovements}
     *
     * @category Queue Movement
     */
    getEnqueuedMovements(charId: string): QueueMovementEntry[];
    /**
     * {@inheritDoc IGridEngine.clearEnqueuedMovements}
     *
     * @category Queue Movement
     */
    clearEnqueuedMovements(charId: string): void;
    /**
     * {@inheritDoc IGridEngine.getTileCost}
     *
     * @category Pathfinding
     */
    getTileCost(position: Position, charLayer?: string, srcDirection?: Direction): number;
    /**
     * Returns the current state of Grid Engine. This is useful for persiting or
     * sharing the state.
     *
     * @category GridEngine
     *
     * @beta
     */
    getState(): GridEngineState;
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
    setState(state: GridEngineState): void;
    private charRemoved;
    private initGuard;
    private createUninitializedErr;
    private addCharacters;
    private moveChar;
    private createCharUnknownErr;
    private assembleMoveToConfig;
    private setConfigDefaults;
}
