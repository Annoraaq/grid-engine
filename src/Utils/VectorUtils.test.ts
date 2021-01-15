import * as Phaser from "phaser";
import { VectorUtils } from "./VectorUtils";
describe("VectorUtils", () => {
  beforeEach(() => {});

  describe("vec2str", () => {
    it("should transform a vector into a string", () => {
      const vector = new Phaser.Math.Vector2(3, -1);
      expect(VectorUtils.vec2str(vector)).toEqual("3#-1");
    });
  });
});
