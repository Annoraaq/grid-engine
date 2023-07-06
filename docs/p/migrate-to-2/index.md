---
title: Migrate to Version 2
parent: migrations
next: false
prev: false
---

# Migrate to Version 2

## Why Migrate?

Version 1 will not be maintained anymore. Version 2 gets rid of old deprecated methods and properties. This speeds up development.
As a bonus, version 2 uses the version of Phaser you are using for your game instead of bringing its own copy. This means that the file size of GridEngine 2 is < 100kb instead of ~1mb as in GridEngine 1.

This guide helps you to migrate from version 1.x to version 2.x.

## Replace `moveLeft`, `moveRight`, `moveUp`, `moveDown`

These methods were removed because there is a generic method `move`, that supports all 8 directions.
For instance, replace `moveLeft("player")` with `move("player", "left")`;

## Replace `Phaser.Math.Vector2`

This dependency to phaser was removed. In version 2, all the public methods of GridEngine will take and return [Position][position] objects instead of `Phaser.Math.Vector2`. [Position][position] objects are simpler and only take x and y coordinates. Please note that a `Phaser.Math.Vector2` is also a `Position` because it has properties `x` and `y`. So you can keep passing these as input if you like.

## Rename `positionChanged()` to `positionChangeStarted()`

To keep the observable names consistent, `positionChanged()` has been renamed to `positionChangeStarted()`. This is consistent to `positionChangeFinished()`.

## Change Observable Return Types

In order to be consistent through all observables, the return types of `movementStarted()`, `movementStopped()` and `directionChanged()` have been changed from an array [string, [Direction][direction]] to an object: {charId: string, direction: [Direction][direction]}.

The following example code needs to be transformed as follows:

```js
this.gridEngine.movementStarted().subscribe(([charId, direction]) => {
  // ...
});
```

becomes

```js
this.gridEngine.movementStarted().subscribe(({ charId, direction }) => {
  // ...
});
```

## Rename Tile and Tile Layer Properties

All tile and tile layer properties that previously started with `gm_` have been renamed and now start with `ge_`.

Further, the tile property `collides` is not a default property anymore. You can either rename it in your tilemap to `ge_collide` or you can set it as `collisionTilePropertyName` in the [config](https://annoraaq.github.io/grid-engine/api/interfaces/GridEngineConfig#htmlcollisionTilePropertyName).

## Remove `firstLayerAboveChar` Config Property

The deprecated `firstLayerAboveChar` config property has been removed. Use `ge_alwaysTop` tilemap layer property instead.

## Remove `characterIndex` Character Config Property

The deprecated `characterIndex` character config property has been removed. Use `walkingAnimationMapping` instead.

## Remove `walkingAnimationEnabled`

The character config property `walkingAnimationEnabled` has been removed. Simply don't provide a `walkingAnimationMapping` to disable walking animations.

[position]: https://annoraaq.github.io/grid-engine/api/interfaces/Position.html
[direction]: https://annoraaq.github.io/grid-engine/api/enums/Direction.html
