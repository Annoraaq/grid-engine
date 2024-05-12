---
title: Pathfinding Performance
next: false
prev: false
---

<script setup>
import { data } from '../../csv.data.js'
import Plot from '../../components/Plot.vue'

function plotData(name) {
  return data.find(d => d.name == name).content;
}

const bg512PlotData  = plotData('bg512-avg-4-dir');
const daoPlotData  = plotData('dao-avg-4-dir');
const roomsPlotData  = plotData('rooms-avg-4-dir');
const maze1PlotData  = plotData('maze-avg-4-1');
const maze2PlotData  = plotData('maze-avg-4-2');
const maze4PlotData  = plotData('maze-avg-4-4');
const maze8PlotData  = plotData('maze-avg-4-8');
const maze16PlotData  = plotData('maze-avg-4-16');
const maze32PlotData  = plotData('maze-avg-4-32');

</script>

# Pathfinding Performance

> **_NOTE:_** The content of this article has been reworked completely in April 2024. A lot has changed. The TL;DR: JPS is now the recommended choice for 4-directional movements since it's performance has been increased significantly. It has been removed for 8-directional movements though, since the old version was not giving correct results and the new one is by far the slowest option.

Pathfinding is expensive. Therefore it can quickly cause performance issues. In Grid Engine, every time you are calling
[findShortestPath][find-shortest-path],
[moveTo][move-to], or
[follow][follow], pathfinding will be triggered. In the case of [follow][follow], it will even be triggered every time the target moves!

So the first advice is not to use it thoughtless. However, there are more things you can do to improve performance for pathfinding in Grid Engine.

## Ignore character layers

Character layers can significantly increase the map size for pathfinding. Only adding a single char layer can double the size of your map. So if you don't need pathfinding to explore different character layers, you can (and should) tell Grid Engine by setting ignoreLayers: [[1]][ignore-layers], [[2]][move-to-ignore-layers], [[3]][follow-ignore-layers].

The algorithm will then only consider the character layer of the start position.

## Pick the right algorithm

There are currently 4 different pathfinding algorithms that you can use in Grid Engine: Breadth First Search (BFS), Bidirectional Search, A\* and Jump Point Search (JPS).

At the beginning, only BFS was supported. Then came Bidirectional Search and then A\* and JPS.

So which one should you choose?

If there was a simple answer to this question there would only be a single supported algorithm and that would be chosen by default. However, depending on the structure and size of your map and your paths, each of these algorithms could be the best choice. But that does not mean that there can be no guidance in picking the right algorithm.

