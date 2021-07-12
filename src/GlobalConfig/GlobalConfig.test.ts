import { GlobalConfig } from "./GlobalConfig";
import { GridEngineConfig } from "../GridEngine";
import { Concrete } from "../Utils/TypeUtils";
import { NumberOfDirections } from "../Direction/Direction";
import { CollisionStrategy } from "../Collisions/CollisionStrategy";
describe("GlobalConfig", () => {
  it("should provide config", () => {
    const config: Concrete<GridEngineConfig> = {
      characters: [],
      collisionTilePropertyName: "ge_collides",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
    };
    GlobalConfig.set(config);
    expect(GlobalConfig.get()).toBe(config);
  });
});
