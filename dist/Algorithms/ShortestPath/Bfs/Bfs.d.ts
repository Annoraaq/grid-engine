import * as Phaser from "phaser";
declare const Vector2: typeof Phaser.Math.Vector2;
declare type Vector2 = Phaser.Math.Vector2;
export declare class Bfs {
    static getShortestPath(startPos: Vector2, targetPos: Vector2, isBlocked: (_pos: Vector2) => boolean): {
        path: Vector2[];
        closestToTarget: Vector2;
    };
    private static shortestPathBfs;
    private static getNeighbours;
    private static returnPath;
}
export {};
