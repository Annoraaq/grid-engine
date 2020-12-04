import "phaser";
export declare type TileSizePerSecond = number;
export interface GridMovementConfig {
    speed?: TileSizePerSecond;
    startPosition?: Phaser.Math.Vector2;
}
export declare class GridMovementPlugin extends Phaser.Plugins.ScenePlugin {
    scene: Phaser.Scene;
    private gridControls;
    private gridPhysics;
    private gridPlayer;
    private config;
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);
    boot(): void;
    create(playerSprite: Phaser.GameObjects.Sprite, tilemap: Phaser.Tilemaps.Tilemap, config?: GridMovementConfig): void;
    movePlayerLeft(): void;
    movePlayerRight(): void;
    movePlayerUp(): void;
    movePlayerDown(): void;
    update(_time: number, delta: number): void;
}
