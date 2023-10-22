import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Movement, MovementInfo } from "../Movement.js";
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
    constructor(character: GridCharacter, delay?: number, radius?: number);
    update(delta: number): void;
    getInfo(): MovementInfo;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getDist;
    private getFreeRandomDirection;
    private randomizeStepSize;
}
