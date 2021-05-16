import { NumberOfDirections } from "./../Direction/Direction";
import { DistanceUtils } from "./DistanceUtils";
import { Vector2 } from "./Vector2/Vector2";
import { VectorUtils } from "./VectorUtils";

jest.mock("./VectorUtils");
describe("DistanceUtils", () => {
  describe("distance", () => {
    it("should return the correct distance", () => {
      VectorUtils.manhattanDistance = jest.fn(() => 2);
      VectorUtils.chebyshevDistance = jest.fn(() => 3);
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(3, -1);
      expect(
        DistanceUtils.distance(vector, vector2, NumberOfDirections.FOUR)
      ).toEqual(2);
      expect(
        DistanceUtils.distance(vector, vector2, NumberOfDirections.EIGHT)
      ).toEqual(3);
    });
  });
});
