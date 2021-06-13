import { Vector2 } from "../Vector2/Vector2";
import { VectorUtils } from "../VectorUtils";
import { DistanceUtils4 } from "./DistanceUtils4";

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
});
