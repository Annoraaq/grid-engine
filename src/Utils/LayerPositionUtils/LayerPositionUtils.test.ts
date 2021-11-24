import { Vector2 } from "../Vector2/Vector2";
import { LayerPositionUtils } from "./LayerPositionUtils";

describe("LayerPositionUtils", () => {
  it("should copy over", () => {
    const source = { position: new Vector2(5, 6), layer: "sourceLayer" };
    const target = { position: new Vector2(0, 0), layer: "targetLayer" };
    LayerPositionUtils.copyOver(source, target);
    expect(target).toEqual(source);
    expect(target).not.toBe(source);
  });

  it("should clone", () => {
    const pos = { position: new Vector2(5, 6), layer: "sourceLayer" };
    const clone = LayerPositionUtils.clone(pos);
    expect(clone).toEqual(pos);
    expect(clone).not.toBe(pos);
  });
});
