import { Direction } from "./../../Direction/Direction.js";
import { DistanceUtils8 } from "./DistanceUtils8.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { VectorUtils } from "../VectorUtils.js";

jest.mock("../VectorUtils");
describe("DistanceUtils8", () => {
  describe("distance", () => {
    it("should return the correct distance", () => {
      const distanceUtils8 = new DistanceUtils8();
      VectorUtils.chebyshevDistance = jest.fn(() => 3);
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(3, -1);
      expect(distanceUtils8.distance(vector, vector2)).toEqual(3);
    });
  });

  describe("neighbors", () => {
    it("should return the correct neighbors", () => {
      const distanceUtils8 = new DistanceUtils8();
      const vector = new Vector2(3, -1);
      expect(distanceUtils8.neighbors(vector)).toEqual([
        new Vector2(3, 0),
        new Vector2(4, -1),
        new Vector2(2, -1),
        new Vector2(3, -2),
        new Vector2(4, 0),
        new Vector2(4, -2),
        new Vector2(2, 0),
        new Vector2(2, -2),
      ]);
    });
  });

  describe("direction", () => {
    it("should return the correct direction", () => {
      const distanceUtils8 = new DistanceUtils8();
      const vector = new Vector2(3, -1);
      expect(distanceUtils8.direction(vector, new Vector2(2, -1))).toEqual(
        Direction.LEFT,
      );
      expect(distanceUtils8.direction(vector, new Vector2(4, -1))).toEqual(
        Direction.RIGHT,
      );
      expect(distanceUtils8.direction(vector, new Vector2(3, -2))).toEqual(
        Direction.UP,
      );
      expect(distanceUtils8.direction(vector, new Vector2(3, 0))).toEqual(
        Direction.DOWN,
      );
      expect(distanceUtils8.direction(vector, new Vector2(2, 0))).toEqual(
        Direction.DOWN_LEFT,
      );
      expect(distanceUtils8.direction(vector, new Vector2(4, 0))).toEqual(
        Direction.DOWN_RIGHT,
      );
      expect(distanceUtils8.direction(vector, new Vector2(2, -2))).toEqual(
        Direction.UP_LEFT,
      );
      expect(distanceUtils8.direction(vector, new Vector2(4, -2))).toEqual(
        Direction.UP_RIGHT,
      );
    });
  });

  describe("getDirections", () => {
    it("should return the correct directions", () => {
      const distanceUtils8 = new DistanceUtils8();
      expect(distanceUtils8.getDirections()).toEqual([
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN,
        Direction.LEFT,
        Direction.DOWN_LEFT,
        Direction.DOWN_RIGHT,
        Direction.UP_RIGHT,
        Direction.UP_LEFT,
      ]);
    });
  });
});
