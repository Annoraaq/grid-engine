---
title: Tile Costs for Pathfinding
---

# Tile Costs for Pathfinding

This example shows how tile costs can be considered for pathfinding. The liana has a tile cost of 4 when climbing **up** (the tiles have the property `ge_cost_down = 4`).
Characters have been set up to slow down by the factor of the [tile costs][tile-costs]. Try to climb **up** the liana to observe this.

You can turn `considerCosts`([[1]][consider-costs], [[2]][move-to-consider-costs], [[3]][follow-consider-costs]) on and off for the pathfinding of the NPC and observe how it will take the higher tile cost of the liana into account.

> **_NOTE:_** `considerCosts` does only work with A\*

<iframe style="height: 900px" scrolling="no" src="../../x/path-costs"></iframe>

## Example Code

`embed:../static/x/path-costs/code.js`

## Example Phaser Config

`embed:../static/js/examplePhaserConfig.js`

[consider-costs]: ../../api/interfaces/PathfindingOptions.html#considerCosts
[move-to-consider-costs]: ../../api/interfaces/MoveToConfig.html#considerCosts
[follow-consider-costs]: ../../api/interfaces/FollowOptions.html#considerCosts
[tile-costs]: ../../p/tile-properties#pathfinding-costs
