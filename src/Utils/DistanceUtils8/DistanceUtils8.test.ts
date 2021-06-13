import { DistanceUtils8 } from "./DistanceUtils8";
import { Vector2 } from "../Vector2/Vector2";
import { VectorUtils } from "../VectorUtils";

jest.mock("../VectorUtils");
describe("DistanceUtils8", () => {
  describe("distance", () => {
    it("should return the correct distance", () => {
      const distanceUtils8 = new DistanceUtils8();
      VectorUtils.manhattanDistance = jest.fn(() => 2);
      VectorUtils.chebyshevDistance = jest.fn(() => 3);
      const vector = new Vector2(3, -1);
      const vector2 = new Vector2(3, -1);
      expect(distanceUtils8.distance(vector, vector2)).toEqual(3);
    });
  });
});
