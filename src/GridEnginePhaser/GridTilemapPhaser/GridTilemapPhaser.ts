import {
  directionVector,
  turnClockwise,
  turnCounterClockwise,
} from "../../Direction/Direction";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter";
import { CharLayer, Direction } from "../../GridEngine";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { TileLayer, Tilemap } from "../../GridTilemap/Tilemap";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { Rect } from "../../Utils/Rect/Rect";
import { Utils } from "../../Utils/Utils/Utils";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { VectorUtils } from "../../Utils/VectorUtils";

export class GridTilemapPhaser {
  private gridTilemap: GridTilemap;
  private static readonly ALWAYS_TOP_PROP_NAME = "ge_alwaysTop";
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly HEIGHT_SHIFT_PROP_NAME = "ge_heightShift";
  private static readonly Z_INDEX_PADDING = 7;
  private charLayerDepths = new Map<CharLayer, number>();

  constructor(private tilemap: Tilemap) {
    this.gridTilemap = new GridTilemap(tilemap);
    this.setLayerDepths();
  }

  getGridTilemap(): GridTilemap {
    return this.gridTilemap;
  }

  addCharacter(character: GridCharacter): void {
    this.gridTilemap.addCharacter(character);
  }

  removeCharacter(charId: string): void {
    this.gridTilemap.removeCharacter(charId);
  }

  getCharacters(): GridCharacter[] {
    return this.gridTilemap.getCharacters();
  }

  getCharactersAt(position: Vector2, layer: string): Set<GridCharacter> {
    return this.gridTilemap.getCharactersAt(position, layer);
  }

  hasBlockingTile(
    pos: Vector2,
    charLayer: string | undefined,
    direction?: Direction,
    ignoreHasTile?: boolean
  ): boolean {
    return this.gridTilemap.hasBlockingTile(
      pos,
      charLayer,
      direction,
      ignoreHasTile
    );
  }

  getTransition(pos: Vector2, fromLayer?: string): string | undefined {
    return this.gridTilemap.getTransition(pos, fromLayer);
  }

  setTransition(pos: Vector2, fromLayer: CharLayer, toLayer: CharLayer): void {
    this.gridTilemap.setTransition(pos, fromLayer, toLayer);
  }

  getTransitions(): Map<CharLayer, Map<CharLayer, CharLayer>> {
    return this.gridTilemap.getTransitions();
  }

