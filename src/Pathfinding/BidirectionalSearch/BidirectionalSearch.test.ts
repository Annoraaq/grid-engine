import { createAllowedFn } from "../../Utils/MockFactory/MockFactory";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { VectorUtils } from "../../Utils/VectorUtils";
import { LayerVecPos } from "../ShortestPathAlgorithm";
import { BidirectionalSearch } from "./BidirectionalSearch";

describe("BidirectionalSearch", () => {
  let bidirectionalSearch: BidirectionalSearch;

  const getNeighbors = (pos: LayerVecPos) => [
    {
      position: new Vector2(pos.position.x, pos.position.y + 1),
      layer: pos.layer,
    },
    {
      position: new Vector2(pos.position.x + 1, pos.position.y),
      layer: pos.layer,
    },
    {
      position: new Vector2(pos.position.x - 1, pos.position.y),
      layer: pos.layer,
    },
    {
      position: new Vector2(pos.position.x, pos.position.y - 1),
      layer: pos.layer,
    },
  ];

  beforeEach(() => {
    bidirectionalSearch = new BidirectionalSearch();
  });

  it("should return one simple shortest path", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(4, 4), layer: "layer1" };

    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      getNeighbors,
      VectorUtils.manhattanDistance,
      getNeighbors
    );
    expect(path).toEqual([
      { position: new Vector2(3, 3), layer: "layer1" },
      { position: new Vector2(3, 4), layer: "layer1" },
      { position: new Vector2(4, 4), layer: "layer1" },
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return one medium shortest path", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(5, -1), layer: "layer1" };
    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      getNeighbors,
      VectorUtils.manhattanDistance,
      getNeighbors
    );
    expect(path).toEqual([
      { position: new Vector2(3, 3), layer: "layer1" },
      { position: new Vector2(4, 3), layer: "layer1" },
      { position: new Vector2(5, 3), layer: "layer1" },
      { position: new Vector2(5, 2), layer: "layer1" },
      { position: new Vector2(5, 1), layer: "layer1" },
      { position: new Vector2(5, 0), layer: "layer1" },
      { position: new Vector2(5, -1), layer: "layer1" },
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return path of 1", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(3, 3), layer: "layer1" };
    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      getNeighbors,
      VectorUtils.manhattanDistance,
      getNeighbors
    );
    expect(path).toEqual([{ position: new Vector2(3, 3), layer: "layer1" }]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should not find a path if every direction is blocked", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(5, 10), layer: "layer1" };
    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      () => [],
      VectorUtils.manhattanDistance,
      () => []
    );
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual(startPos);
  });

  it("should not find a path if target is blocked", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(3, 4), layer: "layer1" };
    const isTargetPos = (pos) =>
      pos.position.x == targetPos.position.x &&
      pos.position.y == targetPos.position.y;
    const isInRange = (pos) =>
      !(
        pos.position.x < 0 ||
        pos.position.y < 0 ||
        pos.position.x > 5 ||
        pos.position.y > 5
      );
    const getNeighborsModified = (pos: LayerVecPos) => {
      const positions = getNeighbors(pos);

      const filtered = positions.filter(
        (pos: LayerVecPos) => !isTargetPos(pos) && isInRange(pos)
      );
      return filtered;
    };

    const getReverseNeighborsModified = (pos: LayerVecPos) => {
      if (isTargetPos(pos) || !isInRange(pos)) {
        return [];
      }
      return getNeighbors(pos);
    };
    bidirectionalSearch = new BidirectionalSearch();
    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      getNeighborsModified,
      VectorUtils.manhattanDistance,
      getReverseNeighborsModified
    );
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual(startPos);
  });

  it("should consider blocked tiles", () => {
    const isBlocked = createAllowedFn([
      "#####",
      "#s..#",
      "###.#",
      "#t..#",
      "#####",
    ]);

    const startPos = { position: new Vector2(1, 1), layer: "layer1" };
    const targetPos = { position: new Vector2(1, 3), layer: "layer1" };

    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
      VectorUtils.manhattanDistance,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(path).toEqual([
      { position: new Vector2(1, 1), layer: "layer1" },
      { position: new Vector2(2, 1), layer: "layer1" },
      { position: new Vector2(3, 1), layer: "layer1" },
      { position: new Vector2(3, 2), layer: "layer1" },
      { position: new Vector2(3, 3), layer: "layer1" },
      { position: new Vector2(2, 3), layer: "layer1" },
      { position: new Vector2(1, 3), layer: "layer1" },
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return closest point if path is blocked", () => {
    const isBlocked = createAllowedFn([
      "#####",
      "#s..#",
      "#####",
      "#..t#",
      "#####",
    ]);

    const startPos = { position: new Vector2(1, 1), layer: "layer1" };
    const targetPos = { position: new Vector2(3, 3), layer: "layer1" };

    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
      VectorUtils.manhattanDistance,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(3, 1),
      layer: "layer1",
    });
  });

  it("should return closest point dependent on distance metric", () => {
    const isBlocked = createAllowedFn([
      "#####",
      "#s..#",
      "#####",
      "#..t#",
      "#####",
    ]);

    const startPos = { position: new Vector2(1, 1), layer: "layer1" };
    const targetPos = { position: new Vector2(3, 3), layer: "layer1" };

    const { path, closestToTarget } = bidirectionalSearch.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
      VectorUtils.chebyshevDistance,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 1),
      layer: "layer1",
    });
  });

  it("should terminate on infinite maps", () => {
    bidirectionalSearch.setMaxPathLength(10);
    const isBlocked = createAllowedFn(
      [
        // prettier-ignore
        ".s...",
        "#####",
        "#t..#",
        "#####",
      ],
      true
    );
    const startPos = { position: new Vector2(1, 0), layer: "layer1" };
    const targetPos = { position: new Vector2(1, 2), layer: "layer1" };

    const { path, closestToTarget, maxPathLengthReached } =
      bidirectionalSearch.getShortestPath(
        startPos,
        targetPos,
        (pos) =>
          getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
        VectorUtils.manhattanDistance,
        (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
      );

    // Bidirectional search will detect unreachable target nodes
    expect(maxPathLengthReached).toBe(true);
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 0),
      layer: "layer1",
    });
  });

  it("should not exceed maxPathLength", () => {
    bidirectionalSearch.setMaxPathLength(3);
    const isBlocked = createAllowedFn(
      [
        // prettier-ignore
        ".s...",
        ".....",
        ".....",
        ".....",
        ".t...",
      ],
      true
    );
    const startPos = { position: new Vector2(1, 0), layer: "layer1" };
    const targetPos = { position: new Vector2(1, 4), layer: "layer1" };

    const { path, closestToTarget, maxPathLengthReached } =
      bidirectionalSearch.getShortestPath(
        startPos,
        targetPos,
        (pos) =>
          getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
        VectorUtils.manhattanDistance,
        (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
      );

    expect(maxPathLengthReached).toBe(true);
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 1),
      layer: "layer1",
    });
  });

  it("should not stop before exceeding maxPathLength", () => {
    bidirectionalSearch.setMaxPathLength(3);
    const isBlocked = createAllowedFn(
      [
        // prettier-ignore
        ".s...",
        ".....",
        ".t...",
      ],
      true
    );
    const startPos = { position: new Vector2(1, 0), layer: "layer1" };
    const targetPos = { position: new Vector2(1, 2), layer: "layer1" };

    const { path, closestToTarget, maxPathLengthReached } =
      bidirectionalSearch.getShortestPath(
        startPos,
        targetPos,
        (pos) =>
          getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer)),
        VectorUtils.manhattanDistance,
        (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
      );

    expect(maxPathLengthReached).toBe(false);
    expect(path.length).toEqual(3);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 2),
      layer: "layer1",
    });
  });
});
