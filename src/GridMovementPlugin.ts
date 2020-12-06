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
    this.systems.events.on("update", this.update, this);
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
    this.gridPlayer = new GridCharacter(
      "player",
      playerSprite,
      6,
      tileSize,
      tilemap,
      this.config.speed
    );
    this.gridPlayer.setTilePosition(this.config.startPosition);
  }

  movePlayerLeft() {
    this.gridPlayer.moveCharacter(Direction.LEFT);
  }

  movePlayerRight() {
    this.gridPlayer.moveCharacter(Direction.RIGHT);
  }

  movePlayerUp() {
    this.gridPlayer.moveCharacter(Direction.UP);
  }

  movePlayerDown() {
    this.gridPlayer.moveCharacter(Direction.DOWN);
  }

  update(_time: number, delta: number) {
    this.gridPlayer?.update(delta);
  }
}
