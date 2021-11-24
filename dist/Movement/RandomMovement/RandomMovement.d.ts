import { NumberOfDirections } from "./../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
export declare class RandomMovement implements Movement {
    private character;
    private delay;
    private radius;
    private delayLeft;
    private initialRow;
    private initialCol;
    private stepSize;
    private stepsWalked;
    private currentMovementDirection;
    private distanceUtils;
    constructor(character: GridCharacter, numberOfDirections?: NumberOfDirections, delay?: number, radius?: number);
    update(delta: number): void;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getDist;
    private getFreeRandomDirection;
    private randomizeStepSize;
}
