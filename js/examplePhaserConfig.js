function config(preload, create, update) {
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
      width: 700,
      height: 528,
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    parent: "game",
    backgroundColor: "#48C4F8",
    input: {
      mouse: {
        preventDefaultWheel: false
      },
      touch: {
        capture: false
      }
    }
  };
}
