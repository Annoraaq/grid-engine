import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { CharLayer } from "../../GridEngine.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { CollisionStrategy } from "../../Collisions/CollisionStrategy.js";
export declare class CharBlockCache {
    private collistionStrategy;
    private collisionGroupRelation?;
    private tilePosToCharacters;
    private charRemoved$;
    constructor(collistionStrategy: CollisionStrategy, collisionGroupRelation?: Map<string, Set<string>> | undefined);
    isCharBlockingAt(pos: Vector2, layer: CharLayer, collisionGroups: string[], exclude?: Set<string>, ignoredCollisionGroups?: Set<string>): boolean;
    private doIntersect;
    private collidesWith;
    getCharactersAt(pos: Vector2, layer?: string): Set<GridCharacter>;
    addCharacter(character: GridCharacter): void;
    removeCharacter(character: GridCharacter): void;
    private add;
    private addTilePosSetSub;
    private charRemoved;
    private addPositionChangeSub;
    private addPositionChangeFinishedSub;
    private addTilePositions;
    private deleteTilePositions;
    private forEachCharTile;
    private posChangeToLayerPos;
    private posToString;
}
