import * as Phaser from "phaser";
import { VectorUtils } from "../../../Utils/VectorUtils";
import { Bfs } from "./Bfs";

const Vector2 = Phaser.Math.Vector2;

describe("Bfs", () => {
  let bfs: Bfs;

  const getNeighbours = (pos) => [
    new Vector2(pos.x, pos.y + 1),
    new Vector2(pos.x + 1, pos.y),
    new Vector2(pos.x - 1, pos.y),
    new Vector2(pos.x, pos.y - 1),
  ];

  beforeEach(() => {
    bfs = new Bfs();
  });

  it("should return one simple shortest path", () => {
    const startPos = new Vector2(3, 3);
    const targetPos = new Vector2(4, 4);

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      getNeighbours
    );
    expect(path).toEqual([
      new Vector2(3, 3),
      new Vector2(3, 4),
      new Vector2(4, 4),
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return one medium shortest path", () => {
    const startPos = new Phaser.Math.Vector2(3, 3);
    const targetPos = new Phaser.Math.Vector2(5, -1);
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      getNeighbours
    );
    expect(path).toEqual([
      new Vector2(3, 3),
      new Vector2(4, 3),
      new Vector2(5, 3),
      new Vector2(5, 2),
      new Vector2(5, 1),
      new Vector2(5, 0),
      new Vector2(5, -1),
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return path of 1", () => {
    const startPos = new Vector2(3, 3);
    const targetPos = new Vector2(3, 3);
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      getNeighbours
    );
    expect(path).toEqual([new Vector2(3, 3)]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should not find a path if every direction is blocked", () => {
    const startPos = new Vector2(3, 3);
    const targetPos = new Vector2(5, 10);
    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      () => []
    );
    expect(path).toEqual([]);
    expect(closestToTarget).toEqual(startPos);
  });

  it("should consider blocked tiles", () => {
    // s = start
    // t = target
    // # = blocked
    // . = free

    // #####
    // #s..#
    // ###.#
    // #t..#
    // #####

    const startPos = new Vector2(1, 1);
    const targetPos = new Vector2(1, 3);
    const unblockedTiles = [
      VectorUtils.vec2str(new Vector2(1, 1)),
      VectorUtils.vec2str(new Vector2(2, 1)),
      VectorUtils.vec2str(new Vector2(3, 1)),
      VectorUtils.vec2str(new Vector2(3, 2)),
      VectorUtils.vec2str(new Vector2(3, 3)),
      VectorUtils.vec2str(new Vector2(2, 3)),
      VectorUtils.vec2str(new Vector2(1, 3)),
    ];

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      (pos) =>
        getNeighbours(pos).filter((n) =>
          unblockedTiles.includes(VectorUtils.vec2str(n))
        )
    );

    expect(path).toEqual([
      new Vector2(1, 1),
      new Vector2(2, 1),
      new Vector2(3, 1),
      new Vector2(3, 2),
      new Vector2(3, 3),
      new Vector2(2, 3),
      new Vector2(1, 3),
    ]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should return closest point if path is blocked", () => {
    // s = start
    // t = target
    // # = blocked
    // . = free

    // #####
    // #s..#
    // #####
    // #..t#
    // #####

    const startPos = new Vector2(1, 1);
    const targetPos = new Vector2(3, 3);
    const unblockedTiles = [
      VectorUtils.vec2str(new Vector2(1, 1)),
      VectorUtils.vec2str(new Vector2(2, 1)),
      VectorUtils.vec2str(new Vector2(3, 1)),
      VectorUtils.vec2str(new Vector2(3, 3)),
      VectorUtils.vec2str(new Vector2(2, 3)),
      VectorUtils.vec2str(new Vector2(1, 3)),
    ];

    const { path, closestToTarget } = bfs.getShortestPath(
      startPos,
      targetPos,
      (pos) =>
        getNeighbours(pos).filter((n) =>
          unblockedTiles.includes(VectorUtils.vec2str(n))
        )
    );

    expect(path).toEqual([]);
    expect(closestToTarget).toEqual(new Vector2(3, 1));
  });
});
