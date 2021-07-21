import { GridEngineConfig } from "../GridEngine";
import { Concrete } from "../Utils/TypeUtils";
export declare class GlobalConfig {
    private static config;
    static get(): Concrete<GridEngineConfig>;
    static set(config: Concrete<GridEngineConfig>): void;
}
