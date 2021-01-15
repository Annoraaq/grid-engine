import { BodiesFactory } from "matter";
import * as Phaser from "phaser";
import { Bfs } from "./Bfs";
describe("Bfs", () => {
  beforeEach(() => {});

  it("should return one simple shortest path", () => {
    const startPos = new Phaser.Math.Vector2(3, 3);
    const targetPos = new Phaser.Math.Vector2(4, 4);
    const path = Bfs.getShortestPath(startPos, targetPos);
    expect(path).toEqual([
      new Phaser.Math.Vector2(3, 3),
      new Phaser.Math.Vector2(3, 4),
      new Phaser.Math.Vector2(4, 4),
    ]);
  });

  it("should return one medium shortest path", () => {
    const startPos = new Phaser.Math.Vector2(3, 3);
    const targetPos = new Phaser.Math.Vector2(5, -1);
    const path = Bfs.getShortestPath(startPos, targetPos);
    expect(path).toEqual([
      new Phaser.Math.Vector2(3, 3),
      new Phaser.Math.Vector2(4, 3),
      new Phaser.Math.Vector2(5, 3),
      new Phaser.Math.Vector2(5, 2),
      new Phaser.Math.Vector2(5, 1),
      new Phaser.Math.Vector2(5, 0),
      new Phaser.Math.Vector2(5, -1),
    ]);
  });
});
