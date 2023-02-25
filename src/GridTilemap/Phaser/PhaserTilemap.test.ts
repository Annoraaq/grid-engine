import { createPhaserTilemapStub } from "../../Utils/MockFactory/MockPhaserTilemap";
import * as Phaser from "phaser";
import { PhaserTilemap } from "./PhaserTilemap";
import { PhaserTileLayer } from "./PhaserTileLayer";
import { PhaserTile } from "./PhaserTile";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

describe("PhaserTilemap", () => {
  it("should get tile size", () => {
    const tilemap = createPhaserTilemapStub(new Map([["layer_name", [""]]]));
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.getTileWidth()).toEqual(16);
    expect(phaserTilemap.getTileHeight()).toEqual(16);
  });

  it("should get tile dimensions", () => {
    const tilemap = createPhaserTilemapStub(
      new Map([["layer_name", ["...", "..."]]])
    );
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.getWidth()).toEqual(3);
    expect(phaserTilemap.getHeight()).toEqual(2);
  });

  it("should get orientation", () => {
    const tilemap = createPhaserTilemapStub(new Map([["layer_name", [""]]]));
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.getOrientation()).toEqual("orthogonal");

    tilemap.orientation = Phaser.Tilemaps.Orientation.ISOMETRIC.toString();
    expect(phaserTilemap.getOrientation()).toEqual("isometric");
  });

  it("should get layers", () => {
    const tilemap = createPhaserTilemapStub(
      new Map([
        ["layer_name", [""]],
        ["layer2", [""]],
      ])
    );
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.getLayers()).toEqual(
      tilemap.layers.map((l) => new PhaserTileLayer(l.tilemapLayer))
    );
  });

  it("should detect tile", () => {
    const tilemap = createPhaserTilemapStub(
      new Map([["layer_name", ["..", ".."]]])
    );
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.hasTileAt(0, 0, "layer_name")).toBe(true);
    expect(phaserTilemap.hasTileAt(3, 3, "layer_name")).toBe(false);
    expect(phaserTilemap.hasTileAt(0, 0)).toBe(true);
    expect(phaserTilemap.hasTileAt(3, 3)).toBe(false);
    expect(phaserTilemap.hasTileAt(0, 0, "unknown")).toBe(false);
  });

  it("should get tile", () => {
    const tilemap = createPhaserTilemapStub(
      new Map([["layer_name", ["..", ".."]]])
    );
    const layerData = tilemap.getLayer("layer_name");
    const phaserTilemap = new PhaserTilemap(tilemap);
    expect(phaserTilemap.getTileAt(0, 0, "layer_name")).toEqual(
      new PhaserTile(layerData.data[0][0])
    );
    expect(phaserTilemap.getTileAt(3, 3, "layer_name")).toBe(undefined);
    expect(phaserTilemap.getTileAt(0, 0)).toEqual(
      new PhaserTile(layerData.data[0][0])
    );
    expect(phaserTilemap.getTileAt(3, 3)).toBe(undefined);
    expect(phaserTilemap.getTileAt(0, 0, "unknown")).toBe(undefined);
  });
});
