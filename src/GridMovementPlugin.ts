import "phaser";
import { GridControls } from "./GridControls";
import { GridPhysics } from "./GridPhysics";
import { GridPlayer } from "./GridPlayer";

export type TileSizePerSecond = number;

export interface GridMovementConfig {
  speed?: TileSizePerSecond;
  startPosition?: Phaser.Math.Vector2;
}

export class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
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
    const gridPlayer = new GridPlayer(playerSprite, 6, tileSize);
    gridPlayer.setTilePosition(this.config.startPosition);

    this.gridPhysics = new GridPhysics(
      gridPlayer,
      tilemap,
      tileSize,
      this.config.speed
    );
    this.gridControls = new GridControls(this.scene.input, this.gridPhysics);

    this.scene.cameras.main.startFollow(playerSprite);
  }

  update(_time: number, delta: number) {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }
}
