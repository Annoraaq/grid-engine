import { CollisionStrategy, Direction } from "../../GridEngineHeadless.js";
import {
  mockLayeredBlockMap,
  updateLayer,
} from "../../Utils/MockFactory/MockFactory.js";
import { Rect } from "../../Utils/Rect/Rect.js";
import { GridTilemap } from "../GridTilemap.js";
import { TileCollisionCache } from "./TileCollisionCache.js";

describe("TileCollisionCache", () => {
  it("detects tiles", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
    ]);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();

    expect(tileCollisionCache.hasTileAt(0, 0, "lowerCharLayer")).toBe(true);
    expect(tileCollisionCache.hasTileAt(0, 1, "lowerCharLayer")).toBe(true);
    expect(tileCollisionCache.hasTileAt(0, 1, "unknownLayer")).toBe(undefined);
    expect(tileCollisionCache.hasTileAt(-1, 0, "lowerCharLayer")).toBe(
      undefined,
    );
  });

  it("detects blocked tiles", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
      {
        layer: "noCharLayer",
        isCharLayer: false,
        blockMap: [
          // prettier-ignore
          "..",
          ".#",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "→.",
        ],
      },
    ]);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(1, 1, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(1, 1, "upperCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(true);

    const blocking = [
      Direction.RIGHT,
      Direction.UP,
      Direction.DOWN,
      Direction.DOWN_LEFT,
      Direction.DOWN_RIGHT,
      Direction.UP_LEFT,
      Direction.UP_RIGHT,
    ];
    expect(
      tileCollisionCache.isBlockingFrom(0, 1, "upperCharLayer", Direction.LEFT),
    ).toBe(false);

    for (const dir of blocking) {
      expect(
        tileCollisionCache.isBlockingFrom(0, 1, "upperCharLayer", dir),
      ).toBe(true);
    }
  });

  it("ignores missing tiles", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".",
        ],
      },
    ]);

    tm.getLayers()[0].getData()[0][0] = undefined;

    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();

    expect(
      tileCollisionCache.isBlockingFrom(
        0,
        0,
        "lowerCharLayer",
        undefined,
        false,
      ),
    ).toBe(true);

    expect(
      tileCollisionCache.isBlockingFrom(
        0,
        0,
        "lowerCharLayer",
        undefined,
        true,
      ),
    ).toBe(false);
  });

  it("rebuilds cache", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
    ]);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(true);

    updateLayer(
      tm,
      [
        // prettier-ignore
        "#.",
        "..",
      ],
      "lowerCharLayer",
    );

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(true);

    tileCollisionCache.rebuild();

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(false);
  });

  it("rebuilds cache partially", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "#...",
          ".##.",
          ".##.",
          "....",
        ],
      },
    ]);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 1, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(2, 1, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 2, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(2, 2, "lowerCharLayer", undefined),
    ).toBe(true);

    updateLayer(
      tm,
      [
        // prettier-ignore
        "....",
        "....",
        "....",
        "....",
      ],
      "lowerCharLayer",
    );

    tileCollisionCache.rebuild(new Rect(1, 1, 2, 1));

    expect(
      tileCollisionCache.isBlockingFrom(0, 0, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 1, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(2, 1, "lowerCharLayer", undefined),
    ).toBe(false);
    expect(
      tileCollisionCache.isBlockingFrom(1, 2, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(2, 2, "lowerCharLayer", undefined),
    ).toBe(true);
  });

  it("fixes layer", () => {
    const tm = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".#",
          "..",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          "..",
          "..",
        ],
      },
    ]);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const tileCollisionCache = new TileCollisionCache(tm, gridTilemap);
    tileCollisionCache.rebuild();
    tileCollisionCache.fixLayer("lowerCharLayer");

    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "upperCharLayer", undefined),
    ).toBe(true);

    tileCollisionCache.unfixLayers();

    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "lowerCharLayer", undefined),
    ).toBe(true);
    expect(
      tileCollisionCache.isBlockingFrom(1, 0, "upperCharLayer", undefined),
    ).toBe(false);
  });
});
