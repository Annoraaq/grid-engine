function getBasicConfig(preload, create, update) {
    return {
        title: "GridMovementPluginExample",
        render: {
            antialias: false,
        },
        type: Phaser.AUTO,
        plugins: {
            scene: [
                {
                    key: "gridMovementPlugin",
                    plugin: GridMovementPlugin,
                    mapping: "gridMovementPlugin",
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
            update: update
        },
    
        parent: "game",
        backgroundColor: "#48C4F8",
    };
}