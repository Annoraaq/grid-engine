import { GridCharacter } from "./../GridCharacter/GridCharacter";
export declare class RandomMovement {
    private randomlyMovingCharacters;
    constructor();
    addCharacter(character: GridCharacter, delay?: number, radius?: number): void;
    removeCharacter(charId: string): void;
    update(delta: number): void;
    private shouldContinueWalkingCurrentDirection;
    private getFreeDirections;
    private isWithinRadius;
    private getFreeRandomDirection;
    private getRandomInt;
}
