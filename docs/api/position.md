---
sidebar_title: Position
sidebar_position: 4
---

# Position

This type exists purely to avoid using the `Phaser.Math.Vector2` Object everywhere. It simply contains an `x` and a `y` property, each of which are `number`.

## Shape

```js
{
  x: number,
  y: number
}
```

## Migrating to v2

The dependency to `Phaser.Math.Vector2` was removed. In version 2 and beyond, all the public methods of Grid Engine will take and return `Position` objects instead of `Phaser.Math.Vector2`. `Position` objects are simpler and only take `x` and `y` coordinates.

Please note that a `Phaser.Math.Vector2` is also a `Position` because it has properties `x` and `y`, so you can keep passing these as input if you like.