function getBasicConfig(preload, create, update) {
  return {
    title: "GridEngineExample",
    render: {
      antialias: false,
    },
    type: Phaser.AUTO,
    plugins: {
      scene: [
        {
          key: "gridEngine",
          plugin: GridEngine,
          mapping: "gridEngine",
        },
      ],
    },
    scale: {
      width: 720,
      height: 528,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },

    parent: "game",
    backgroundColor: "#48C4F8",
  };
}
