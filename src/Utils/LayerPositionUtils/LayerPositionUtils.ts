import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
export class LayerPositionUtils {
  static copyOver(source: LayerPosition, target: LayerPosition): void {
    target.position.x = source.position.x;
    target.position.y = source.position.y;
    target.layer = source.layer;
  }

  static clone(layerPosition: LayerPosition): LayerPosition {
    return {
      position: layerPosition.position.clone(),
      layer: layerPosition.layer,
    };
  }
}
