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
import { CharacterShift, CharLayer, FollowOptions, IGridEngine, LayerPosition, PathfindingResult, Position } from "./IGridEngine";
export { CollisionStrategy, CharacterFilteringOptions, Direction, MoveToConfig, MoveToResult, Finished, FrameRow, NumberOfDirections, NoPathFoundStrategy, PathBlockedStrategy, MovementInfo, PositionChange, IsPositionAllowedFn, PathfindingOptions, ShortestPathAlgorithmType, };
export type TileSizePerSecond = number;
/**
 * Configuration object for initializing GridEngineHeadless.
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
    private charRemoved$?;
    private charAdded$?;
    constructor();
    /** {@inheritDoc IGridEngine.getCharLayer} */
    getCharLayer(charId: string): string | undefined;
    /** {@inheritDoc IGridEngine.getTransition} */
    getTransition(position: Position, fromLayer: string): string | undefined;
    /** {@inheritDoc IGridEngine.setTransition} */
    setTransition(position: Position, fromLayer: string, toLayer: string): void;
    /**
     * Initializes GridEngine. Must be called before any other methods of
     * GridEngine are called.
     */
    create(tilemap: Tilemap, config: GridEngineConfigHeadless): void;
    /** {@inheritDoc IGridEngine.getPosition} */
    getPosition(charId: string): Position;
    /** {@inheritDoc IGridEngine.move} */
    move(charId: string, direction: Direction): void;
    /** {@inheritDoc IGridEngine.moveRandomly} */
    moveRandomly(charId: string, delay?: number, radius?: number): void;
    /** {@inheritDoc IGridEngine.getMovement} */
    getMovement(charId: string): MovementInfo;
    /** {@inheritDoc IGridEngine.moveTo} */
    moveTo(charId: string, targetPos: Position, config?: MoveToConfig): Observable<{
        charId: string;
    } & Finished>;
    /** {@inheritDoc IGridEngine.stopMovement} */
    stopMovement(charId: string): void;
    /** {@inheritDoc IGridEngine.setSpeed} */
    setSpeed(charId: string, speed: number): void;
    /** {@inheritDoc IGridEngine.getSpeed} */
    getSpeed(charId: string): number;
    /** {@inheritDoc IGridEngine.collidesWithTiles} */
    collidesWithTiles(charId: string): boolean;
    update(_time: number, delta: number): void;
    /** Adds a character after calling {@link create}. */
    addCharacter(charData: CharacterDataHeadless): void;
    /** {@inheritDoc IGridEngine.hasCharacter} */
    hasCharacter(charId: string): boolean;
    /** {@inheritDoc IGridEngine.removeCharacter} */
    removeCharacter(charId: string): void;
    /** {@inheritDoc IGridEngine.removeAllCharacters} */
    removeAllCharacters(): void;
    /** {@inheritDoc IGridEngine.getAllCharacters} */
    getAllCharacters(options?: CharacterFilteringOptions): string[];
    /** {@inheritDoc IGridEngine.getLabels} */
    getLabels(charId: string): string[];
    /** {@inheritDoc IGridEngine.addLabels} */
    addLabels(charId: string, labels: string[]): void;
    /** {@inheritDoc IGridEngine.removeLabels} */
    removeLabels(charId: string, labels: string[]): void;
    /** {@inheritDoc IGridEngine.clearLabels} */
    clearLabels(charId: string): void;
    /** {@inheritDoc IGridEngine.follow} */
    follow(charId: string, charIdToFollow: string, options?: FollowOptions): void;
    follow(charId: string, charIdToFollow: string, distance?: number, closestPointIfBlocked?: boolean): void;
    /** {@inheritDoc IGridEngine.isMoving} */
    isMoving(charId: string): boolean;
    /** {@inheritDoc IGridEngine.getFacingDirection} */
    getFacingDirection(charId: string): Direction;
    /** {@inheritDoc IGridEngine.getFacingPosition} */
    getFacingPosition(charId: string): Position;
    /** {@inheritDoc IGridEngine.turnTowards} */
    turnTowards(charId: string, direction: Direction): void;
    /** {@inheritDoc IGridEngine.getCharactersAt} */
    getCharactersAt(position: Position, layer: string): string[];
    /** {@inheritDoc IGridEngine.setPosition} */
    setPosition(charId: string, pos: Position, layer?: string): void;
    /** {@inheritDoc IGridEngine.isBlocked} */
    isBlocked(position: Position, layer?: string, collisionGroups?: string[]): boolean;
    /** {@inheritDoc IGridEngine.isTileBlocked} */
    isTileBlocked(position: Position, layer?: string): boolean;
    /** {@inheritDoc IGridEngine.getCollisionGroups} */
    getCollisionGroups(charId: string): string[];
    /** {@inheritDoc IGridEngine.setCollisionGroups} */
    setCollisionGroups(charId: string, collisionGroups: string[]): void;
    /** {@inheritDoc IGridEngine.getTilePosInDirection} */
    getTilePosInDirection(position: Position, charLayer: string | undefined, direction: Direction): LayerPosition;
    /**
     * {@inheritDoc IGridEngine.findShortestPath}
     * @alpha
     */
    findShortestPath(source: LayerPosition, dest: LayerPosition, options?: PathfindingOptions): PathfindingResult;
    /** {@inheritDoc IGridEngine.steppedOn} */
    steppedOn(charIds: string[], tiles: Position[], layer?: CharLayer[]): Observable<{
        charId: string;
    } & PositionChange>;
    /** {@inheritDoc IGridEngine.characterShifted} */
    characterShifted(): Observable<CharacterShift>;
    /** {@inheritDoc IGridEngine.movementStarted} */
    movementStarted(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /** {@inheritDoc IGridEngine.movementStopped} */
    movementStopped(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /** {@inheritDoc IGridEngine.directionChanged} */
    directionChanged(): Observable<{
        charId: string;
        direction: Direction;
    }>;
    /** {@inheritDoc IGridEngine.positionChangeStarted} */
    positionChangeStarted(): Observable<{
        charId: string;
    } & PositionChange>;
    /** {@inheritDoc IGridEngine.positionChangeFinished} */
    positionChangeFinished(): Observable<{
        charId: string;
    } & PositionChange>;
    /** {@inheritDoc IGridEngine.getMovementProgress} */
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
