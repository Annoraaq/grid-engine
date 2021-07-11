import { GlobalConfig } from "./GlobalConfig";
import { GridEngineConfig } from "../GridEngine";
describe("GlobalConfig", () => {
  it("should provide config", () => {
    const config: GridEngineConfig = {
      characters: [],
    };
    GlobalConfig.set(config);
    expect(GlobalConfig.get()).toBe(config);
  });
});
