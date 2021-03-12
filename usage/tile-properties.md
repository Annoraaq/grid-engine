---
title: Tile Properties
parent: Usage
nav_order: 3
---

# Tile Properties
There's a number of *Custom Properties* you can set for various uses on individual tiles in your **Tiled** tilemaps. This guide will walk you through them! Remember, these are subject to change, and more will come.

ℹ️ If you're unsure how to add *Custom Properties* to your tiles, see the [the Collision guide](collision) to get started.

## Collisions
These properties relate to how individual tiles react to collisions.

### Basic
For the most basic type of collision, read [the Collision guide](collision) to get started. When `true`, characters can not pass through the tile from any direction.

| Property  | Type    | Effect             |
|:----------|:--------|:-------------------|
| `collides`| boolean | If set to `true`, characters can not walk over tile from any direction. <br>If set to `false`, characters can walk through tile from any direction.  |

### One-Way
These flags inform **Grid Movement** about how it should handle collisions from certain directions. When a one-way flag is set to true, it won't allow a character to pass through the tile from that direction. Multiple flags can be true at the same time. For a demo, see [the One-Way Collision demo](/examples/one-way-collision).

| Property          | Type    | Effect                                                               |
|:------------------|:--------|:---------------------------------------------------------------------|
| `gm_collide_up`   | boolean | If set to `true`, characters can not walk over tile from the top.    |
| `gm_collide_down` | boolean | If set to `true`, characters can not walk over tile from the bottom. |
| `gm_collide_left` | boolean | If set to `true`, characters can not walk over tile from the left.   |
| `gm_collide_right`| boolean | If set to `true`, characters can not walk over tile from the right.  |