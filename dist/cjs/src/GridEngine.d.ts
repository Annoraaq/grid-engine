import { CollisionStrategy } from "./Collisions/CollisionStrategy.js";
import { Finished, MoveToConfig, MoveToInfo, MoveToResult } from "./Movement/TargetMovement/TargetMovement.js";
import { PositionChange } from "./GridCharacter/GridCharacter.js";
import { Direction, NumberOfDirections, directionFromPos } from "./Direction/Direction.js";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy.js";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy.js";
import { MovementInfo } from "./Movement/Movement.js";
import { CharacterIndex, FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation.js";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter.js";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm.js";
import { GridEngineHeadless, TileSizePerSecond, GridEngineConfigHeadless, CollisionConfig, CharacterDataHeadless } from "./GridEngineHeadless.js";
import { PhaserTilemap, TiledProject } from "./GridTilemap/Phaser/PhaserTilemap.js";
import { Orientation, Tile, TileLayer, Tilemap } from "./GridTilemap/Tilemap.js";
import { PhaserTileLayer } from "./GridTilemap/Phaser/PhaserTileLayer.js";
import { PhaserTile } from "./GridTilemap/Phaser/PhaserTile.js";
import { QueueMovementConfig, QueuedPathBlockedStrategy, Finished as QueueMovementFinished, QueueMovementResult, QueueMovementEntry } from "./Movement/QueueMovement/QueueMovement.js";
import { CharacterShift, CharacterShiftAction, FollowOptions, IGridEngine, PathfindingResult } from "./IGridEngine.js";
import { ArrayTilemap, ArrayTilemapInputLayer } from "./GridTilemap/ArrayTilemap/ArrayTilemap.js";
import { TiledTilemap } from "./GridTilemap/TiledTilemap/TiledTilemap.js";
import { TiledLayer } from "./GridTilemap/TiledTilemap/TiledLayer.js";
import { TiledTile } from "./GridTilemap/TiledTilemap/TiledTile.js";
import { GridEngineState } from "./GridEngineState.js";
import { GridCharacterState } from "./GridCharacter/GridCharacterState.js";
import { GridEngineStatePhaser } from "./GridEnginePhaser/GridEngineStatePhaser.js";
import { IsPositionAllowedFn, PathfindingOptions } from "./Pathfinding/PathfindingOptions.js";
import { CharLayer, LayerPosition, Position } from "./Position.js";
import { Concrete } from "./Utils/TypeUtils.js";
import { GridCharacterStatePhaser } from "./GridEnginePhaser/GridCharacterStatePhaser.js";
import { RawTiledLayer, RawTiledTileset, RawTiledTilesetTile, RawTiledTilesetTileProp } from "./GridTilemap/TiledTilemap/TiledMap.js";
export { ArrayTilemap, ArrayTilemapInputLayer, CharacterDataHeadless, CharacterFilteringOptions, CharacterShift, CharacterShiftAction, CharLayer, CollisionConfig, CollisionStrategy, Concrete, Direction, Finished, FollowOptions, FrameRow, GridCharacterState, GridCharacterStatePhaser, GridEngineConfigHeadless, GridEngineHeadless, GridEngineState, GridEngineStatePhaser, IGridEngine, IsPositionAllowedFn, LayerPosition, MovementInfo, MoveToConfig, MoveToInfo, MoveToResult, NoPathFoundStrategy, NumberOfDirections, Orientation, PathBlockedStrategy, PathfindingOptions, PathfindingResult, Position, PositionChange, PhaserTile, PhaserTileLayer, PhaserTilemap, QueueMovementConfig, QueueMovementEntry, QueueMovementFinished, QueueMovementResult, QueuedPathBlockedStrategy, RawTiledLayer, RawTiledTileset, RawTiledTilesetTile, RawTiledTilesetTileProp, ShortestPathAlgorithmType, Tile, TiledProject, TiledTilemap, TiledLayer, TiledTile, TileLayer, Tilemap, TileSizePerSecond, directionFromPos, };
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
}
/**
 * @category Main Modules
 */
