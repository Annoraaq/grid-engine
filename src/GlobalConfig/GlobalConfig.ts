import { GridEngineConfig } from "./../../dist/GridEngine.d";
export class GlobalConfig {
  private static config: GridEngineConfig;

  static get(): GridEngineConfig {
    return GlobalConfig.config;
  }

  static set(config: GridEngineConfig): void {
    GlobalConfig.config = config;
  }
}
