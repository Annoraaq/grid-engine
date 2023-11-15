import { filter, takeUntil, take } from "rxjs/operators";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { TargetMovement } from "../TargetMovement/TargetMovement.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import {
  CharLayer,
  Direction,
  Position,
  ShortestPathAlgorithmType,
} from "../../GridEngine.js";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy.js";
import { Concrete } from "../../Utils/TypeUtils.js";

export interface Options {
  distance?: number;
  noPathFoundStrategy?: NoPathFoundStrategy;
  maxPathLength?: number;
  shortestPathAlgorithm?: ShortestPathAlgorithmType;
  ignoreLayers?: boolean;
  considerCosts?: boolean;
  facingDirection?: Direction;
}

export class FollowMovement implements Movement {
  private targetMovement?: TargetMovement;
  private options: Concrete<Options>;

  constructor(
    private character: GridCharacter,
    private gridTilemap: GridTilemap,
    private charToFollow: GridCharacter,
    options: Options = {},
  ) {
    const defaultOptions: Concrete<Options> = {
      distance: 0,
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
      maxPathLength: Infinity,
      shortestPathAlgorithm: "BIDIRECTIONAL_SEARCH",
      ignoreLayers: false,
      considerCosts: options.considerCosts || false,
      facingDirection: Direction.NONE,
    };
    this.options = { ...defaultOptions, ...options };
    if (
      this.options.considerCosts &&
      this.options.shortestPathAlgorithm !== "A_STAR"
    ) {
      console.warn(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm '${this.options.shortestPathAlgorithm}'. It can only be used ` +
          `with A* algorithm.`,
      );
    }
    this.character = character;

    this.updateTarget(
      this.charToFollow.getTilePos().position,
      this.charToFollow.getTilePos().layer,
    );
    this.charToFollow
      .positionChangeStarted()
      .pipe(
        takeUntil(
          this.character.autoMovementSet().pipe(
            filter((movement) => movement !== this),
            take(1),
          ),
        ),
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
        facingDirection: this.options.facingDirection,
        shortestPathAlgorithm: this.options.shortestPathAlgorithm,
      },
    };
  }

  private updateTarget(targetPos: Position, targetLayer: CharLayer): void {
    // if (
    //   this.options.facingDirection !== Direction.NONE &&
    //   this.options.distance === 0
    // ) {
    //   targetPos = this.gridTilemap.getTilePosInDirection(
    //     { position: new Vector2(targetPos), layer: targetLayer },

    //     this.charToFollow.getFacingDirection(),
    //   ).position;
    // }
    //
    // Direction mapping:
    // naive approach: turn the facing direction of char as long as it points
    // up. Store the number of turns and turn the facing direction the same
    // amount of time in the other direction.
    //
    // optimized: precalculate the "distance" of a turn clockwise and
    // counterclockwise in 2 maps and then do a lookup. We do that in Jps4 already
    //
    this.targetMovement = new TargetMovement(
      this.character,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: targetLayer,
      },
      {
        distance: this.options.distance + 1,
        // distance:
        //   this.options.facingDirection !== Direction.NONE
        //     ? 0
        //     : this.options.distance + 1,
        config: {
          algorithm: this.options.shortestPathAlgorithm,
          noPathFoundStrategy: this.options.noPathFoundStrategy,
          maxPathLength: this.options.maxPathLength,
          ignoreLayers: this.options.ignoreLayers,
          considerCosts: this.options.considerCosts,
        },
        ignoreBlockedTarget: true,
      },
    );
  }
}
