import { Utils } from "./Utils.js";

describe("Utils", () => {
  describe("shiftPad", () => {
    it("should pad a number with 0s", () => {
      expect(Utils.shiftPad(123.45, 5)).toEqual(0.00123);
    });
  });
});
