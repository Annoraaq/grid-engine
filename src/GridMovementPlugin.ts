import { GridCharacter } from "./GridCharacter/GridCharacter";
import "phaser";
import { Direction } from "./Direction/Direction";
import { GridPhysics } from "./GridPhysics/GridPhysics";

export type TileSizePerSecond = number;

export interface GridMovementConfig {
  speed?: TileSizePerSecond;
  startPosition?: Phaser.Math.Vector2;
}

export class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
  private gridPhysics: GridPhysics;
  private gridPlayer: GridCharacter;
  private config: GridMovementConfig;
  constructor(
    public scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager
  ) {
    super(scene, pluginManager);
  }

  boot() {
    var eventEmitter = this.systems.events;

    eventEmitter.on("update", this.update, this);
  }

  create(
    playerSprite: Phaser.GameObjects.Sprite,
    tilemap: Phaser.Tilemaps.Tilemap,
    config?: GridMovementConfig
  ) {
    this.config = {
      speed: 4,
      startPosition: new Phaser.Math.Vector2(0, 0),
      ...config,
    };
    const tilemapScale = tilemap.layers[0].tilemapLayer.scale;
    const tileSize = tilemap.tileWidth * tilemapScale;
    this.gridPlayer = new GridCharacter(playerSprite, 6, tileSize);
    this.gridPlayer.setTilePosition(this.config.startPosition);

    this.gridPhysics = new GridPhysics(
      this.gridPlayer,
      tilemap,
      tileSize,
      this.config.speed
    );
  }

  movePlayerLeft() {
    this.gridPhysics.movePlayer(Direction.LEFT);
  }

  movePlayerRight() {
    this.gridPhysics.movePlayer(Direction.RIGHT);
  }

  movePlayerUp() {
    this.gridPhysics.movePlayer(Direction.UP);
  }

  movePlayerDown() {
    this.gridPhysics.movePlayer(Direction.DOWN);
  }

  update(_time: number, delta: number) {
    this.gridPhysics?.update(delta);
  }
}
