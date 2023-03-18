import { createAllowedFn } from "../../Utils/MockFactory/MockFactory";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { LayerVecPos } from "../ShortestPathAlgorithm";
import { Bfs } from "./Bfs";

describe("Bfs", () => {
  let bfs: Bfs;

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
    bfs = new Bfs();
  });

  it("should return one simple shortest path", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(4, 4), layer: "layer1" };

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
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
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
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
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      getNeighbors
    );
    expect(path).toEqual([{ position: new Vector2(3, 3), layer: "layer1" }]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should not find a path if every direction is blocked", () => {
    const startPos = { position: new Vector2(3, 3), layer: "layer1" };
    const targetPos = { position: new Vector2(5, 10), layer: "layer1" };
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      () => []
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

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
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

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(3, 1),
      layer: "layer1",
    });
  });

  it("should terminate on infinite maps", () => {
    bfs.setMaxPathLength(10);
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

    const { path, closestToTarget, maxPathLengthReached } = bfs.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(maxPathLengthReached).toBe(true);
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 0),
      layer: "layer1",
    });
  });

  it("should not exceed maxPathLength", () => {
    bfs.setMaxPathLength(3);
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

    const { path, closestToTarget, maxPathLengthReached } = bfs.getShortestPath(
      startPos,
      targetPos,
      (pos) => getNeighbors(pos).filter((n) => isBlocked(n.position, n.layer))
    );

    expect(maxPathLengthReached).toBe(true);
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual({
      position: new Vector2(1, 3),
      layer: "layer1",
    });
  });

  it("should not stop before exceeding maxPathLength", () => {
    bfs.setMaxPathLength(3);
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

    const { path, closestToTarget, maxPathLengthReached } = bfs.getShortestPath(
      startPos,
      targetPos,
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
