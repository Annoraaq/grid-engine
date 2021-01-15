import { BodiesFactory } from "matter";
import * as Phaser from "phaser";
import { Bfs } from "./Bfs";
describe("Bfs", () => {
  beforeEach(() => {});

  it("should return the shortest path", () => {
    const startPos = new Phaser.Math.Vector2(3, 3);
    const targetPos = new Phaser.Math.Vector2(4, 4);
    const path = Bfs.getShortestPath(startPos, targetPos);
    expect(path).toEqual([
      new Phaser.Math.Vector2(3, 3),
      new Phaser.Math.Vector2(3, 4),
      new Phaser.Math.Vector2(4, 4),
    ]);
  });
});
