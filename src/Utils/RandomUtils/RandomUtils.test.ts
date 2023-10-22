/*eslint no-global-assign: "off"*/
import { RandomUtils } from "./RandomUtils.js";

describe("RandomUtils", () => {
  function mockRandom(val: number) {
    const mockMath = Object.create(Math);
    mockMath.random = () => val;
    Math = mockMath;
  }

  it("should generate a random integer", () => {
    const randomMock = 0.75;
    const max = 10.9;
    mockRandom(randomMock);

    expect(RandomUtils.getRandomInt(max)).toEqual(
      Math.floor(randomMock * Math.floor(max)),
    );
  });
});
