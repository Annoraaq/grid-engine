/*eslint no-global-assign: "off"*/
import { RandomUtils } from "./../../Utils/RandomUtils/RandomUtils.js";
import { NumberOfDirections } from "./../../Direction/Direction.js";
import { Direction } from "../../Direction/Direction.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { RandomMovement } from "./RandomMovement.js";
import { Subject } from "rxjs";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";

describe("RandomMovement", () => {
  let randomMovement: RandomMovement;
  let charMock: GridCharacter;
  let positionChangeStartedSubject$: Subject<any>;
  let autoMovementSetSubject$: Subject<any>;

  function mockDirDownStepSize3() {
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(2);
  }

  function mockDirRightStepSize2() {
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(1);
  }

  function mockDirUpStepSize1() {
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(0);
  }

  function mockDirDownRightStepSize6() {
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(5);
  }

  function createCharMock() {
    positionChangeStartedSubject$ = new Subject();
    autoMovementSetSubject$ = new Subject();
    return {
      positionChangeStartedSubject$: positionChangeStartedSubject$,
      autoMovementSetSubject$,
      getId: () => "char",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getNextTilePos: () => ({ position: new Vector2(0, 0), layer: "layer1" }),
      isMoving: () => false,
      positionChangeStarted: function () {
        return this.positionChangeStartedSubject$;
      },
      autoMovementSet: function () {
        return this.autoMovementSetSubject$;
      },
      getNumberOfDirections: jest.fn().mockReturnValue(NumberOfDirections.FOUR),
    } as any;
  }

  beforeEach(() => {
    mockDirUpStepSize1();
    charMock = createCharMock();
    randomMovement = new RandomMovement(charMock);
  });

  it("should add and update character", () => {
    mockDirDownStepSize3();
    randomMovement.update(5);

    expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should return info", () => {
    randomMovement = new RandomMovement(charMock, 10, 2);

    expect(randomMovement.getInfo()).toEqual({
      type: "Random",
      config: {
        delay: 10,
        radius: 2,
      },
    });
  });

  it("should add and update character", () => {
    randomMovement = new RandomMovement(charMock, 10);
    randomMovement.update(5);

    expect(charMock.move).not.toHaveBeenCalled();

    randomMovement.update(6);

    expect(charMock.move).toHaveBeenCalled();
  });

  it("should update only non-blocked characters", () => {
    mockDirDownStepSize3();

    charMock.isBlockingDirection = () => true;
    randomMovement.update(5);

    expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should not move further than radius", () => {
    randomMovement = new RandomMovement(charMock, 0, 2);
    mockDirDownStepSize3();

    charMock.getNextTilePos = () => ({
      position: new Vector2(2, 2),
      layer: "layer1",
    });
    randomMovement.update(1);

    expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should move further than radius if radius is -1", () => {
    randomMovement = new RandomMovement(charMock, 0, -1);
    mockDirDownStepSize3();

    charMock.getNextTilePos = () => ({
      position: new Vector2(2, 2),
      layer: "layer1",
    });
    randomMovement.update(1);

    expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should continue moving if in radius and step size", () => {
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(1);
    mockDirRightStepSize2();

    randomMovement = new RandomMovement(charMock, 0, 2);

    // do first step down and set step size 2
    randomMovement.update(1);
    positionChangeStartedSubject$.next(undefined);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.RIGHT);

    mockDirUpStepSize1();

    // do next step which is still smaller than step size
    randomMovement.update(1);
    positionChangeStartedSubject$.next(undefined);
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.RIGHT);

    // do next step which exceeds step size. New random direction (up)
    // should be taken
    randomMovement.update(1);
    positionChangeStartedSubject$.next(undefined);
    expect(charMock.move).toHaveBeenNthCalledWith(3, Direction.UP);
  });

  it("should reset step size", () => {
    mockDirRightStepSize2();
    randomMovement = new RandomMovement(charMock, 0, 2);

    mockDirUpStepSize1();

    // set stepsWalked to 2
    positionChangeStartedSubject$.next(undefined);
    positionChangeStartedSubject$.next(undefined);

    // sets step size to 1
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.UP);

    mockDirDownStepSize3();

    // set stepsWalked to 1
    positionChangeStartedSubject$.next(undefined);
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);
  });

  it("should not continue moving if direction blocked", () => {
    randomMovement = new RandomMovement(charMock, 50, 2);
    mockDirDownStepSize3();

    // do first step down and set step size 2
    randomMovement.update(60);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);
    expect(charMock.move).toHaveBeenCalledTimes(1);

    charMock.isBlockingDirection = () => true;

    // do next step which is blocked
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenCalledTimes(1);
  });

  it("should not continue moving if direction is out of radius", () => {
    randomMovement = new RandomMovement(charMock, 50, 2);
    // dir down
    mockDirDownStepSize3();

    // do first step down and set step size 2
    randomMovement.update(60);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    charMock.getNextTilePos = () => ({
      position: new Vector2(2, 2),
      layer: "layer1",
    });

    // do next step which is out of radius
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenCalledTimes(1);
  });

  it("should unsubscribe from positionChangeStarted on autoMovementSet", () => {
    randomMovement = new RandomMovement(charMock, 0, 2);
    mockDirDownStepSize3();
    // start moving down
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    mockDirUpStepSize1();

    autoMovementSetSubject$.next(undefined);
    positionChangeStartedSubject$.next(undefined);
    positionChangeStartedSubject$.next(undefined);

    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);
  });

  describe("8 directions", () => {
    beforeEach(() => {
      (charMock as any).getNumberOfDirections.mockReturnValue(
        NumberOfDirections.EIGHT,
      );
      randomMovement = new RandomMovement(charMock);
    });

    it("should add and update character", () => {
      mockDirDownRightStepSize6();
      randomMovement.update(5);

      expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN_RIGHT);
    });

    it("should not move further than radius", () => {
      randomMovement = new RandomMovement(charMock, 0, 2);
      mockDirRightStepSize2();

      charMock.getNextTilePos = () => ({
        position: new Vector2(4, 4),
        layer: "layer1",
      });
      randomMovement.update(1);

      expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
    });
  });
});
