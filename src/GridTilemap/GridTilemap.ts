import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Subscription } from "rxjs";
import { Position } from "../GridEngine";

export class GridTilemap {
  private static readonly MAX_PLAYER_LAYERS = 1000;
  static readonly FIRST_PLAYER_LAYER = 1000;
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private characters = new Map<string, GridCharacter>();
  private collisionTilePropertyName = "ge_collide";
  private tilePosToCharacters: Map<string, Set<GridCharacter>> = new Map();
  private charactersSubscription: Map<string, Subscription> = new Map();
  private charactersSubscription2: Map<string, Subscription> = new Map();

  constructor(
    private tilemap: Phaser.Tilemaps.Tilemap,
    private firstLayerAboveChar?: number
  ) {
    this.setLayerDepths();
  }

  addCharacter(character: GridCharacter): void {
    this.characters.set(character.getId(), character);
    if (
      !this.tilePosToCharacters.has(this.posToString(character.getTilePos()))
    ) {
      this.tilePosToCharacters.set(
        this.posToString(character.getTilePos()),
        new Set()
      );
    }
    this.tilePosToCharacters
      .get(this.posToString(character.getTilePos()))
      .add(character);
    if (
      !this.tilePosToCharacters.has(
        this.posToString(character.getNextTilePos())
      )
    ) {
      this.tilePosToCharacters.set(
        this.posToString(character.getNextTilePos()),
        new Set()
      );
    }
    this.tilePosToCharacters
      .get(this.posToString(character.getNextTilePos()))
      .add(character);
    const sub = character.positionChanged().subscribe((positionChange) => {
      if (
        !this.tilePosToCharacters.has(
          this.posToString(positionChange.enterTile)
        )
      ) {
        this.tilePosToCharacters.set(
          this.posToString(positionChange.enterTile),
          new Set()
        );
      }
      this.tilePosToCharacters
        .get(this.posToString(positionChange.enterTile))
        .add(character);
    });
    const sub2 = character
      .positionChangeFinished()
      .subscribe((positionChange) => {
        this.tilePosToCharacters
          .get(this.posToString(positionChange.exitTile))
          .delete(character);
      });

    this.charactersSubscription.set(character.getId(), sub);
    this.charactersSubscription2.set(character.getId(), sub2);
  }

  removeCharacter(charId: string): void {
    this.charactersSubscription.get(charId).unsubscribe();
    this.charactersSubscription2.get(charId).unsubscribe();
    const char = this.characters.get(charId);
    this.tilePosToCharacters
      .get(this.posToString(char.getTilePos()))
      .delete(char);
    this.tilePosToCharacters
      .get(this.posToString(char.getNextTilePos()))
      .delete(char);
    this.characters.delete(charId);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  isBlocking(pos: Vector2, direction?: Direction): boolean {
    return (
      this.hasNoTile(pos) ||
      this.hasBlockingTile(pos, direction) ||
      this.hasBlockingChar(pos)
    );
  }

  hasBlockingTile(pos: Vector2, direction?: Direction): boolean {
    if (this.hasNoTile(pos)) return true;

    const collidesPropName =
      GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + direction;
    return this.tilemap.layers.some((layer) => {
      const tile = this.tilemap.getTileAt(pos.x, pos.y, false, layer.name);
      return (
        tile?.properties &&
        (tile.properties[this.collisionTilePropertyName] ||
          tile.properties[collidesPropName])
      );
    });
  }

  hasNoTile(pos: Vector2): boolean {
    return !this.tilemap.layers.some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(pos: Vector2): boolean {
    const posStr = this.posToString(pos);
    return (
      this.tilePosToCharacters.has(posStr) &&
      this.tilePosToCharacters.get(posStr).size > 0
    );
  }

  setCollisionTilePropertyName(name: string): void {
    this.collisionTilePropertyName = name;
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileWidth * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.layers[0].tilemapLayer.scale;
    return this.tilemap.tileHeight * tilemapScale;
  }

  private posToString(pos: Position): string {
    return `${pos.x}#${pos.y}`;
  }

  private getLayerProp(layer: Phaser.Tilemaps.LayerData, name: string): any {
    const layerProps = layer.properties as [{ name: any; value: any }];
    const prop = layerProps.find((el) => el.name == name);
    return prop?.value;
  }

  private hasLayerProp(
    layer: Phaser.Tilemaps.LayerData,
    name: string
  ): boolean {
    return this.getLayerProp(layer, name) != undefined;
  }

  private isLayerAlwaysOnTop(
    layerData: Phaser.Tilemaps.LayerData,
    layerIndex: number
  ): boolean {
    return (
      layerIndex >= this.firstLayerAboveChar ||
      this.hasLayerProp(layerData, GridTilemap.ALWAYS_TOP_PROP_NAME)
    );
  }

  private setLayerDepths() {
    const layersToDelete: Phaser.Tilemaps.TilemapLayer[] = [];
    this.tilemap.layers.forEach((layerData, layerIndex) => {
      if (this.isLayerAlwaysOnTop(layerData, layerIndex)) {
        layerData.tilemapLayer.setDepth(
          GridTilemap.FIRST_PLAYER_LAYER +
            GridTilemap.MAX_PLAYER_LAYERS +
            layerIndex
        );
      } else if (
        this.hasLayerProp(layerData, GridTilemap.HEIGHT_SHIFT_PROP_NAME)
      ) {
        this.createLayerForEachRow(layerData, layerIndex);
        layersToDelete.push(layerData.tilemapLayer);
      } else {
        layerData.tilemapLayer.setDepth(layerIndex);
      }
    });
    layersToDelete.forEach((layer) => layer.destroy());
  }

  private createLayerForEachRow(
    layer: Phaser.Tilemaps.LayerData,
    layerIndex: number
  ) {
    const heightShift = this.getLayerProp(
      layer,
      GridTilemap.HEIGHT_SHIFT_PROP_NAME
    );
    for (let row = 0; row < layer.height; row++) {
      const newLayer = this.tilemap.createBlankLayer(
        `${layerIndex}#${row}`,
        layer.tilemapLayer.tileset
      );
      for (let col = 0; col < layer.width; col++) {
        newLayer.putTileAt(layer.data[row][col], col, row);
      }

      newLayer.scale = layer.tilemapLayer.scale;

      const makeHigherThanPlayerWhenOnSameLevel = 0.5;
      newLayer.setDepth(
        GridTilemap.FIRST_PLAYER_LAYER +
          row +
          heightShift -
          1 +
          makeHigherThanPlayerWhenOnSameLevel
      );
    }
  }
}
