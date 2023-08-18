export interface RawTiledTilemap {
  width?: number;
  height?: number;
  orientation?: string;
  layers?: RawTiledLayer[];
}

export interface RawTiledLayer {

}

export interface RawTiledTileset {
  firstgid?: number;
  tiles?: RawTiledTilesetTile[];
}

export interface RawTiledTilesetTileProp {
  name?: string;
  type?: string;
  value?: any;
}

export interface RawTiledTilesetTile {
  id: number;
  properties?: RawTiledTilesetTileProp[];
}
