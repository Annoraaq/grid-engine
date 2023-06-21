---
title: Tile Costs for Pathfinding
---

# Tile Costs for Pathfinding

This example shows how tile costs can be considered for pathfinding. The liana has a tile cost of 4 when climbing **up** (the tiles have the property `ge_cost_down = 4`).
Characters have been set up to slow down by the factor of the tile costs. Try to climb **up** the liana to observe this.

You can turn `considerCosts` on and off for the pathfinding of the NPC and observe how it will take the higher tile cost of the liana into account.

<iframe style="height: 1000px" scrolling="no" src="../../x/path-costs"></iframe>

## Example Code

`embed:../static/x/path-costs/code.js`

## Example Phaser Config

`embed:../static/js/examplePhaserConfig.js`
