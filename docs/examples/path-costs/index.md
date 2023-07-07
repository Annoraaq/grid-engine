---
title: Tile Costs for Pathfinding
next: false
prev: false
---

<script setup>
import ExampleFrame from '../../components/ExampleFrame.vue';
</script>

# Tile Costs for Pathfinding

This example shows how tile costs can be considered for pathfinding. The liana has a tile cost of 4 when climbing **up** (the tiles have the property `ge_cost_down = 4`).
Characters have been set up to slow down by the factor of the [tile costs][tile-costs]. Try to climb **up** the liana to observe this.

You can turn `considerCosts`([[1]][consider-costs], [[2]][move-to-consider-costs], [[3]][follow-consider-costs]) on and off for the pathfinding of the NPC and observe how it will take the higher tile cost of the liana into account.

> **_NOTE:_** `considerCosts` does only work with A\*

<ExampleFrame :src="'../../example-code/path-costs/index.html'" :height="900"/>

## Code

[:link: See full code on GitHub](https://github.com/Annoraaq/grid-engine/tree/master/docs/public/example-code/path-costs)

[:open_book: How to execute examples locally](../../p/execute-examples-locally/index.html)

::: code-group
<<< @/public/example-code/path-costs/code.js

<<< @/public/example-code/path-costs/index.html

<<< @/public/js/examplePhaserConfig.js [../../js/examplePhaserConfig.js]

<<< @/public/example-code/styles.css [../styles.css]
:::

[consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/PathfindingOptions.html#considerCosts
[move-to-consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/MoveToConfig.html#considerCosts
[follow-consider-costs]: https://annoraaq.github.io/grid-engine/api/interfaces/FollowOptions.html#considerCosts
[tile-costs]: ../../p/tile-properties/index.html#pathfinding-costs
