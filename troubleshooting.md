---
layout: default
title: Troubleshooting
permalink: /troubleshooting/
---

# Troubleshooting

Here are some issues we've come across, and how to fix them (if we've found a fix).

## Invalid Scene Plugin: gridMovementPlugin

<img src="../img/PGMPnotFound.png" alt="Invalid Scene Plugin: gridMovementPlugin error screenshot">
This error will prevent loading of the plugin, and can occur if your bundler doesn't require `* as` for commonjs modules. To resolve this, try changing the following line:

```javascript
import * as GridMovementPlugin from "phaser-grid-movement-plugin";
```

to

```javascript
import GridMovementPlugin from "phaser-grid-movement-plugin";
```

## Clash with Phaser's default physics engine

Make sure that you disable the default physics engine's collisions for all the sprites that you add to the plugin. Otherwise you might be observing the inexplicable misplacement of characters.
