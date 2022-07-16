export function createSpriteMock() {
  return {
    x: 10,
    y: 12,
    displayWidth: 20,
    displayHeight: 40,
    width: 20,
    height: 20,
    setOrigin: jest.fn(),
    texture: {
      source: [{ width: 240 }],
    },
    setFrame: jest.fn(function (name) {
      this.frame.name = name;
    }),
    setDepth: jest.fn(),
    scale: 2,
    frame: {
      name: "1",
    },
  } as any;
}

export function createBlankLayerMock() {
  return {
    scale: 0,
    putTileAt: jest.fn(),
    setDepth: jest.fn(),
  };
}

export function createTilemapMock(blankLayerMock?) {
  if (!blankLayerMock) {
    blankLayerMock = createBlankLayerMock();
  }
  return {
    layers: [
      {
        name: "layer1",
        tilemapLayer: {
          setDepth: jest.fn(),
          scale: 3,
          tileset: "Cloud City",
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "lowerCharLayer",
          },
        ],
      },
      {
        name: "layer2",
        tilemapLayer: {
          setDepth: jest.fn(),
          tileset: "Cloud City",
          scale: 3,
        },
        properties: [
          {
            name: "ge_charLayer",
            value: "testCharLayer",
          },
        ],
      },
    ],
    tileWidth: 16,
    tileHeight: 16,
    width: 20,
    height: 30,
    getTileAt: jest.fn().mockReturnValue({}),
    hasTileAt: jest.fn().mockReturnValue(true),
    createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
  };
}
