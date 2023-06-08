import { GridEngineHeadless } from "../../src/GridEngineHeadless";

export const BidirSpeed = {
  name: "Bidir Speed",
  run: (gridEngine: GridEngineHeadless) => {
    const startX = 4;
    const startY = 188;
    const endX = 465;
    const endY = 511;

    const start = performance.now();

    gridEngine.findShortestPath(
      {
        position: { x: startX, y: startY },
        charLayer: undefined,
      },
      {
        position: { x: endX, y: endY },
        charLayer: undefined,
      },
      {
        shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH",
      }
    );

    const end = performance.now();

    const timeMs = end - start;

    return {
      result: timeMs,
      tolerance: 0.1,
    };
  },
};
