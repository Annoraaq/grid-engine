/**
 * @category Configuration
 */
export enum CollisionStrategy {
  /**
   * Not used yet.
   * @internal
   * @alpha
   */
  DONT_BLOCK = "DONT_BLOCK",

  /**
   * When character is standing, it will block only one tile. If it is moving,
   * it will block the tile it is leaving and the tile it is entering.
   */
  BLOCK_TWO_TILES = "BLOCK_TWO_TILES",

  /**
   * When character is standing, it will block only one tile. If it is moving,
   * it will only block the tile it is entering.
   */
  BLOCK_ONE_TILE_AHEAD = "BLOCK_ONE_TILE_AHEAD",

  /**
   * Not used yet.
   * @internal
   * @alpha
   */
  BLOCK_ONE_TILE_BEHIND = "BLOCK_ONE_TILE_BEHIND",
}
