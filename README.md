<p align="center">
    <img src="https://img.shields.io/github/v/release/Annoraaq/phaser-grid-movement-plugin?style=for-the-badge&color=brightgreen">
    <img src="https://img.shields.io/github/stars/Annoraaq/phaser-grid-movement-plugin?style=for-the-badge&color=yellow">
    <img src="https://img.shields.io/badge/made%20with-TypeScript-blue?style=for-the-badge">
</p>

Welcome to the **Grid Movement** plugin! This Phaser 3 plugin adds grid-based movement to your tilemap game. Your characters will be able to only move in whole tile sizes, locked to the x-y grid!

This plugin is also compatible (and written in) TypeScript; enjoy full type support!

<p align="center">
    <img src="https://raw.githubusercontent.com/Annoraaq/phaser-grid-movement-plugin/docs/assets/other/features-label.png" alt="Features" />
</p>

* Grid-based movement, of course!
* Tile-based collision detection
* One-way collision detection
* Support for multiple characters
* Pathfinding (for both NPCs and the player)
* Random movement (can also limit to a radius)
* Following other characters

📖 Our most current documentation [is here](https://annoraaq.github.io/phaser-grid-movement-plugin/wiki/)!
➡️ You can try/download a list of examples [at this link here](https://annoraaq.github.io/phaser-grid-movement-plugin/examples/).

<p align="center">
    <img src="https://raw.githubusercontent.com/Annoraaq/phaser-grid-movement-plugin/docs/assets/other/installation-label.png" alt="Installation" />
</p>

Installing the Grid Movement plugin is simple.

### NPM
```bash
npm i --save phaser-grid-movement-plugin
```

### Web
```html
<!-- Download the .zip and copy GridMovementPlugin.min.js from dist/ -->
<script src="GridMovementPlugin.min.js"></script>
```

Then, inside your Phaser game config...

```javascript
const gameConfig = {
    // ...

    plugins: {
        scene: [
            {
                key: "gridMovementPlugin",
                plugin: GridMovementPlugin,
                mapping: "gridMovementPlugin",
            },
        ],
    },

    // ...
};

const game = new Phaser.Game(gameConfig);
```

Now you're all set to start using Grid Movement in your scenes!

```javascript
function create () {
    // ...

    const gridMovementConfig = {
        characters: [{
            id: "player",
            sprite: playerSprite,
            walkingAnimationMapping: 6,
        }],
    };

    this.gridMovementPlugin.create(tilemap, gridMovementConfig);

    // ...
}
```

<p align="center">
    <img src="https://raw.githubusercontent.com/Annoraaq/phaser-grid-movement-plugin/docs/assets/other/gifs-label.png" alt="Example GIFs" />
</p>
<p align="center">
    <img src="https://github.com/Annoraaq/phaser-grid-movement-plugin/raw/master/images/movement.gif" />
</p>

<p align="center">
    <img src="https://github.com/Annoraaq/phaser-grid-movement-plugin/raw/master/images/radius-movement.gif" />
</p>