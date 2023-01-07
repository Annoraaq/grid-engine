---
title: Tile Properties
---

# Tile Properties

There's a number of _Custom Properties_ you can set for various uses on individual tiles in your **Tiled** tilemaps. This guide will walk you through them! Remember, these are subject to change, and more will come.

ℹ️ If you're unsure how to add _Custom Properties_ to your tiles, see the [the Collision guide](../collisions) to get started.

## Collisions

These properties relate to how individual tiles react to collisions.

### Basic

For the most basic type of collision, read [the Collision guide](../collisions) to get started. When `true`, characters can not pass through the tile from any direction.

| Property     | Type    | Effect                                                                                                                                              |
| :----------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ge_collide` | boolean | If set to `true`, characters can not walk over tile from any direction. <br>If set to `false`, characters can walk through tile from any direction. |

### One-Way

These flags inform **Grid Engine** about how it should handle collisions from certain directions. When a one-way flag is set to true, it won't allow a character to pass through the tile from that direction. Multiple flags can be true at the same time. For a demo, see [the One-Way Collision demo](../../example/one-way-collision).

| Property           | Type    | Effect                                                               |
| :----------------- | :------ | :------------------------------------------------------------------- |
| `ge_collide_up`    | boolean | If set to `true`, characters can not walk over tile from the top.    |
| `ge_collide_down`  | boolean | If set to `true`, characters can not walk over tile from the bottom. |
| `ge_collide_left`  | boolean | If set to `true`, characters can not walk over tile from the left.   |
| `ge_collide_right` | boolean | If set to `true`, characters can not walk over tile from the right.  |
