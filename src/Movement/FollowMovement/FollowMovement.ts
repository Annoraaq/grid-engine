import { filter, takeUntil, take } from "rxjs/operators";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { TargetMovement } from "../TargetMovement/TargetMovement.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import {
  CharLayer,
  Direction,
  IsPositionAllowedFn,
  Position,
  ShortestPathAlgorithmType,
} from "../../GridEngine.js";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy.js";
import { Concrete } from "../../Utils/TypeUtils.js";
import { dirToNumber, turnClockwise } from "../../Direction/Direction.js";

export interface Options {
  distance?: number;
  noPathFoundStrategy?: NoPathFoundStrategy;
  maxPathLength?: number;
  shortestPathAlgorithm?: ShortestPathAlgorithmType;
  ignoreLayers?: boolean;
  considerCosts?: boolean;
  facingDirection?: Direction;
  isPositionAllowedFn?: IsPositionAllowedFn;
  ignoredChars?: CharId[];
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
      isPositionAllowedFn: () => true,
      ignoredChars: [],
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
    if (
      this.options.shortestPathAlgorithm === "JPS" &&
      (this.character.getTileWidth() > 1 || this.character.getTileHeight() > 1)
    ) {
      console.warn(
        `GridEngine: Pathfinding algorithm 'JPS' can only be used for ` +
          `characters with 'tileWidth' and 'tileHeight' of 1`,
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
        considerCosts: this.options.considerCosts,
        isPositionAllowedFn: this.options.isPositionAllowedFn,
        ignoredChars: this.options.ignoredChars,
      },
    };
  }

  private getFacingPos(): Position {
    const turnCount =
      dirToNumber[this.options.facingDirection] +
      dirToNumber[this.charToFollow.getFacingDirection()];

    const newDir: Direction = turnClockwise(Direction.UP, turnCount);

    const refPos = {
      x: this.charToFollow.getTilePos().position.x,
      y: this.charToFollow.getTilePos().position.y,
    };
    if (newDir === Direction.RIGHT) {
      refPos.x += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === Direction.DOWN) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === Direction.DOWN_LEFT) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === Direction.DOWN_RIGHT) {
      refPos.y += this.charToFollow.getTileWidth() - 1;
      refPos.x += this.charToFollow.getTileWidth() - 1;
    } else if (newDir === Direction.UP_RIGHT) {
      refPos.x += this.charToFollow.getTileWidth() - 1;
    }
    return this.gridTilemap.getTilePosInDirection(
      {
        position: new Vector2(refPos),
        layer: this.charToFollow.getTilePos().layer,
      },
      newDir,
    ).position;
  }

  private updateTarget(targetPos: Position, targetLayer: CharLayer): void {
    const useFacingDir =
      this.options.facingDirection !== Direction.NONE &&
      this.options.distance === 0;
    if (useFacingDir) {
      targetPos = this.getFacingPos();
    }
    this.targetMovement = new TargetMovement(
      this.character,
      this.gridTilemap,
      {
        position: new Vector2(targetPos),
        layer: targetLayer,
      },
      {
        distance: useFacingDir ? 0 : this.options.distance + 1,
        config: {
          algorithm: this.options.shortestPathAlgorithm,
          noPathFoundStrategy: this.options.noPathFoundStrategy,
          maxPathLength: this.options.maxPathLength,
          ignoreLayers: this.options.ignoreLayers,
          considerCosts: this.options.considerCosts,
          ignoredChars: [
            this.charToFollow.getId(),
            ...this.options.ignoredChars,
          ],
          isPositionAllowedFn: this.options.isPositionAllowedFn,
        },
      },
    );
  }
}
