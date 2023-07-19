import { BfsSpeed } from "./tests/BfsSpeed";
import { BidirSpeed } from "./tests/BidirSpeed";
import { GridEngineHeadless as GridEngineNew } from "../dist/GridEngine.esm.min.js";
// @ts-ignore
import { GridEngineHeadless as GridEngineOld } from "./old/dist/GridEngine.esm.min.js";
import { RoomsTilemap } from "./RoomsTilemap";
import { GridEngineHeadless } from "../src/GridEngineHeadless";

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

const geTm = new RoomsTilemap("8room_000.map");
const geOld = new GridEngineOld();
const geNew = new GridEngineNew();

geOld.create(geTm, { characters: [], cacheTileCollisions: true });
geNew.create(geTm, { characters: [], cacheTileCollisions: true });

const speedTests: SpeedTest[] = [BfsSpeed, BidirSpeed];

let hasFailed = false;
for (const t of speedTests) {
  const compRes = compare(t);
  if (compRes.failed) {
    console.log(
      `Test "${
        t.name
      }" failed. Difference was larger than tolerance. Speed of master branch: ${
        compRes.resultOld.result
      }. New speed: ${compRes.resultNew.result}. Tolerance: ${
        compRes.resultOld.tolerance * 100
      }%`
    );
    hasFailed = true;
  } else {
    console.log(
      `Test "${
        t.name
      }" succeeded. Difference was not larger than tolerance. Speed of master branch: ${
        compRes.resultOld.result
      }. New speed: ${compRes.resultNew.result}. Tolerance: ${
        compRes.resultOld.tolerance * 100
      }%`
    );
  }
}

if (hasFailed) {
  process.exit(1);
}

function compare(speedTest: SpeedTest): Result {
  const TEST_RUNS = 3;
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
