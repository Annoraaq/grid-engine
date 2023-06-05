import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { Finished, MoveToConfig, MoveToResult } from "./Movement/TargetMovement/TargetMovement";
import { PositionChange } from "./GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "./Direction/Direction";
import { Observable } from "rxjs";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { MovementInfo } from "./Movement/Movement";
import { CharacterIndex, FrameRow } from "./GridCharacter/CharacterAnimation/CharacterAnimation";
import { CharacterFilteringOptions } from "./GridCharacter/CharacterFilter/CharacterFilter";
import { IsPositionAllowedFn, PathfindingOptions } from "./Pathfinding/Pathfinding";
import { ShortestPathAlgorithmType } from "./Pathfinding/ShortestPathAlgorithm";
import { GridEngineHeadless, TileSizePerSecond, GridEngineConfigHeadless, CollisionConfig, CharacterDataHeadless } from "./GridEngineHeadless";
import { PhaserTilemap } from "./GridTilemap/Phaser/PhaserTilemap";
import { Orientation, Tile, TileLayer, Tilemap } from "./GridTilemap/Tilemap";
import { PhaserTileLayer } from "./GridTilemap/Phaser/PhaserTileLayer";
import { PhaserTile } from "./GridTilemap/Phaser/PhaserTile";
import { CharacterShift, CharacterShiftAction, CharLayer, FollowOptions, IGridEngine, LayerPosition, PathfindingResult, Position } from "./IGridEngine";
export { CharacterDataHeadless, CharacterFilteringOptions, CharacterShift, CharacterShiftAction, CharLayer, CollisionConfig, CollisionStrategy, Direction, Finished, FollowOptions, FrameRow, GridEngineConfigHeadless, GridEngineHeadless, IGridEngine, IsPositionAllowedFn, LayerPosition, MovementInfo, MoveToConfig, MoveToResult, NoPathFoundStrategy, NumberOfDirections, Orientation, PathBlockedStrategy, PathfindingOptions, PathfindingResult, Position, PositionChange, PhaserTile, PhaserTileLayer, PhaserTilemap, ShortestPathAlgorithmType, Tile, TileLayer, Tilemap, TileSizePerSecond, };
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
export declare class GridEngine implements IGridEngine {
    private scene;
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
    create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void;
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
    /** @returns Container for a character. */
    getContainer(charId: string): Phaser.GameObjects.Container | undefined;
    /** @returns X-offset for a character. */
    getOffsetX(charId: string): number;
    /** @returns Y-offset for a character. */
    getOffsetY(charId: string): number;
    /** {@inheritDoc IGridEngine.collidesWithTiles} */
    collidesWithTiles(charId: string): boolean;
    /**
     * @returns {@link WalkingAnimationMapping} for a character. If a character
     * index was set, it will be returned instead.
     */
    getWalkingAnimationMapping(charId: string): WalkingAnimationMapping | number | undefined;
    /**
     * @returns `true` if {@link https://annoraaq.github.io/grid-engine/p/layer-overlay/ | layer overlay}
     * is activated.
     */
    hasLayerOverlay(): boolean;
    /**
     * Sets the {@link WalkingAnimationMapping} for a character. Alternatively you
     * can provide a number which is the character index (see also
     * {@link CharacterData | Character Config}). If you provide `undefined`, it
     * will disable walking animations for the character.
     */
    setWalkingAnimationMapping(charId: string, walkingAnimationMapping?: WalkingAnimationMapping | number): void;
    /** @internal */
    update(time: number, delta: number): void;
    /** Adds a character after calling {@link create}. */
    addCharacter(charData: CharacterData): void;
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
    /**
     * @returns Sprite of given character
     */
    getSprite(charId: string): Phaser.GameObjects.Sprite | undefined;
    /**
     * Sets the sprite for a character.
     */
    setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void;
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
    /** {@inheritDoc IGridEngine.rebuildTileCollisionCache} */
    rebuildTileCollisionCache(x: number, y: number, width: number, height: number): void;
    private setConfigDefaults;
    private initGuard;
    private createUninitializedErr;
    private addCharacters;
    private createCharUnknownErr;
    private setCharSprite;
    private addCharacterInternal;
}
