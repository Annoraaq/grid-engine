import { Direction } from "../../Direction/Direction.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { VectorUtils } from "../VectorUtils.js";
import { DistanceUtils4 } from "./DistanceUtils4.js";

jest.mock("../VectorUtils");
describe("DistanceUtils4", () => {
  describe("distance", () => {
    it("should return the correct distance", () => {
      const distanceUtils4 = new DistanceUtils4();
      VectorUtils.manhattanDistance = jest.fn(() => 2);
      VectorUtils.chebyshevDistance = jest.fn(() => 3);
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(3, -1);
      expect(distanceUtils4.distance(vector, vector2)).toEqual(2);
    });
  });

  describe("neighbors", () => {
    it("should return the correct neighbors", () => {
      const distanceUtils4 = new DistanceUtils4();
      const vector = new Vector2(3, -1);
      expect(distanceUtils4.neighbors(vector)).toEqual([
        new Vector2(3, 0),
        new Vector2(4, -1),
        new Vector2(2, -1),
        new Vector2(3, -2),
      ]);
    });
  });

  describe("direction", () => {
    it("should return the correct direction", () => {
      const distanceUtils4 = new DistanceUtils4();
      const vector = new Vector2(3, -1);

      // neighbors
      expect(distanceUtils4.direction(vector, new Vector2(2, -1))).toEqual(
        Direction.LEFT,
      );
      expect(distanceUtils4.direction(vector, new Vector2(4, -1))).toEqual(
        Direction.RIGHT,
      );
      expect(distanceUtils4.direction(vector, new Vector2(3, -2))).toEqual(
        Direction.UP,
      );
      expect(distanceUtils4.direction(vector, new Vector2(3, 0))).toEqual(
        Direction.DOWN,
      );

      // diagonal neighbors
      expect(distanceUtils4.direction(vector, new Vector2(2, 0))).toEqual(
        Direction.DOWN,
      );
      expect(distanceUtils4.direction(vector, new Vector2(4, 0))).toEqual(
        Direction.DOWN,
      );
      expect(distanceUtils4.direction(vector, new Vector2(2, -2))).toEqual(
        Direction.UP,
      );
      expect(distanceUtils4.direction(vector, new Vector2(4, -2))).toEqual(
        Direction.UP,
      );

      // asymetric distance
      expect(distanceUtils4.direction(vector, new Vector2(10, 5))).toEqual(
        Direction.RIGHT,
      );
      expect(distanceUtils4.direction(vector, new Vector2(-10, -5))).toEqual(
        Direction.LEFT,
      );
      expect(distanceUtils4.direction(vector, new Vector2(-1, -10))).toEqual(
        Direction.UP,
      );
      expect(distanceUtils4.direction(vector, new Vector2(-1, 10))).toEqual(
        Direction.DOWN,
      );
    });
  });

  describe("getDirections", () => {
    it("should return the correct directions", () => {
      const distanceUtils4 = new DistanceUtils4();
      expect(distanceUtils4.getDirections()).toEqual([
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN,
        Direction.LEFT,
      ]);
    });
  });
});
