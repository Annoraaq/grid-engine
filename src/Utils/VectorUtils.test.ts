import { Vector2 } from "./Vector2/Vector2.js";
import { VectorUtils } from "./VectorUtils.js";

describe("VectorUtils", () => {
  describe("vec2str", () => {
    it("should transform a vector into a string", () => {
      const vector = new Vector2(3, -1);
      expect(VectorUtils.vec2str(vector)).toEqual("3#-1");
    });
  });

  describe("equal", () => {
    it("should detect equal vectors", () => {
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(3, -1);
      expect(VectorUtils.equal(vector, vector2)).toBe(true);
      expect(VectorUtils.equal(vector2, vector)).toBe(true);
    });

    it("should detect unequal vectors", () => {
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(2, 1);
      expect(VectorUtils.equal(vector, vector2)).toBe(false);
      expect(VectorUtils.equal(vector2, vector)).toBe(false);
    });
  });

  describe("manhattanDistance", () => {
    it("should correctly calc positive numbers", () => {
      const vector = new Vector2(5, 6);
      const vector2 = new Vector2(2, 3);
      expect(VectorUtils.manhattanDistance(vector, vector2)).toEqual(6);
    });

    it("should correctly calc negative numbers", () => {
      const vector = new Vector2(-5, -6);
      const vector2 = new Vector2(-2, -3);
      expect(VectorUtils.manhattanDistance(vector, vector2)).toEqual(6);
    });

    it("should correctly calc zero distance", () => {
      const vector = new Vector2(2, 3);
      const vector2 = new Vector2(2, 3);
      expect(VectorUtils.manhattanDistance(vector, vector2)).toEqual(0);
    });
  });

  describe("chebyshevDistance", () => {
    it("should correctly calc positive numbers", () => {
      const vector = new Vector2(5, 7);
      const vector2 = new Vector2(2, 3);
      expect(VectorUtils.chebyshevDistance(vector, vector2)).toEqual(4);
    });

    it("should correctly calc negative numbers", () => {
      const vector = new Vector2(-5, -7);
      const vector2 = new Vector2(-2, -3);
      expect(VectorUtils.chebyshevDistance(vector, vector2)).toEqual(4);
    });

    it("should correctly calc zero distance", () => {
      const vector = new Vector2(2, 3);
      const vector2 = new Vector2(2, 3);
      expect(VectorUtils.chebyshevDistance(vector, vector2)).toEqual(0);
    });
  });

  describe("scalarMult", () => {
    it("should multiply immutably", () => {
      const vector = new Vector2(5, 6);
      expect(VectorUtils.scalarMult(vector, 1)).toEqual(new Vector2(5, 6));
      expect(VectorUtils.scalarMult(vector, 2)).toEqual(new Vector2(10, 12));
      expect(VectorUtils.scalarMult(vector, 0)).toEqual(new Vector2(0, 0));
      expect(VectorUtils.scalarMult(vector, -1)).toEqual(new Vector2(-5, -6));
      expect(vector).toEqual(new Vector2(5, 6));
    });
  });
});
