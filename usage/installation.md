---
title: Installation
parent: Usage
nav_order: 1
---

# Installation
Installing the **Grid Movement** plugin is simple.

## NPM
```bash
npm i --save phaser-grid-movement-plugin
```

## Web
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

Now you're all set to start using **Grid Movement** in your scenes!

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