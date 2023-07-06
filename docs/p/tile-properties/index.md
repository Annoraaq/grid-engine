---
title: Tile Properties
next: false
prev: false
---

# Tile Properties

There's a number of _Custom Properties_ you can set for various uses on individual tiles in your **Tiled** tilemaps. This guide will walk you through them! Remember, these are subject to change, and more will come.

ℹ️ If you're unsure how to add _Custom Properties_ to your tiles, see the [the Collision guide](../collision/index.html) to get started.

## Collisions

These properties relate to how individual tiles react to collisions.

### Basic

For the most basic type of collision, read [the Collision guide](../collision/index.html) to get started. When `true`, characters can not pass through the tile from any direction.

| Property     | Type    | Effect                                                                                                                                              |
| :----------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ge_collide` | boolean | If set to `true`, characters can not walk over tile from any direction. <br>If set to `false`, characters can walk through tile from any direction. |

### One-Way

These flags inform **Grid Engine** about how it should handle collisions from certain directions. When a one-way flag is set to true, it won't allow a character to pass through the tile from that direction. Multiple flags can be true at the same time. For a demo, see [the One-Way Collision demo](../../examples/one-way-collision/index.html).

| Property                | Type    | Effect                                                                    |
| :---------------------- | :------ | :------------------------------------------------------------------------ |
| `ge_collide_up`         | boolean | If set to `true`, characters cannot walk over tile from the top.          |
| `ge_collide_down`       | boolean | If set to `true`, characters cannot walk over tile from the bottom.       |
| `ge_collide_left`       | boolean | If set to `true`, characters cannot walk over tile from the left.         |
| `ge_collide_right`      | boolean | If set to `true`, characters cannot walk over tile from the right.        |
| `ge_collide_up-left`    | boolean | If set to `true`, characters cannot walk over tile from the top-left.     |
| `ge_collide_up-right`   | boolean | If set to `true`, characters cannot walk over tile from the top-right.    |
| `ge_collide_down-left`  | boolean | If set to `true`, characters cannot walk over tile from the bottom-left.  |
| `ge_collide_down-right` | boolean | If set to `true`, characters cannot walk over tile from the bottom-right. |

## Pathfinding-Costs

These properties define the cost used for pathfinding for a tile. Please note that you have to use A\* as an algorithm to consider costs. Additionally you need to activate the `considerCosts` option:
[[1]][consider-costs], [[2]][move-to-consider-costs], [[3]][follow-consider-costs].

If the property is not set, a tile automatically has a cost value of 1.

### Basic

| Property  | Type | Effect                                                         |
| :-------- | :--- | :------------------------------------------------------------- |
| `ge_cost` | int  | Cost for pathfinding for entering the tile from any direction. |

### Direction Specific

These properties define pathfinding costs for entering the tile from certain directions.

If `ge_cost` is also set, the direction specific properties below will have precedence before `ge_cost`.

| Property             | Type | Effect                                                            |
| :------------------- | :--- | :---------------------------------------------------------------- |
| `ge_cost_up`         | int  | Cost for pathfinding for entering the tile from the top.          |
| `ge_cost_down`       | int  | Cost for pathfinding for entering the tile from the bottom.       |
| `ge_cost_left`       | int  | Cost for pathfinding for entering the tile from the left.         |
| `ge_cost_right`      | int  | Cost for pathfinding for entering the tile from the right.        |
| `ge_cost_up-left`    | int  | Cost for pathfinding for entering the tile from the top-left.     |
| `ge_cost_up-right`   | int  | Cost for pathfinding for entering the tile from the top-right.    |
| `ge_cost_down-left`  | int  | Cost for pathfinding for entering the tile from the bottom-left.  |
| `ge_cost_down-right` | int  | Cost for pathfinding for entering the tile from the bottom-right. |

[consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/PathfindingOptions.html#considerCosts
[move-to-consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/MoveToConfig.html#considerCosts
[follow-consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/FollowOptions.html#considerCosts
