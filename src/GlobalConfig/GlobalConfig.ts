import { GridEngineConfig } from "../GridEngine";
import { Concrete } from "../Utils/TypeUtils";
export class GlobalConfig {
  private static config: Concrete<GridEngineConfig>;

  static get(): Concrete<GridEngineConfig> {
    return GlobalConfig.config;
  }

  static set(config: Concrete<GridEngineConfig>): void {
    GlobalConfig.config = config;
  }
}
