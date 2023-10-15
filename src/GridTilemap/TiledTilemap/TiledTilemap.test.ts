import { TiledTilemap } from "./TiledTilemap.js";
import * as cloudCityTilemap from "../../Testing/testdata/tilemaps/cloud_city.json";
import { TiledLayer } from "./TiledLayer.js";

describe("TiledTilemap", () => {
  let tilemap: TiledTilemap;
  let jsonTilemap: any;
  beforeEach(() => {
    jsonTilemap = JSON.parse(JSON.stringify(cloudCityTilemap));
    tilemap = new TiledTilemap(jsonTilemap);
  });

  it("returns width", () => {
    expect(tilemap.getWidth()).toBe(20);
  });

  it("returns height", () => {
    expect(tilemap.getHeight()).toBe(20);
  });

  it("returns orientation", () => {
    expect(tilemap.getOrientation()).toBe("orthogonal");
  });

  it("checks if there is a tile", () => {
    const withinBoundsNoTile: [number, number, string] = [1, 0, "ground"];
    const withinBounds: [number, number, string] = [10, 10, "ground"];
    const outOfBoundsLeft: [number, number, string] = [-1, 0, "ground"];
    const outOfBoundsRight: [number, number, string] = [20, 0, "ground"];
    const outOfBoundsTop: [number, number, string] = [0, -1, "ground"];
    const outOfBoundsBottom: [number, number, string] = [20, 0, "ground"];
    const unknownLayer: [number, number, string] = [20, 0, "unknown"];

    expect(tilemap.hasTileAt(...withinBounds)).toBe(true);
    expect(tilemap.hasTileAt(...outOfBoundsLeft)).toBe(false);
    expect(tilemap.hasTileAt(...outOfBoundsRight)).toBe(false);
    expect(tilemap.hasTileAt(...outOfBoundsTop)).toBe(false);
    expect(tilemap.hasTileAt(...outOfBoundsBottom)).toBe(false);
    expect(tilemap.hasTileAt(...unknownLayer)).toBe(false);
    expect(tilemap.hasTileAt(...withinBoundsNoTile)).toBe(false);
  });

  it("checks if there is a tile for non-layer tilemap", () => {
    jsonTilemap.layers = undefined;
    tilemap = new TiledTilemap(jsonTilemap);
    const withinBounds: [number, number, string] = [10, 10, "ground"];
    expect(tilemap.hasTileAt(...withinBounds)).toBe(false);
  });

  it("gets tile", () => {
    const withinBounds: [number, number, string] = [1, 2, "ground"];
    const withinBoundsNoTile: [number, number, string] = [1, 0, "ground"];
    const outOfBoundsLeft: [number, number, string] = [-1, 0, "ground"];
    const outOfBoundsRight: [number, number, string] = [20, 0, "ground"];
    const outOfBoundsTop: [number, number, string] = [0, -1, "ground"];
    const outOfBoundsBottom: [number, number, string] = [20, 0, "ground"];
    const unknownLayer: [number, number, string] = [20, 0, "unknown"];

    expect(tilemap.getTileAt(...withinBounds)?.getProperty("ge_collide")).toBe(
      true,
    );
    expect(
      tilemap.getTileAt(...withinBoundsNoTile)?.getProperty("ge_collide"),
    ).toBe(undefined);
    expect(tilemap.getTileAt(...outOfBoundsLeft)).toBe(undefined);
    expect(tilemap.getTileAt(...outOfBoundsRight)).toBe(undefined);
    expect(tilemap.getTileAt(...outOfBoundsTop)).toBe(undefined);
    expect(tilemap.getTileAt(...outOfBoundsBottom)).toBe(undefined);
    expect(tilemap.getTileAt(...unknownLayer)).toBe(undefined);
  });

  it("gets layers", () => {
    expect(tilemap.getLayers()).toEqual(
      jsonTilemap.layers.map((l) => new TiledLayer(jsonTilemap.tilesets, l)),
    );
  });
});
