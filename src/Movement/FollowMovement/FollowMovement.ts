import { filter, takeUntil, take } from "rxjs/operators";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Movement, MovementInfo } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import {
  CharLayer,
  Position,
  ShortestPathAlgorithmType,
} from "../../GridEngine";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { Concrete } from "../../Utils/TypeUtils";

export interface Options {
  distance?: number;
  noPathFoundStrategy?: NoPathFoundStrategy;
  maxPathLength?: number;
  shortestPathAlgorithm?: ShortestPathAlgorithmType;
  ignoreLayers?: boolean;
  considerCosts?: boolean;
}

export class FollowMovement implements Movement {
  private targetMovement?: TargetMovement;
  private options: Concrete<Options>;

  constructor(
    private character: GridCharacter,
    private gridTilemap: GridTilemap,
    private charToFollow: GridCharacter,
    options: Options = {}
  ) {
    const defaultOptions: Concrete<Options> = {
      distance: 0,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      maxPathLength: Infinity,
      shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH",
      ignoreLayers: false,
      considerCosts: options.considerCosts || false,
    };
    this.options = { ...defaultOptions, ...options };
    if (
      this.options.considerCosts &&
      this.options.shortestPathAlgorithm !== "A_STAR"
    ) {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm '${this.options.shortestPathAlgorithm}'. It can only be used ` +
          `with A* algorithm.`
      );
    }
    this.character = character;
    this.updateTarget(
      this.charToFollow.getTilePos().position,
      this.charToFollow.getTilePos().layer
    );
    this.charToFollow
      .positionChangeStarted()
      .pipe(
        takeUntil(
          this.character.autoMovementSet().pipe(
            filter((movement) => movement !== this),
            take(1)
          )
        )
      )
      .subscribe(({ enterTile, enterLayer }) => {
        this.updateTarget(enterTile, enterLayer);
      });
  }

  update(delta: number): void {
    this.targetMovement?.update(delta);
  }

  getInfo(): MovementInfo {
    return {
      type: "Follow",
      config: {
        charToFollow: this.charToFollow.getId(),
        distance: this.options.distance,
        noPathFoundStrategy: this.options.noPathFoundStrategy,
        maxPathLength: this.options.maxPathLength,
        ignoreLayers: this.options.ignoreLayers,
      },
    };
  }

  private updateTarget(targetPos: Position, targetLayer: CharLayer): void {
    this.targetMovement = new TargetMovement(
      this.character,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: targetLayer,
      },
      {
        distance: this.options.distance + 1,
        config: {
          algorithm: this.options.shortestPathAlgorithm,
          noPathFoundStrategy: this.options.noPathFoundStrategy,
          maxPathLength: this.options.maxPathLength,
          ignoreLayers: this.options.ignoreLayers,
          considerCosts: this.options.considerCosts,
        },
        ignoreBlockedTarget: true,
      }
    );
  }
}
