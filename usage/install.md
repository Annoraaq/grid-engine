# Install

### npm

Install the dependency:

```text
npm i --save phaser-grid-movement-plugin
```

And import it to your code:

```javascript
import * as GridMovementPlugin from "phaser-grid-movement-plugin";
```

### Web

You can also download the `GridMovementPlugin.min.js` from the `dist` folder and import it via:

```markup
<script src="GridMovementPlugin.min.js"></script>
```

In your GameConfig add:

```javascript
const gameConfig = {

  ...

  plugins: {
    scene: [
      {
        key: "gridMovementPlugin",
        plugin: GridMovementPlugin,
        mapping: "gridMovementPlugin",
      },
    ],
  },

  ...

};

const game = new Phaser.Game(gameConfig);
```

In your Scenes create method add:

```javascript
function create () {

  ...

  const gridMovementConfig = {
    characters: [{
      id: "player",
      sprite: playerSprite,
      walkingAnimationMapping: 6,
    }],
  };

  this.gridMovementPlugin.create(tilemap, gridMovementConfig);

  ...

}
```

That's all you need for a minimum configuration. See the examples folder for a complete example.

### 

