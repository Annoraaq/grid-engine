import { CharLayer, LayerPosition } from "../../Position.js";
import { Vector2 } from "../Vector2/Vector2.js";
export interface LayerVecPos {
  position: Vector2;
  layer: CharLayer;
}

export class LayerPositionUtils {
  static equal(position: LayerVecPos, otherPosition: LayerVecPos): boolean {
    return (
      position.position.x === otherPosition.position.x &&
      position.position.y === otherPosition.position.y &&
      position.layer === otherPosition.layer
    );
  }

  static copyOver(source: LayerVecPos, target: LayerVecPos): void {
    target.position.x = source.position.x;
    target.position.y = source.position.y;
    target.layer = source.layer;
  }

  static clone(layerPosition: LayerVecPos): LayerVecPos {
    return {
      position: layerPosition.position.clone(),
      layer: layerPosition.layer,
    };
  }

  static toString(layerPosition: LayerVecPos): string {
    return `${layerPosition.position.toString()}#${layerPosition.layer}`;
  }

  static toInternal(layerPosition: LayerPosition): LayerVecPos {
    return {
      position: new Vector2(layerPosition.position.x, layerPosition.position.y),
      layer: layerPosition.charLayer,
    };
  }

  static fromInternal(layerPosition: LayerVecPos): LayerPosition {
    return {
      position: layerPosition.position.toPosition(),
      charLayer: layerPosition.layer,
    };
  }
}
