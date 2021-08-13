import { GlobalConfig } from "./GlobalConfig/GlobalConfig";
import { CollisionStrategy } from "./Collisions/CollisionStrategy";
import { IsometricGridCharacter } from "./GridCharacter/IsometricGridCharacter/IsometricGridCharacter";
import { FollowMovement } from "./Movement/FollowMovement/FollowMovement";
import {
  Finished,
  MoveToConfig,
  TargetMovement,
} from "./Movement/TargetMovement/TargetMovement";
import {
  CharacterIndex,
  CharConfig,
  FrameRow,
  GridCharacter,
  PositionChange,
} from "./GridCharacter/GridCharacter";
import {
  Direction,
  isDiagonal,
  NumberOfDirections,
} from "./Direction/Direction";
import { GridTilemap } from "./GridTilemap/GridTilemap";
import { RandomMovement } from "./Movement/RandomMovement/RandomMovement";
import { Observable, Subject } from "rxjs";
import { takeUntil, filter, map, take } from "rxjs/operators";
import { Vector2 } from "./Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "./Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./Pathfinding/PathBlockedStrategy";
import { Concrete } from "./Utils/TypeUtils";

export { Direction };

export type TileSizePerSecond = number;

export interface Position {
  x: number;
  y: number;
}

export interface GridEngineConfig {
  characters: CharacterData[];
  collisionTilePropertyName?: string;
  numberOfDirections?: NumberOfDirections;
  characterCollisionStrategy?: CollisionStrategy;
}

export interface WalkingAnimationMapping {
  [Direction.UP]: FrameRow;
  [Direction.RIGHT]: FrameRow;
  [Direction.DOWN]: FrameRow;
  [Direction.LEFT]: FrameRow;
  [Direction.UP_LEFT]?: FrameRow;
  [Direction.UP_RIGHT]?: FrameRow;
  [Direction.DOWN_LEFT]?: FrameRow;
  [Direction.DOWN_RIGHT]?: FrameRow;
}

export interface CharacterData {
  id: string;
  sprite: Phaser.GameObjects.Sprite;
  walkingAnimationMapping?: CharacterIndex | WalkingAnimationMapping;
  speed?: TileSizePerSecond;
  startPosition?: Position;
  container?: Phaser.GameObjects.Container;
  offsetX?: number;
  offsetY?: number;
  facingDirection?: Direction;
}

export class GridEngine {
  private gridCharacters: Map<string, GridCharacter>;
  private tilemap: Phaser.Tilemaps.Tilemap;
  private gridTilemap: GridTilemap;
  private isCreated = false;
  private movementStopped$: Subject<{ charId: string; direction: Direction }>;
  private movementStarted$: Subject<{ charId: string; direction: Direction }>;
  private directionChanged$: Subject<{ charId: string; direction: Direction }>;
  private positionChangeStarted$: Subject<{ charId: string } & PositionChange>;
  private positionChangeFinished$: Subject<{ charId: string } & PositionChange>;
  private charRemoved$: Subject<string>;

  constructor(private scene: Phaser.Scene) {
    console.log("test");
    this.scene.sys.events.once("boot", this.boot, this);
  }

  boot(): void {
    this.scene.sys.events.on("update", this.update, this);
    this.scene.sys.events.on("destroy", this.destroy, this);
  }

