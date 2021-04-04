import { GridCharacter } from "./../GridCharacter/GridCharacter";
export declare class RandomMovement {
    private delay;
    private radius;
    private movementTuple;
    constructor(delay?: number, radius?: number);
    setCharacter(character: GridCharacter): void;
    update(delta: number): void;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getFreeRandomDirection;
    private getRandomInt;
}
