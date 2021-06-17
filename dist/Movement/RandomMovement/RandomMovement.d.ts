import { NumberOfDirections } from "./../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
export declare class RandomMovement implements Movement {
    private delay;
    private radius;
    private character;
    private delayLeft;
    private initialRow;
    private initialCol;
    private stepSize;
    private stepsWalked;
    private currentMovementDirection;
    private numberOfDirections;
    private distanceUtils;
    constructor(delay?: number, radius?: number);
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(delta: number): void;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getDist;
    private getFreeRandomDirection;
    private getRandomInt;
}
