import { GridCharacter } from "./GridCharacter/GridCharacter";
import "phaser";
import { Direction } from "./Direction/Direction";
import { GridTilemap } from "./GridTilemap/GridTilemap";

export type TileSizePerSecond = number;

export interface GridMovementConfig {
  characters: CharacterData[];
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
    const tilemapScale = tilemap.layers[0].tilemapLayer.scale;
    const tileSize = tilemap.tileWidth * tilemapScale;

    const enrichedCharData = config.characters.map((charData) => ({
      speed: 4,
      startPosition: new Phaser.Math.Vector2(0, 0),
      ...charData,
    }));
    const gridTilemap = new GridTilemap(tilemap);
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

  moveCharLeft(charId: string) {
    this.gridCharacters.get(charId).move(Direction.LEFT);
  }

  moveCharRight(charId: string) {
    this.gridCharacters.get(charId).move(Direction.RIGHT);
  }

  moveCharUp(charId: string) {
    this.gridCharacters.get(charId).move(Direction.UP);
  }

  moveCharDown(charId: string) {
    this.gridCharacters.get(charId).move(Direction.DOWN);
  }

  update(_time: number, delta: number) {
    if (this.gridCharacters) {
      for (let [_key, val] of this.gridCharacters) {
        val.update(delta);
      }
    }
  }
}
