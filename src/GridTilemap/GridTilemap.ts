import {
  Direction,
  directionVector,
  turnClockwise,
  turnCounterClockwise,
} from "./../Direction/Direction";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache/CharBlockCache";
import { Rect } from "../Utils/Rect/Rect";
import { CharId, GridCharacter } from "../GridCharacter/GridCharacter";
import { LayerVecPos } from "../Pathfinding/ShortestPathAlgorithm";
import { CharLayer } from "../GridEngine";
import { TileLayer, Tilemap } from "./Tilemap";

export class GridTilemap {
  private static readonly CHAR_LAYER_PROP_NAME = "ge_charLayer";
  private static readonly ONE_WAY_COLLIDE_PROP_PREFIX = "ge_collide_";
  private characters = new Map<string, GridCharacter>();
  private charBlockCache: CharBlockCache = new CharBlockCache();
  private transitions: Map<CharLayer, Map<CharLayer, CharLayer>> = new Map();

  constructor(
    private tilemap: Tilemap,
    private collisionTilePropertyName: string
  ) {}

  addCharacter(character: GridCharacter): void {
    this.characters.set(character.getId(), character);
    if (character.getNextTilePos().layer === undefined) {
      character.setTilePosition({
        ...character.getNextTilePos(),
        layer: this.getLowestCharLayer(),
      });
    }
    this.charBlockCache.addCharacter(character);
  }

  removeCharacter(charId: string): void {
    const gridChar = this.characters.get(charId);
    if (!gridChar) return;
    this.charBlockCache.removeCharacter(gridChar);
    this.characters.delete(charId);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  getCharactersAt(position: Vector2, layer: string): Set<GridCharacter> {
    return this.charBlockCache.getCharactersAt(position, layer);
  }

  hasBlockingTile(
    pos: Vector2,
    charLayer: string | undefined,
    direction?: Direction,
    ignoreHasTile?: boolean
  ): boolean {
    if (!ignoreHasTile && this.hasNoTile(pos, charLayer)) return true;
    return this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.isLayerBlockingAt(layer, pos, direction)
    );
  }

  getTransition(pos: Vector2, fromLayer?: string): string | undefined {
    const transitions = this.transitions.get(pos.toString());

    if (transitions) {
      return transitions.get(fromLayer);
    }
  }

  setTransition(pos: Vector2, fromLayer: CharLayer, toLayer: CharLayer): void {
    if (!this.transitions.has(pos.toString())) {
      this.transitions.set(pos.toString(), new Map());
    }
    this.transitions.get(pos.toString())?.set(fromLayer, toLayer);
  }

  getTransitions(): Map<CharLayer, Map<CharLayer, CharLayer>> {
    return new Map(
      [...this.transitions].map(([pos, map]) => [pos, new Map(map)])
    );
  }

  hasNoTile(pos: Vector2, charLayer?: string): boolean {
    return !this.getCollisionRelevantLayers(charLayer).some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.getName())
    );
  }

  hasBlockingChar(
    pos: Vector2,
    layer: string | undefined,
    collisionGroups: string[],
    exclude = new Set<CharId>()
  ): boolean {
    return this.charBlockCache.isCharBlockingAt(
      pos,
      layer,
      collisionGroups,
      exclude
    );
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

  private isLayerBlockingAt(
    layer: TileLayer,
    pos: Vector2,
    direction?: Direction
  ): boolean {
    const collidesPropName =
      GridTilemap.ONE_WAY_COLLIDE_PROP_PREFIX + direction;

    const tile = this.tilemap.getTileAt(pos.x, pos.y, layer.getName());
    return Boolean(
      tile?.getProperties() &&
        (tile.getProperties()[this.collisionTilePropertyName] ||
          tile.getProperties()[collidesPropName])
    );
  }

  private getCharLayerIndexes(): number[] {
    return this.tilemap
      .getLayers()
      .map((layer, index) => ({ layer, index }))
      .filter(({ layer }) => this.isCharLayer(layer))
      .map(({ index }) => index);
  }

  private findPrevAndCharLayer(charLayer: string): {
    prevIndex: number;
    charLayerIndex: number;
  } {
    const indexes = this.getCharLayerIndexes();

    const charLayerIndex = indexes.findIndex((index) => {
      return (
        this.getLayerProp(
          this.tilemap.getLayers()[index],
          GridTilemap.CHAR_LAYER_PROP_NAME
        ) == charLayer
      );
    });

    if (charLayerIndex == 0) {
      return { prevIndex: -1, charLayerIndex: indexes[charLayerIndex] };
    }

    return {
      prevIndex: indexes[charLayerIndex - 1],
      charLayerIndex: indexes[charLayerIndex],
    };
  }

  private getCollisionRelevantLayers(charLayer?: string): TileLayer[] {
    if (!charLayer) return this.tilemap.getLayers();

    const { prevIndex, charLayerIndex } = this.findPrevAndCharLayer(charLayer);

    return this.tilemap.getLayers().slice(prevIndex + 1, charLayerIndex + 1);
  }

  private getLowestCharLayer(): string | undefined {
    const charLayer = this.tilemap.getLayers().find((layer) => {
      return this.hasLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME);
    });

    if (charLayer) {
      return this.getLayerProp(charLayer, GridTilemap.CHAR_LAYER_PROP_NAME);
    }
  }

  getLayerProp(layer: TileLayer, name: string): string | undefined {
    const prop = layer.getProperties()[name];
    return prop;
  }

  hasLayerProp(layer: TileLayer, name: string): boolean {
    return this.getLayerProp(layer, name) != undefined;
  }

  private isCharLayer(layer: TileLayer): boolean {
    return this.hasLayerProp(layer, GridTilemap.CHAR_LAYER_PROP_NAME);
  }
}
