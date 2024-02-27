import { Direction, directions } from "../../Direction/Direction.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { GridTilemap } from "../GridTilemap.js";
import { Tilemap } from "../Tilemap.js";
import { Rect } from "../../Utils/Rect/Rect.js";
import { CharLayer } from "../../Position.js";

const BITMAP_POS_HAS_TILE = 0;
const BITMAP_POS_NO_DIRECTION = 1;
const dirToBitmapNo: Record<Direction, number> = {
  [Direction.NONE]: 1,
  [Direction.LEFT]: 2,
  [Direction.UP_LEFT]: 3,
  [Direction.UP]: 4,
  [Direction.UP_RIGHT]: 5,
  [Direction.RIGHT]: 6,
  [Direction.DOWN_RIGHT]: 7,
  [Direction.DOWN]: 8,
  [Direction.DOWN_LEFT]: 9,
};

export class TileCollisionCache {
  private fixedLayer?: number[][];
  constructor(
    private tilemap: Tilemap,
    private gridTilemap: GridTilemap,
  ) {}

  private tileCollisionCache: Map<
    string | undefined /* LayerVecPos */,
    /** Bitmap to store blocking information
     * 0 => hasTile
     * 1 => dir === undefined
     * 2 => LEFT
     * 3 => UP_LEFT
     * 4 => UP
     * 5 => UP_RIGHT
     * 6 => RIGHT
     * 7 => DOWN_RIGHT
     * 8 => DOWN
     * 9 => DOWN_LEFT
     */
    number[][]
  > = new Map();

  fixLayer(layer: CharLayer): void {
    this.fixedLayer = this.tileCollisionCache.get(layer);
  }

  unfixLayers(): void {
    this.fixedLayer = undefined;
  }

  rebuild(rect?: Rect): void {
    if (!rect) {
      rect = new Rect(0, 0, this.tilemap.getWidth(), this.tilemap.getHeight());
    }
    const charLayers = this.tilemap
      .getLayers()
      .filter((layer) => layer.isCharLayer());

    for (const cl of [...charLayers, undefined]) {
      let layerArr = this.tileCollisionCache.get(cl?.getName());

      if (layerArr === undefined) {
        layerArr = new Array(this.tilemap.getWidth());
        for (let i = 0; i < this.tilemap.getWidth(); i++) {
          layerArr[i] = new Array(this.tilemap.getHeight());
        }
        this.tileCollisionCache.set(cl?.getName(), layerArr);
      }
      for (let r = rect.getY(); r < rect.getY() + rect.getHeight(); r++) {
        for (let c = rect.getX(); c < rect.getX() + rect.getWidth(); c++) {
          let bitmap = 0;
          const hasTile = !this.gridTilemap.hasNoTileUncached(
            new Vector2(c, r),
            cl?.getName(),
          );
          if (hasTile) {
            bitmap = setBitAt(bitmap, 0);
          }

          for (const dir of directions()) {
            const blocked = this.gridTilemap.hasBlockingTileUncached(
              new Vector2(c, r),
              cl?.getName(),
              dir,
              true,
            );
            if (blocked) {
              bitmap = setBitAt(bitmap, dirToBitmapNo[dir]);
            }
          }
          const blockedUndefined = this.gridTilemap.hasBlockingTileUncached(
            new Vector2(c, r),
            cl?.getName(),
            undefined,
            true,
          );
          if (blockedUndefined) {
            bitmap = setBitAt(bitmap, dirToBitmapNo[1]);
          }
          layerArr[c][r] = bitmap;
        }
      }
    }
  }

  hasTileAt(x: number, y: number, layer?: string): boolean | undefined {
    const arr = this.fixedLayer || this.tileCollisionCache.get(layer);
    const cached = arr?.[x]?.[y];
    if (cached === undefined) return undefined;
    return getBitAt(cached, BITMAP_POS_HAS_TILE);
  }

  isBlockingFrom(
    x: number,
    y: number,
    layer?: string,
    direction?: Direction,
    ignoreHasTile?: boolean,
  ): boolean | undefined {
    const arr = this.fixedLayer || this.tileCollisionCache.get(layer);
    const cached = arr?.[x]?.[y];
    if (cached === undefined) return undefined;
    if (!ignoreHasTile && !getBitAt(cached, BITMAP_POS_HAS_TILE)) return true;
    if (direction === undefined) {
      return getBitAt(cached, BITMAP_POS_NO_DIRECTION);
    }
    return getBitAt(cached, dirToBitmapNo[direction]);
  }
}

function setBitAt(bitmap: number, pos: number): number {
  return bitmap | (1 << pos);
}

function getBitAt(bitmap: number, pos: number): boolean {
  return ((bitmap >> pos) & 1) == 1;
}
