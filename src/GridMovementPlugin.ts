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
  private randomMovement: RandomMovement;
  private targetMovement: TargetMovement;
  constructor(
    public scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager
  ) {
    super(scene, pluginManager);
    this.gridCharacters = new Map();
    this.randomMovement = new RandomMovement();
    this.targetMovement = new TargetMovement();
  }

  boot() {
    this.systems.events.on("update", this.update, this);
  }

  create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig) {
    const tilemapScale = tilemap.layers[0].tilemapLayer.scale;
    const tileSize = tilemap.tileWidth * tilemapScale;
    const gridTilemap = this.createTilemap(tilemap, config);
    this.addCharacters(gridTilemap, config, tileSize);
  }

  getPosition(charId: string): Phaser.Math.Vector2 {
    return this.gridCharacters.get(charId).getTilePos();
  }

  moveLeft(charId: string) {
    this.gridCharacters.get(charId).move(Direction.LEFT);
  }

  moveRight(charId: string) {
    this.gridCharacters.get(charId).move(Direction.RIGHT);
  }

  moveUp(charId: string) {
    this.gridCharacters.get(charId).move(Direction.UP);
  }

  moveDown(charId: string) {
    this.gridCharacters.get(charId).move(Direction.DOWN);
  }

  moveRandomly(charId: string, delay: number = 0, radius: number = -1) {
    this.randomMovement.addCharacter(
      this.gridCharacters.get(charId),
      delay,
      radius
    );
  }

  moveTo(charId: string, targetPos: Phaser.Math.Vector2) {
    this.targetMovement.addCharacter(
      this.gridCharacters.get(charId),
      targetPos
    );
  }

  stopMovingRandomly(charId: string) {
    this.randomMovement.removeCharacter(this.gridCharacters.get(charId));
  }

  setSpeed(charId: string, speed: number) {
    this.gridCharacters.get(charId).setSpeed(speed);
  }

  update(_time: number, delta: number) {
    this.randomMovement.update(delta);
    this.targetMovement.update();
    if (this.gridCharacters) {
      for (let [_key, val] of this.gridCharacters) {
        val.update(delta);
      }
    }
  }

  private createTilemap(
    tilemap: Phaser.Tilemaps.Tilemap,
    config: GridMovementConfig
  ) {
    return new GridTilemap(tilemap, config.firstLayerAboveChar);
  }

  private addCharacters(
    gridTilemap: GridTilemap,
    config: GridMovementConfig,
    tileSize: number
  ) {
    const enrichedCharData = config.characters.map((charData) => ({
      speed: 4,
      startPosition: new Phaser.Math.Vector2(0, 0),
      ...charData,
    }));

    this.gridCharacters = new Map(
      enrichedCharData.map((charData) => [
        charData.id,
        new GridCharacter(
          charData.id,
          charData.sprite,
          charData.characterIndex,
          tileSize,
          gridTilemap,
          charData.speed
        ),
      ])
    );

    enrichedCharData.forEach((charData) =>
      this.gridCharacters
        .get(charData.id)
        .setTilePosition(charData.startPosition)
    );

    for (let [_key, val] of this.gridCharacters) {
      gridTilemap.addCharacter(val);
    }
  }
}