  destroy(): void {
    this.scene = undefined;
    this.tilemap = undefined;
    this.gridCharacters = undefined;
    this.gridTilemap = undefined;
    this.movementStarted$ = undefined;
    this.movementStopped$ = undefined;
    this.directionChanged$ = undefined;
    this.positionChangeStarted$ = undefined;
    this.positionChangeFinished$ = undefined;
    this.charRemoved$ = undefined;
  }

  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridEngineConfig): void {
    this.isCreated = true;
    this.gridCharacters = new Map();

    const concreteConfig = this.setConfigDefaults(config);

    GlobalConfig.set(concreteConfig);
    this.tilemap = tilemap;
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
    this.gridTilemap = new GridTilemap(tilemap);

    this.addCharacters();
  }

  getPosition(charId: string): Position {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).getTilePos();
  }

  move(charId: string, direction: Direction): void {
    this.moveChar(charId, direction);
  }

  moveRandomly(charId: string, delay = 0, radius = -1): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    const randomMovement = new RandomMovement(delay, radius);
    randomMovement.setNumberOfDirections(GlobalConfig.get().numberOfDirections);
    this.gridCharacters.get(charId).setMovement(randomMovement);
  }

  moveTo(
    charId: string,
    targetPos: Position,
    config?: MoveToConfig
  ): Observable<{ charId: string } & Finished> {
    const moveToConfig = this.assembleMoveToConfig(config);

    this.initGuard();
    this.unknownCharGuard(charId);
    const targetMovement = new TargetMovement(
      this.gridTilemap,
      new Vector2(targetPos),
      0,
      moveToConfig
    );
    targetMovement.setNumberOfDirections(GlobalConfig.get().numberOfDirections);
    this.gridCharacters.get(charId).setMovement(targetMovement);
    return targetMovement.finishedObs().pipe(
      take(1),
      map((finished) => ({
        charId,
        position: finished.position,
        result: finished.result,
        description: finished.description,
      }))
    );
  }

  stopMovement(charId: string): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).setMovement(undefined);
  }

  setSpeed(charId: string, speed: number): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).setSpeed(speed);
  }

  setWalkingAnimationMapping(
    charId: string,
    walkingAnimationMapping: WalkingAnimationMapping
  ): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters
      .get(charId)
      .setWalkingAnimationMapping(walkingAnimationMapping);
  }

  update(_time: number, delta: number): void {
    if (this.isCreated) {
      if (this.gridCharacters) {
        for (const [_key, val] of this.gridCharacters) {
          val.update(delta);
        }
      }
    }
  }

  addCharacter(charData: CharacterData): void {
    this.initGuard();

    const charConfig: CharConfig = {
      sprite: charData.sprite,
      speed: charData.speed || 4,
      tilemap: this.gridTilemap,
      tileSize: new Vector2(
        this.gridTilemap.getTileWidth(),
        this.gridTilemap.getTileHeight()
      ),
      walkingAnimationMapping: charData.walkingAnimationMapping,
      container: charData.container,
      offsetX: charData.offsetX,
      offsetY: charData.offsetY,
    };

    const gridChar = this.createCharacter(charData.id, charConfig);

    if (charData.facingDirection) {
      gridChar.turnTowards(charData.facingDirection);
    }

    this.gridCharacters.set(charData.id, gridChar);

    const startPos = charData.startPosition
      ? new Vector2(charData.startPosition)
      : new Vector2(0, 0);
    gridChar.setTilePosition(startPos);

    this.gridTilemap.addCharacter(gridChar);

    gridChar
      .movementStopped()
      .pipe(this.takeUntilCharRemoved(gridChar.getId()))
      .subscribe((direction: Direction) => {
        this.movementStopped$.next({ charId: gridChar.getId(), direction });
      });

    gridChar
      .movementStarted()
      .pipe(this.takeUntilCharRemoved(gridChar.getId()))
      .subscribe((direction: Direction) => {
        this.movementStarted$.next({ charId: gridChar.getId(), direction });
      });

    gridChar
      .directionChanged()
      .pipe(this.takeUntilCharRemoved(gridChar.getId()))
      .subscribe((direction: Direction) => {
        this.directionChanged$.next({ charId: gridChar.getId(), direction });
      });

    gridChar
      .positionChangeStarted()
      .pipe(this.takeUntilCharRemoved(gridChar.getId()))
      .subscribe(({ exitTile, enterTile }) => {
        this.positionChangeStarted$.next({
          charId: gridChar.getId(),
          exitTile,
          enterTile,
        });
      });

    gridChar
      .positionChangeFinished()
      .pipe(this.takeUntilCharRemoved(gridChar.getId()))
      .subscribe(({ exitTile, enterTile }) => {
        this.positionChangeFinished$.next({
          charId: gridChar.getId(),
          exitTile,
          enterTile,
        });
      });
  }

  hasCharacter(charId: string): boolean {
    this.initGuard();
    return this.gridCharacters.has(charId);
  }

  removeCharacter(charId: string): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridTilemap.removeCharacter(charId);
    this.gridCharacters.delete(charId);
    this.charRemoved$.next(charId);
  }

  removeAllCharacters(): void {
    this.initGuard();
    for (const charId of this.gridCharacters.keys()) {
      this.removeCharacter(charId);
    }
  }

  getAllCharacters(): string[] {
    this.initGuard();
    return [...this.gridCharacters.keys()];
  }

  follow(
    charId: string,
    charIdToFollow: string,
    distance = 0,
    closestPointIfBlocked = false
  ): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.unknownCharGuard(charIdToFollow);
    const followMovement = new FollowMovement(
      this.gridTilemap,
      this.gridCharacters.get(charIdToFollow),
      distance,
      closestPointIfBlocked
        ? NoPathFoundStrategy.CLOSEST_REACHABLE
        : NoPathFoundStrategy.STOP
    );
    followMovement.setNumberOfDirections(GlobalConfig.get().numberOfDirections);
    this.gridCharacters.get(charId).setMovement(followMovement);
  }

  isMoving(charId: string): boolean {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).isMoving();
  }

  getFacingDirection(charId: string): Direction {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).getFacingDirection();
  }

  getFacingPosition(charId: string): Position {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).getFacingPosition();
  }

  turnTowards(charId: string, direction: Direction): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).turnTowards(direction);
  }

  setPosition(charId: string, pos: Position): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).setTilePosition(new Vector2(pos));
  }

  getSprite(charId: string): Phaser.GameObjects.Sprite {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).getSprite();
  }

  setSprite(charId: string, sprite: Phaser.GameObjects.Sprite): void {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).setSprite(sprite);
  }

  movementStarted(): Observable<{ charId: string; direction: Direction }> {
    return this.movementStarted$;
  }

  movementStopped(): Observable<{ charId: string; direction: Direction }> {
    return this.movementStopped$;
  }

  directionChanged(): Observable<{ charId: string; direction: Direction }> {
    return this.directionChanged$;
  }

  positionChangeStarted(): Observable<{ charId: string } & PositionChange> {
    return this.positionChangeStarted$;
  }

  positionChangeFinished(): Observable<{ charId: string } & PositionChange> {
    return this.positionChangeFinished$;
  }

  private setConfigDefaults(
    config: GridEngineConfig
  ): Concrete<GridEngineConfig> {
    return {
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      ...config,
    };
  }

  private takeUntilCharRemoved(charId: string) {
    return takeUntil(this.charRemoved$.pipe(filter((cId) => cId == charId)));
  }

  private initGuard() {
    if (!this.isCreated) {
      throw new Error(
        "Plugin not initialized. You need to call create() first."
      );
    }
  }

  private unknownCharGuard(charId: string) {
    if (!this.gridCharacters.has(charId)) {
      throw new Error(`Character unknown: ${charId}`);
    }
  }

  private createCharacter(id: string, config: CharConfig): GridCharacter {
    if (this._isIsometric()) {
      return new IsometricGridCharacter(id, config);
    } else {
      return new GridCharacter(id, config);
    }
  }

  private addCharacters() {
    GlobalConfig.get().characters.forEach((charData) =>
      this.addCharacter(charData)
    );
  }

  private moveChar(charId: string, direction: Direction): void {
    this.initGuard();
    this.unknownCharGuard(charId);

    if (GlobalConfig.get().numberOfDirections === NumberOfDirections.FOUR) {
      if (!this._isIsometric() && isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction mode.`
        );
        return;
      } else if (this._isIsometric() && !isDiagonal(direction)) {
        console.warn(
          `GridEngine: Character '${charId}' can't be moved '${direction}' in 4 direction isometric mode.`
        );
        return;
      }
    }

    this.gridCharacters.get(charId).move(direction);
  }

  private _isIsometric(): boolean {
    return (
      this.tilemap.orientation == `${Phaser.Tilemaps.Orientation.ISOMETRIC}`
    );
  }

  private assembleMoveToConfig(config: MoveToConfig): MoveToConfig {
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
