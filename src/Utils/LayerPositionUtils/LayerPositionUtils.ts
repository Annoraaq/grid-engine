import { LayerVecPos } from "./../../Pathfinding/ShortestPathAlgorithm";
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
}
