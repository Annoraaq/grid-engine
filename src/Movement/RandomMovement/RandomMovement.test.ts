/*eslint no-global-assign: "off"*/
import { NumberOfDirections } from "./../../Direction/Direction";
import { Direction } from "../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { RandomMovement } from "./RandomMovement";
import { Subject } from "rxjs";
import { Vector2 } from "../../Utils/Vector2/Vector2";

describe("RandomMovement", () => {
  let randomMovement: RandomMovement;
  let charMock: GridCharacter;
  let positionChangedSubject$: Subject<any>;
  let autoMovementSetSubject$: Subject<any>;

  function mockRandom(val: number) {
    const mockMath = Object.create(Math);
    mockMath.random = () => val;
    Math = mockMath;
  }

  beforeEach(() => {
    randomMovement = new RandomMovement();
    positionChangedSubject$ = new Subject();
    autoMovementSetSubject$ = new Subject();
    charMock = <any>{
      positionChangedSubject$,
      autoMovementSetSubject$,
      getId: () => "char",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getNextTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
      positionChanged: function () {
        return this.positionChangedSubject$;
      },
      autoMovementSet: function () {
        return this.autoMovementSetSubject$;
      },
    };
  });

  it("should add and update character", () => {
    mockRandom(0.5);
    randomMovement.setCharacter(charMock);
    randomMovement.update(5);

    expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN);
  });
  it("should add and update character", () => {
    randomMovement = new RandomMovement(10);
    randomMovement.setCharacter(charMock);
    randomMovement.update(5);

    expect(charMock.move).not.toHaveBeenCalled();

    randomMovement.update(6);

    expect(charMock.move).toHaveBeenCalled();
  });

  it("should update only non-blocked characters", () => {
    mockRandom(0.5);

    charMock.isBlockingDirection = () => true;
    randomMovement.setCharacter(charMock);
    randomMovement.update(5);

    expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should not move further than radius", () => {
    randomMovement = new RandomMovement(0, 2);
    mockRandom(0.5);

    randomMovement.setCharacter(charMock);
    charMock.getNextTilePos = () => new Vector2(2, 2);
    randomMovement.update(1);

    expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should move further than radius if radius is -1", () => {
    randomMovement = new RandomMovement(0, -1);
    mockRandom(0.5);

    randomMovement.setCharacter(charMock);
    charMock.getNextTilePos = () => new Vector2(2, 2);
    randomMovement.update(1);

    expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should continue moving if in radius and step size", () => {
    randomMovement = new RandomMovement(0, 2);
    mockRandom(0.7);

    randomMovement.setCharacter(charMock);

    // do first step down and set step size 2
    randomMovement.update(1);
    positionChangedSubject$.next();
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    // next random direction would be up
    mockRandom(0.1);

    // do next step which is still smaller than step size
    randomMovement.update(1);
    positionChangedSubject$.next();
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);

    // do next step which exceeds step size. New random direction (up)
    // should be taken
    randomMovement.update(1);
    positionChangedSubject$.next();
    expect(charMock.move).toHaveBeenNthCalledWith(3, Direction.UP);
  });

  it("should reset step size", () => {
    randomMovement = new RandomMovement(0, 2);
    mockRandom(0.7); // dir: down, stepSize: 2
    randomMovement.setCharacter(charMock);

    mockRandom(0.1); // dir: up, stepSize: 1

    // set stepsWalked to 2
    positionChangedSubject$.next();
    positionChangedSubject$.next();

    // sets step size to 1
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.UP);

    mockRandom(0.7); // dir: down, stepSize: 2

    // set stepsWalked to 1
    positionChangedSubject$.next();
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);
  });

  it("should not continue moving if direction blocked", () => {
    randomMovement = new RandomMovement(50, 2);
    mockRandom(0.7);

    randomMovement.setCharacter(charMock);

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
    randomMovement = new RandomMovement(50, 2);
    mockRandom(0.7);

    randomMovement.setCharacter(charMock);

    // do first step down and set step size 2
    randomMovement.update(60);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    charMock.getNextTilePos = () => new Vector2(2, 2);

    // do next step which is out of radius
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenCalledTimes(1);
  });

  it("should unsubscribe from positionChanged on autoMovementSet", () => {
    randomMovement = new RandomMovement(0, 2);
    mockRandom(0.7); // dir: down, stepSize: 2
    randomMovement.setCharacter(charMock);
    // start moving down
    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    mockRandom(0.1); // dir: up, stepSize: 1

    autoMovementSetSubject$.next();
    positionChangedSubject$.next();
    positionChangedSubject$.next();

    randomMovement.update(1);
    expect(charMock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);
  });

  describe("8 directions", () => {
    beforeEach(() => {
      randomMovement = new RandomMovement();
      randomMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
    });

    it("should add and update character", () => {
      mockRandom(0.7);
      randomMovement.setCharacter(charMock);
      randomMovement.update(5);

      expect(charMock.move).toHaveBeenCalledWith(Direction.DOWN_RIGHT);
    });

    it("should not move further than radius", () => {
      randomMovement = new RandomMovement(0, 2);
      randomMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      mockRandom(0.7);

      randomMovement.setCharacter(charMock);
      charMock.getNextTilePos = () => new Vector2(4, 4);
      randomMovement.update(1);

      expect(charMock.move).toHaveBeenCalledWith(Direction.NONE);
    });
  });
});
