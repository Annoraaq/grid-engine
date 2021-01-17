import { TargetMovement } from "./TargetMovement/TargetMovement";
import { GridCharacter } from "./GridCharacter/GridCharacter";
import "phaser";
import { Direction } from "./Direction/Direction";
import { GridTilemap } from "./GridTilemap/GridTilemap";
import { RandomMovement } from "./RandomMovement/RandomMovement";

export type TileSizePerSecond = number;

export interface GridMovementConfig {
  characters: CharacterData[];
  firstLayerAboveChar: number;
}

export interface CharacterData {
  id: string;
  sprite: Phaser.GameObjects.Sprite;
  characterIndex: number;
  speed?: TileSizePerSecond;
  startPosition?: Phaser.Math.Vector2;
}

export class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
  private gridCharacters: Map<string, GridCharacter>;
  private tilemap: Phaser.Tilemaps.Tilemap;
  private gridTilemap: GridTilemap;
  private randomMovement: RandomMovement;
  private targetMovement: TargetMovement;
  private isCreated: boolean = false;
  constructor(
    public scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager
  ) {
    super(scene, pluginManager);
  }

  boot() {
    this.systems.events.on("update", this.update, this);
  }

  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig) {
    this.isCreated = true;
    this.gridCharacters = new Map();
    this.randomMovement = new RandomMovement();
    this.tilemap = tilemap;
    this.gridTilemap = this.createTilemap(tilemap, config);
    this.targetMovement = new TargetMovement(this.gridTilemap);
    this.addCharacters(config);
  }

  getPosition(charId: string): Phaser.Math.Vector2 {
    this.initGuard();
    this.unknownCharGuard(charId);
    return this.gridCharacters.get(charId).getTilePos();
  }

  moveLeft(charId: string) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).move(Direction.LEFT);
  }

  moveRight(charId: string) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).move(Direction.RIGHT);
  }

  moveUp(charId: string) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).move(Direction.UP);
  }

  moveDown(charId: string) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).move(Direction.DOWN);
  }

  moveRandomly(charId: string, delay: number = 0, radius: number = -1) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.randomMovement.addCharacter(
      this.gridCharacters.get(charId),
      delay,
      radius
    );
  }

  moveTo(charId: string, targetPos: Phaser.Math.Vector2) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.targetMovement.addCharacter(
      this.gridCharacters.get(charId),
      targetPos
    );
  }

  stopMovingRandomly(charId: string) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.randomMovement.removeCharacter(this.gridCharacters.get(charId));
  }

  setSpeed(charId: string, speed: number) {
    this.initGuard();
    this.unknownCharGuard(charId);
    this.gridCharacters.get(charId).setSpeed(speed);
  }

  update(_time: number, delta: number) {
    if (this.isCreated) {
      this.randomMovement.update(delta);
      this.targetMovement.update();
      if (this.gridCharacters) {
        for (let [_key, val] of this.gridCharacters) {
          val.update(delta);
        }
      }
    }
  }

  addCharacter(charData: CharacterData) {
    this.initGuard();
    const enrichedCharData = {
      speed: 4,
      startPosition: new Phaser.Math.Vector2(0, 0),
      ...charData,
    };

    const gridChar = new GridCharacter(
      enrichedCharData.id,
      enrichedCharData.sprite,
      enrichedCharData.characterIndex,
      this.getTileSize(),
      this.gridTilemap,
      enrichedCharData.speed
    );

    this.gridCharacters.set(enrichedCharData.id, gridChar);

    gridChar.setTilePosition(enrichedCharData.startPosition);

    this.gridTilemap.addCharacter(gridChar);
  }

  hasCharacter(charId: string): boolean {
    this.initGuard();
    return this.gridCharacters.has(charId);
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

  private createTilemap(
    tilemap: Phaser.Tilemaps.Tilemap,
    config: GridMovementConfig
  ) {
    return new GridTilemap(tilemap, config.firstLayerAboveChar);
  }

  private getTileSize(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileWidth * tilemapScale;
  }

  private addCharacters(config: GridMovementConfig) {
    config.characters.forEach((charData) => this.addCharacter(charData));
  }
}