  hasNoTile(pos: Vector2, charLayer?: string): boolean {
    return this.gridTilemap.hasNoTile(pos, charLayer);
  }

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[],
    exclude = new Set<CharId>()
  ): boolean {
    return this.gridTilemap.hasBlockingChar(
      pos,
      layer,
      collisionGroups,
      exclude
    );
  }

  getTileWidth(): number {
    const tilemapScale = this.tilemap.getLayers()[0].getScale();
    return this.tilemap.getTileWidth() * tilemapScale;
  }

  getTileHeight(): number {
    const tilemapScale = this.tilemap.getLayers()[0].getScale();
    return this.tilemap.getTileHeight() * tilemapScale;
  }

  getDepthOfCharLayer(layerName: CharLayer): number {
    return this.charLayerDepths.get(layerName) ?? 0;
  }

  isInRange(pos: Vector2): boolean {
    const rect = new Rect(
      0,
      0,
      this.tilemap.getWidth(),
      this.tilemap.getHeight()
    );
    return rect.isInRange(pos);
  }

  getTileSize(): Vector2 {
    return new Vector2(this.getTileWidth(), this.getTileHeight());
  }

  tilePosToPixelPos(tilePosition: Vector2): Vector2 {
    if (this.isIsometric()) {
      return VectorUtils.scalarMult(this.getTileSize(), 0.5).multiply(
        new Vector2(
          tilePosition.x - tilePosition.y,
          tilePosition.x + tilePosition.y
        )
      );
    }
    return tilePosition.clone().multiply(this.getTileSize());
  }

  getTileDistance(direction: Direction): Vector2 {
    if (this.isIsometric()) {
      switch (direction) {
        case Direction.DOWN_LEFT:
        case Direction.DOWN_RIGHT:
        case Direction.UP_LEFT:
        case Direction.UP_RIGHT:
          return VectorUtils.scalarMult(this.getTileSize(), 0.5);
        default:
          return this.getTileSize();
      }
    }
    return this.getTileSize();
  }

  toMapDirection(direction: Direction): Direction {
    if (this.isIsometric()) {
      return turnCounterClockwise(direction);
    }
    return direction;
  }

  fromMapDirection(direction: Direction): Direction {
    if (this.isIsometric()) {
      return turnClockwise(direction);
    }
    return direction;
  }

  isIsometric(): boolean {
    return this.tilemap.getOrientation() === "isometric";
  }

  getTilePosInDirection(
    position: LayerVecPos,
    direction: Direction
  ): LayerVecPos {
    const posInDir = position.position.add(
      directionVector(this.toMapDirection(direction))
    );

    const transition =
      this.getTransition(posInDir, position.layer) || position.layer;
    return {
      position: posInDir,
      layer: transition,
    };
  }

  private isLayerAlwaysOnTop(layer: TileLayer): boolean {
    return this.gridTilemap.hasLayerProp(
      layer,
      GridTilemapPhaser.ALWAYS_TOP_PROP_NAME
    );
  }

  private isCharLayer(layer: TileLayer): boolean {
    return this.gridTilemap.hasLayerProp(
      layer,
      GridTilemapPhaser.CHAR_LAYER_PROP_NAME
    );
  }

  private setLayerDepths() {
    const layersToDelete: TileLayer[] = [];
    let offset = -1;
    const alwaysOnTopLayers = this.tilemap
      .getLayers()
      .filter((l) => this.isLayerAlwaysOnTop(l));
    const otherLayers = this.tilemap
      .getLayers()
      .filter((l) => !this.isLayerAlwaysOnTop(l));
    otherLayers.forEach((layer) => {
      if (
        this.gridTilemap.hasLayerProp(
          layer,
          GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME
        )
      ) {
        this.createHeightShiftLayers(layer, offset);
        layersToDelete.push(layer);
      } else {
        this.setDepth(layer, ++offset);
      }
    });
    this.charLayerDepths.set(undefined, offset);
    alwaysOnTopLayers.forEach((layer, layerIndex) => {
      layer.setDepth(layerIndex + 1 + offset);
    });

    layersToDelete.forEach((layer) => layer.destroy());
  }

  private setDepth(layer: TileLayer, depth: number): void {
    layer.setDepth(depth);
    if (this.isCharLayer(layer)) {
      this.charLayerDepths.set(
        this.gridTilemap.getLayerProp(
          layer,
          GridTilemapPhaser.CHAR_LAYER_PROP_NAME
        ),
        depth
      );
    }
  }

  private createHeightShiftLayers(layer: TileLayer, offset: number) {
    let heightShift = Number(
      this.gridTilemap.getLayerProp(
        layer,
        GridTilemapPhaser.HEIGHT_SHIFT_PROP_NAME
      )
    );
    if (isNaN(heightShift)) heightShift = 0;

    const makeHigherThanCharWhenOnSameLevel = 1;
    for (let row = 0; row < layer.getHeight(); row++) {
      const newLayer = this.copyLayer(layer, row);
      newLayer.setScale(layer.getScale());
      newLayer.setDepth(
        offset +
          Utils.shiftPad(
            (row + heightShift) * this.getTileHeight() +
              makeHigherThanCharWhenOnSameLevel,
            GridTilemapPhaser.Z_INDEX_PADDING
          )
      );
    }
  }

  private copyLayer(layer: TileLayer, row: number): TileLayer {
    return this.tilemap.copyLayer(layer, `${layer.getName()}#${row}`, row);
  }
}
