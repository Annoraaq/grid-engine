import { Vector } from "matter";
import * as Phaser from "phaser";
import { VectorUtils } from "../../../Utils/VectorUtils";
import { Bfs } from "./Bfs";

const Vector2 = Phaser.Math.Vector2;

describe("Bfs", () => {
  beforeEach(() => {});

  it("should return one simple shortest path", () => {
    const startPos = new Vector2(3, 3);
    const targetPos = new Vector2(4, 4);
    const isBlocked = () => false;
    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
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
    const isBlocked = () => false;
    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
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
    const isBlocked = () => false;
    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
    );
    expect(path).toEqual([new Vector2(3, 3)]);
    expect(closestToTarget).toEqual(targetPos);
  });

  it("should not find a path if every direction is blocked", () => {
    const startPos = new Vector2(3, 3);
    const targetPos = new Vector2(5, 10);
    const isBlocked = () => true;
    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
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

    const isBlocked = (pos) => {
      return !unblockedTiles.includes(VectorUtils.vec2str(pos));
    };

    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
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

    const isBlocked = (pos) => {
      return !unblockedTiles.includes(VectorUtils.vec2str(pos));
    };

    const { path, closestToTarget } = Bfs.getShortestPath(
      startPos,
      targetPos,
      isBlocked
    );

    expect(path).toEqual([]);
    expect(closestToTarget).toEqual(new Vector2(3, 1));
  });
});
