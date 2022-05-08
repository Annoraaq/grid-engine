import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
export class LayerPositionUtils {
  static equal(position: LayerPosition, otherPosition: LayerPosition): boolean {
    return (
      position.position.x === otherPosition.position.x &&
      position.position.y === otherPosition.position.y &&
      position.layer === otherPosition.layer
    );
  }

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

  static toString(layerPosition: LayerPosition): string {
    return `${layerPosition.position.toString()}#${layerPosition.layer}`;
  }
}