If you need path weights/costs (see [tile costs](../../p/tile-properties/#pathfinding-costs)), you have to use A\*. The other algorithms are not capable of dealing with tile costs. However, if you do not need tile costs A\* might not be your first choice due to slower performance.

If you need pathfinding for path widths/heights or characters with a tile height/width of more than 1, you can't use JPS.

I would recommend JPS for most of you, because it has the best results in the benchmarks I ran (for more details on that, check out the [benchmark section](#benchmarks) below). Just keep in mind that you have the flexibility to change the algorithm to see if it works better in your case.

## Activate caching

Since version 2.28.0, Grid Engine offers the possibility to activate [cacheTileCollisions][cache-tile-collisions] tile collision cache for pathfinding. It takes advantage of the fact, that tile collisions do not change very often in many cases. Many games do have a tile map that stays more or less the same and only characters move frequently. If you need to change something, you can still update the cache locally using [rebuildTileCollisionCache][rebuild-tile-collision-cache].

If you find yourself frequently updating the cache for the whole map, you might be better off with a disabled cache (or you try to change your logic, so that you don't have to frequently update the cache in the first place).

## [PathBlockedStrategy][path-blocked-strategy] and [NoPathFoundStrategy][no-path-found-strategy]

When using [moveTo][move-to], you can determine what happens if no path was found or the path is suddenly blocked while walking it.

By default, these are set to [STOP][stop] and [WAIT][wait]. These settings are already optimal for avoiding unnecessary pathfindings. Just be aware that if you change these settings, there might be additional pathfindings that can slow down your game.

## Benchmarks

I chose [some benchmarks](https://movingai.com/benchmarks/grids.html) that are frequently used in research for pathfinding on grids. As you can see in the following plots, the results vary quite a bit depending on the benchmark. The reason is the different structure of the maps. For each benchmark I have plotted the average runtimes of the different algorithms, grouped by the path length. Because the path length can get quite large and many games only contain smaller maps, I have additionaly provided a "zoomed in" version of each plot, which shows only results for path lengths up to 100.

There is one section for 4 direction (up, down, left, right) pathfinding and one for 8 directions.

The absolute runtimes depend on the machine and the browser. More important are the runtimes of the algorithms relative to each other.

The results can be found in the [Benchmark Results](#benchmark-results) section.

## Conclusion

### 4 Directions

Even though it is not the fastest in each case, JPS seems to be the best choice overall.

BFS and Bidirectional search are also giving acceptable performance. Especially in mazes with a very small corridor size, they are unbeatable (that is because there are almost no path-symmetries that JPS could leverage). So if you have mazes with corridor sizes of 1 or 2, you should consider whether BFS or Bidirectional Search are better choices than JPS.

It is surprising though, that Bidirectional Search seems to underperform BFS in most cases. It is probably due to its specific implementation in Grid Engine.

A\* seems to be quite good on small paths. However, it becomes unacceptably slow for large ones. So JPS seems to be superior to A\* in almost every case.

### 8 Directions

JPS has such a bad performance for 8 directions, that I strongly discourage using it. It remains an open question if the bad performance is due to the implementation in Grid Engine or if the algorithm is generally not performing well on 8 directions with partial obstacles. You should go with BFS or Bidirectional Search if you don't need path weights.

## Benchmark Results

### 4 directions

#### Baldurs Gate

<Plot :rawPlotData="bg512PlotData" />

#### Dragon Age Origin

<Plot :rawPlotData="daoPlotData" />

#### Rooms

<Plot :rawPlotData="roomsPlotData" />

#### Mazes (corridor witdth: 1)

<Plot :rawPlotData="maze1PlotData" />

#### Mazes (corridor witdth: 2)

<Plot :rawPlotData="maze2PlotData" />

#### Mazes (corridor witdth: 4)

<Plot :rawPlotData="maze4PlotData" />

#### Mazes (corridor witdth: 8)

<Plot :rawPlotData="maze8PlotData" />

#### Mazes (corridor witdth: 16)

<Plot :rawPlotData="maze16PlotData" />

#### Mazes (corridor witdth: 32)

<Plot :rawPlotData="maze32PlotData" />

[find-shortest-path]: https://annoraaq.github.io/grid-engine/api/interfaces/IGridEngine.html#findShortestPath
[move-to]: https://annoraaq.github.io/grid-engine/api/interfaces/IGridEngine.html#moveTo
[follow]: https://annoraaq.github.io/grid-engine/api/interfaces/IGridEngine.html#follow
[cache-tile-collisions]: https://annoraaq.github.io/grid-engine/api/interfaces/GridEngineConfigHeadless.html#cacheTileCollisions
[rebuild-tile-collision-cache]: https://annoraaq.github.io/grid-engine/api/classes/GridEngineHeadless.html#rebuildTileCollisionCache
[stop]: https://annoraaq.github.io/grid-engine/api/enums/NoPathFoundStrategy.html#STOP
[wait]: https://annoraaq.github.io/grid-engine/api/enums/PathBlockedStrategy.html#WAIT
[path-blocked-strategy]: https://annoraaq.github.io/grid-engine/api/enums/PathBlockedStrategy.html
[no-path-found-strategy]: https://annoraaq.github.io/grid-engine/api/enums/NoPathFoundStrategy.html
[ignore-layers]: https://annoraaq.github.io/grid-engine/api/interfaces/PathfindingOptions.html#ignoreLayers
[move-to-ignore-layers]: https://annoraaq.github.io/grid-engine/api/interfaces/MoveToConfig.html#ignoreLayers
[follow-ignore-layers]: https://annoraaq.github.io/grid-engine/api/interfaces/FollowOptions.html#ignoreLayers
