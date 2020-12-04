import { GridPhysics } from "./GridPhysics";
export declare class GridControls {
    private input;
    private gridPhysics;
    constructor(input: Phaser.Input.InputPlugin, gridPhysics: GridPhysics);
    update(): void;
}
