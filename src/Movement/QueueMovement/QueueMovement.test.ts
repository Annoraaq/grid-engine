import { Vector2 } from "../../Utils/Vector2/Vector2";
import {
  QueueMovement,
  QueueMovementConfig,
  QueuedPathBlockedStrategy,
} from "./QueueMovement";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { CharConfig, GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../Direction/Direction";
import {
  mockLayeredBlockMap,
  updateLayer,
} from "../../Utils/MockFactory/MockFactory";
import { Tilemap } from "../../GridTilemap/Tilemap";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy";

interface TestData {
  gridTilemap: GridTilemap;
  mockChar: GridCharacter;
  queueMovement: QueueMovement;
  finishedObsCallbackMock: jest.Mock<any, any>;
  finishedObsCompleteMock: jest.Mock<any, any>;
}

const TEST_CHAR_CONFIG = {
  speed: 1,
  collidesWithTiles: true,
  numberOfDirections: NumberOfDirections.FOUR,
};

describe("QueueMovement", () => {
  function initQueueMovement(
    tilemap?: Tilemap,
    config: QueueMovementConfig = {}
  ): TestData {
    if (!tilemap) {
      tilemap = mockLayeredBlockMap([
        {
          layer: "testCharLayer",
          blockMap: [
            // prettier-ignore
            "...",
            "...",
          ],
        },
        {
          layer: "someOtherLayer",
          blockMap: [
            // prettier-ignore
            "...",
            "...",
          ],
        },
      ]);
    }
    const gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES
    );
    const mockChar = createMockChar("player", layerPos(0, 0), {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
    });
    const queueMovement = new QueueMovement(mockChar, gridTilemap, config);
    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    queueMovement.finished().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });

    return {
      gridTilemap,
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    };
  }

  function createMockChar(
    id: string,
    pos: LayerVecPos,
    charConfig: CharConfig
  ): GridCharacter {
    const mockChar = new GridCharacter(id, charConfig);
    mockChar.setTilePosition(pos);
    return mockChar;
  }

  function layerPos(
    x: number,
    y: number,
    layer = "testCharLayer"
  ): LayerVecPos {
    return {
      position: new Vector2(x, y),
      layer,
    };
  }

  function expectWalkedPath(
    mockChar: GridCharacter,
    queueMovement: QueueMovement,
    path: LayerVecPos[]
  ) {
    for (const pos of path) {
      queueMovement.update(1000);
      mockChar.update(1000);
      expect(mockChar.getTilePos()).toEqual(pos);
    }
  }

  it("should return info", () => {
    const { queueMovement } = initQueueMovement();
    expect(queueMovement.getInfo()).toEqual({
      type: "Queue",
    });
  });

  it("should add positions", () => {
    const { queueMovement } = initQueueMovement();
    expect(queueMovement.size()).toEqual(0);
    queueMovement.enqueue([
      { position: new Vector2(0, 1), layer: "testLayer" },
      { position: new Vector2(0, 2), layer: "testlayer2" },
    ]);
    expect(queueMovement.size()).toEqual(2);
    expect(queueMovement.peekAll()).toEqual([
      { position: new Vector2(0, 1), layer: "testLayer" },
      { position: new Vector2(0, 2), layer: "testlayer2" },
    ]);
  });

  it("should walk path", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    queueMovement.enqueue([layerPos(1, 0), layerPos(1, 1)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0), layerPos(1, 1)]);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 1).position,
      result: "SUCCESS",
      description: "",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should ignore invalid next positions", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(undefined, {
      ignoreInvalidPositions: true,
    });
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 1)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "SUCCESS",
      description: "",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should ignore invalid next positions on empty queue", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(undefined, {
      ignoreInvalidPositions: true,
    });
    queueMovement.enqueue([layerPos(2, 0), layerPos(1, 0)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "SUCCESS",
      description: "",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should fail on invalid path", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 1)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "INVALID_NEXT_POS",
      description:
        "Position (2, 1, testCharLayer) is not reachable from (1, 0, testCharLayer).",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should complete on new automatic movement set", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    queueMovement.enqueue([layerPos(1, 0)]);

    mockChar.setMovement(undefined);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(0, 0).position,
      result: "MOVEMENT_TERMINATED",
      description: "New automatic movement has been set to character.",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should complete on new automatic movement set with empty queue", () => {
    const { mockChar, finishedObsCallbackMock, finishedObsCompleteMock } =
      initQueueMovement();
    mockChar.setMovement(undefined);

    expect(finishedObsCallbackMock).not.toHaveBeenCalled();
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should fail if transition leads away", () => {
    const {
      mockChar,
      gridTilemap,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    gridTilemap.setTransition(
      new Vector2(2, 0),
      "testCharLayer",
      "someOtherLayer"
    );
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "INVALID_NEXT_POS",
      description:
        "Position (2, 0, testCharLayer) is not reachable from (1, 0, testCharLayer).",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should fail if transition missing", () => {
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0, "someOtherLayer")]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "INVALID_NEXT_POS",
      description:
        "Position (2, 0, someOtherLayer) is not reachable from (1, 0, testCharLayer).",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should consider transition", () => {
    const {
      mockChar,
      gridTilemap,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement();
    gridTilemap.setTransition(
      new Vector2(2, 0),
      "testCharLayer",
      "someOtherLayer"
    );
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0, "someOtherLayer")]);

    expectWalkedPath(mockChar, queueMovement, [
      layerPos(1, 0),
      layerPos(2, 0, "someOtherLayer"),
    ]);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(2, 0).position,
      result: "SUCCESS",
      description: "",
      layer: "someOtherLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should stop if path is blocked", () => {
    const tilemapMock = mockLayeredBlockMap([
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "..#",
          "...",
        ],
      },
    ]);
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(tilemapMock);
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "PATH_BLOCKED",
      description: "Position (2, 0, testCharLayer) is blocked.",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should stop if path is blocked on transition", () => {
    const tilemapMock = mockLayeredBlockMap([
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "..*",
          "...",
        ],
      },
      {
        layer: "someOtherLayer",
        blockMap: [
          // prettier-ignore
          "..#",
          "...",
        ],
      },
    ]);
    const {
      mockChar,
      gridTilemap,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(tilemapMock);
    gridTilemap.setTransition(
      new Vector2(2, 0),
      "testCharLayer",
      "someOtherLayer"
    );
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0, "someOtherLayer")]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "PATH_BLOCKED",
      description: "Position (2, 0, someOtherLayer) is blocked.",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should wait if path is blocked", () => {
    const tilemapMock = mockLayeredBlockMap([
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "..#",
          "...",
        ],
      },
    ]);
    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(tilemapMock, {
      pathBlockedStrategy: QueuedPathBlockedStrategy.WAIT,
    });
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).not.toHaveBeenCalled();

    updateLayer(
      tilemapMock,
      [
        // prettier-ignore
        "...",
        "...",
      ],
      "testCharLayer"
    );

    expectWalkedPath(mockChar, queueMovement, [layerPos(2, 0)]);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(2, 0).position,
      result: "SUCCESS",
      description: "",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should wait if path is blocked only until timeout", () => {
    const tilemapMock = mockLayeredBlockMap([
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "..#",
          "...",
        ],
      },
    ]);

    const {
      mockChar,
      queueMovement,
      finishedObsCallbackMock,
      finishedObsCompleteMock,
    } = initQueueMovement(tilemapMock, {
      pathBlockedStrategy: QueuedPathBlockedStrategy.WAIT,
      pathBlockedWaitTimeoutMs: 1001,
    });
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0)]);

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);
    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).not.toHaveBeenCalled();

    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: layerPos(1, 0).position,
      result: "PATH_BLOCKED_WAIT_TIMEOUT",
      description:
        "Position (2, 0, testCharLayer) is blocked and the wait timeout of " +
        "1001 ms has been exceeded.",
      layer: "testCharLayer",
    });
    expect(finishedObsCompleteMock).not.toHaveBeenCalled();
    expect(queueMovement.size()).toBe(0);
  });

  it("should reset wait timeout", () => {
    const tilemapMock = mockLayeredBlockMap([
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          ".#.",
          "...",
        ],
      },
    ]);

    const { mockChar, queueMovement, finishedObsCallbackMock } =
      initQueueMovement(tilemapMock, {
        pathBlockedStrategy: QueuedPathBlockedStrategy.WAIT,
        pathBlockedWaitTimeoutMs: 1001,
      });
    queueMovement.enqueue([layerPos(1, 0), layerPos(2, 0)]);

    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).not.toHaveBeenCalled();

    updateLayer(
      tilemapMock,
      [
        // prettier-ignore
        "..#",
        "...",
      ],
      "testCharLayer"
    );

    expectWalkedPath(mockChar, queueMovement, [layerPos(1, 0)]);

    queueMovement.update(1000);
    mockChar.update(1000);

    expect(finishedObsCallbackMock).not.toHaveBeenCalled();
  });
});