export declare class GridEngine implements IGridEngine {
    private scene;
    static welcomeMessagePrinted: boolean;
    private geHeadless;
    private config?;
    private gridCharacters?;
    private gridTilemap?;
    private isCreatedInternal;
    /**
     * Should only be called by Phaser and never directly.
     * @internal
     */
    constructor(scene: Phaser.Scene);
    /** @internal */
    boot(): void;
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
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
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
     * @category Basic Movement
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
     */
    getSpeed(charId: string): number;
    /**
     * Sets the container for a character.
     *
     * @category Character
     */
    setContainer(charId: string, container?: Phaser.GameObjects.Container): void;
    /**
     * @returns Container for a character.
     *
     * @category Character
     */
    getContainer(charId: string): Phaser.GameObjects.Container | undefined;
    /**
     * @returns X-offset for a character.
     *
     * @category Character
     */
    getOffsetX(charId: string): number;
    /**
     * Set custom x-offset for the sprite/container.
     *
     * @category Character
     */
    setOffsetX(charId: string, offsetX: number): void;
    /**
     * @returns Y-offset for a character.
     *
     * @category Character
     */
    getOffsetY(charId: string): number;
    /**
     * Set custom y-offset for the sprite/container.
     *
     * @category Character
     */
    setOffsetY(charId: string, offsetY: number): void;
    /**
     * {@inheritDoc IGridEngine.collidesWithTiles}
     *
     * @category Character
     */
    collidesWithTiles(charId: string): boolean;
    /**
     * @returns {@link WalkingAnimationMapping} for a character. If a character
     * index was set, it will be returned instead.
     *
     * @category Character
     */
    getWalkingAnimationMapping(charId: string): WalkingAnimationMapping | number | undefined;
    /**
     * @returns `true` if {@link https://annoraaq.github.io/grid-engine/p/layer-overlay/ | layer overlay}
     * is activated.
     *
     * @category Grid Engine
     */
    hasLayerOverlay(): boolean;
    /**
     * Sets the {@link WalkingAnimationMapping} for a character. Alternatively you
     * can provide a number which is the character index (see also
     * {@link CharacterData | Character Config}). If you provide `undefined`, it
     * will disable walking animations for the character.
     *
     * @category Character
     */
    setWalkingAnimationMapping(charId: string, walkingAnimationMapping?: WalkingAnimationMapping | number): void;
    /** @internal */
    update(time: number, delta: number): void;
    /**
     * Adds a character after calling {@link create}.
     *
     * @category Grid Engine
     */
    addCharacter(charData: CharacterData): void;
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
     * @category Character
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
     * @returns Sprite of given character
     *
     * @category Character
     */
    getSprite(charId: string): Phaser.GameObjects.Sprite | undefined;
    /**
     * Sets the sprite for a character.
     *
     * @category Character
     */
    setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void;
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
     * @category Grid Engine
     */
    rebuildTileCollisionCache(x: number, y: number, width: number, height: number): void;
    /**
     * {@inheritDoc IGridEngine.addQueueMovements}
     *
     * @category Queue Movement
     */
    addQueueMovements(charId: string, positions: Array<LayerPosition | Direction>, options?: QueueMovementConfig): void;
    /**
     * {@inheritDoc IGridEngine.getEnqueuedMovements}
     *
     * @category Queue Movement
     */
    getEnqueuedMovements(charId: string): QueueMovementEntry[];
    /**
     * {@inheritDoc IGridEngine.queueMovementFinished}
     *
     * @category Queue Movement
     */
    queueMovementFinished(): Observable<{
        charId: string;
    } & QueueMovementFinished>;
    /**
     * {@inheritDoc IGridEngine.clearEnqueuedMovements}
     *
     * @category Queue Movement
     */
    clearEnqueuedMovements(charId: string): void;
    /**
     * Returns the current state of Grid Engine. This is useful for persiting or
     * sharing the state.
     *
     * @category GridEngine
     *
     * @beta
     */
    getState(): GridEngineStatePhaser;
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
    setState(state: GridEngineStatePhaser): void;
    /**
     * {@inheritDoc IGridEngine.getTileCost}
     *
     * @category Pathfinding
     */
    getTileCost(position: Position, charLayer?: string, srcDirection?: Direction): number;
    private setConfigDefaults;
    private initGuard;
    private createUninitializedErr;
    private addCharacters;
    private createCharUnknownErr;
    private addCharacterInternal;
}
