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
    constructor(delay?: number, radius?: number);
    setCharacter(character: GridCharacter): void;
    update(delta: number): void;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getFreeRandomDirection;
    private getRandomInt;
}
