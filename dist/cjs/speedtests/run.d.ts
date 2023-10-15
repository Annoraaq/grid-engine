import { GridEngineHeadless } from "../src/GridEngineHeadless";
export interface SpeedTestResult {
    result: number;
    tolerance: number;
}
export interface SpeedTest {
    name: string;
    run: (gridEngine: GridEngineHeadless) => SpeedTestResult;
}
