import { TiledTilemap } from "./TiledTilemap";
import * as cloudCityTilemap from '../../testing/testdata/tilemaps/cloud_city.json';

describe("TiledTilemap", () => {
  let tilemap: TiledTilemap;
  beforeEach(() => {
    tilemap = new TiledTilemap(cloudCityTilemap);
  });

  it("returns width", () => {
    expect(tilemap.getWidth()).toBe(20);
  });

});
