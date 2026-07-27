import { BfsSpeed } from "./tests/BfsSpeed.js";
import { BidirSpeed } from "./tests/BidirSpeed.js";
import { AStarSpeed } from "./tests/AStarSpeed.js";
import { Jps4Speed } from "./tests/Jps4Speed.js";
import { Jps8Speed } from "./tests/Jps8Speed.js";
// @ts-ignore
import { GridEngineHeadless as GridEngineNew } from "../dist/GridEngine.esm.min.js";
// @ts-ignore
import { GridEngineHeadless as GridEngineOld } from "./old/dist/GridEngine.esm.min.js";
import { RoomsTilemap } from "./RoomsTilemap.js";
import { GridEngineHeadless } from "../src/GridEngineHeadless.js";
import path from "path";

export interface SpeedTestResult {
  result: number;
  tolerance: number;
}

export interface SpeedTest {
  name: string;
  run: (gridEngine: GridEngineHeadless) => SpeedTestResult;
}

interface Result {
  failed: boolean;
  resultOld: SpeedTestResult;
  resultNew: SpeedTestResult;
}

const mapPath = path.join(process.cwd(), "speedtests", "8room_000.map");
const geTm = new RoomsTilemap(mapPath);
const geOld = new GridEngineOld();
const geNew = new GridEngineNew();

geOld.create(geTm, { characters: [], cacheTileCollisions: true });
geNew.create(geTm, { characters: [], cacheTileCollisions: true });

const speedTests: SpeedTest[] = [
  AStarSpeed,
  Jps4Speed,
  Jps8Speed,
  BfsSpeed,
  BidirSpeed,
];

let hasFailed = false;
for (const t of speedTests) {
  const compRes = compare(t);
  const oldTime = compRes.resultOld.result.toFixed(2);
  const newTime = compRes.resultNew.result.toFixed(2);
  const speedup = (
    ((compRes.resultOld.result - compRes.resultNew.result) /
      compRes.resultOld.result) *
    100
  ).toFixed(1);

  if (compRes.failed) {
    console.log(
      `Test "${t.name}" SLOWER. Old: ${oldTime}ms, New: ${newTime}ms (${speedup}% change)`,
    );
    hasFailed = true;
  } else {
    console.log(
      `Test "${t.name}" PASSED. Old: ${oldTime}ms, New: ${newTime}ms (${speedup}% faster)`,
    );
  }
}

if (hasFailed) {
  process.exit(1);
}

function compare(speedTest: SpeedTest): Result {
  const TEST_RUNS = 5;
  let oldResSum = 0;
  let newResSum = 0;
  let allTolerance = 0;
  for (let i = 0; i < TEST_RUNS; i++) {
    const { result: oldRes, tolerance } = speedTest.run(geOld);
    const { result: newRes } = speedTest.run(geNew);
    oldResSum += oldRes;
    newResSum += newRes;
    allTolerance = tolerance;
  }
  const oldResAvg = oldResSum / TEST_RUNS;
  const newResAvg = newResSum / TEST_RUNS;

  const absTolerance = oldResAvg * allTolerance;
  if (oldResAvg < newResAvg && newResAvg - oldResAvg > absTolerance) {
    return {
      failed: true,
      resultOld: {
        result: oldResAvg,
        tolerance: allTolerance,
      },
      resultNew: {
        result: newResAvg,
        tolerance: allTolerance,
      },
    };
  }

  return {
    failed: false,
    resultOld: {
      result: oldResAvg,
      tolerance: allTolerance,
    },
    resultNew: {
      result: newResAvg,
      tolerance: allTolerance,
    },
  };
}
