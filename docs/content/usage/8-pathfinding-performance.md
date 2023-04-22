---
title: Pathfinding Performance
---

import Plot from '~/components/Plot.vue'
import bg512PlotData from '~/data/bg512-avg-4-dir.csv';
import daoPlotData from '~/data/dao-avg-4-dir.csv';
import roomsPlotData from '~/data/rooms-avg-4-dir.csv';

# Pathfinding Performance

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

I would recommend JPS for most of you, because it has the best results in the benchmarks I ran (for more details on that, check out the [benchmark section](#benchmarks) below). Just keep in mind that you have the flexibility to change the algorithm to see if it works better in your case.

## Activate caching

Since version 2.28.0, Grid Engine offers the possibility to activate [cacheTileCollisions][cache-tile-collisions] tile collision cache for pathfinding. It takes advantage of the fact, that tile collisions do not change very often in many cases. Many games do have a tile map that stays more or less the same and only characters move frequently. If you need to change something, you can still update the cache locally using [rebuildTileCollisionCache][rebuild-tile-collision-cache].

If you find yourself frequently updating the cache for the whole map, you might be better off with a disabled cache (or you try to change your logic, so that you don't have to frequently update the cache in the first place).

## [PathBlockedStrategy][path-blocked-strategy] and [NoPathFoundStrategy][no-path-found-strategy]

When using [moveTo][move-to], you can determine what happens if no path was found or the path is suddenly blocked while walking it.

By default, these are set to [STOP][stop] and [WAIT][wait]. These settings are already optimal for avoiding unnecessary pathfindings. Just be aware that if you change these settings, there might be additional pathfindings that can slow down your game.

## Benchmarks

I chose [some benchmarks](https://movingai.com/benchmarks/grids.html) that are frequently used in research for pathfinding on grids. As you can see in the following plots, the results vary quite a bit depending on the benchmark. The reason is the different structure of the maps. For each benchmark I have plotted the average runtimes of the different algorithms, grouped by the path length. Because the path length can get quite large and many games only contain smaller maps, I have additionaly provided a "zoomed in" version of each plot, which shows only results for path lengths up to 100.

The absolute runtimes depend on the machine and the browser. More important are the runtimes of the algorithms relative to each other.

### All path lengths

#### Baldurs Gate

<Plot :rawPlotData="bg512PlotData" />

#### Dragon Age Origin

<Plot :rawPlotData="daoPlotData" />

#### Rooms

<Plot :rawPlotData="roomsPlotData" />

---

### Path lengths <= 100

#### Baldurs Gate

<Plot :rawPlotData="bg512PlotData.slice(0,6)" />

#### Dragon Age Origin

<Plot :rawPlotData="roomsPlotData.slice(0,6)" />

#### Rooms

<Plot :rawPlotData="daoPlotData.slice(0,6)" />

---

### Conclusion

Even though it is not the fastest in each case, JPS seems to be the best choice overall.

BFS and Bidirectional search are also giving acceptable performance. Especially in mazes without much free area, they are unbeatable (that is because there are almost no path-symmetries that JPS could leverage). It is surprising though, that Bidirectional Search seems to underperform BFS in most cases. It is probably due to its specific implementation in Grid Engine.

A\* seems to be quite good on small paths. However, it becomes unacceptably slow for large ones. So JPS seems to be superior to A\* in almost every case.

[find-shortest-path]: ../../api/interfaces/IGridEngine.html#findShortestPath
[move-to]: ../../api/interfaces/IGridEngine.html#moveTo
[follow]: ../../api/interfaces/IGridEngine.html#follow
[cache-tile-collisions]: ../../api/interfaces/GridEngineConfigHeadless.html#cacheTileCollisions
[rebuild-tile-collision-cache]: ../../api/classes/GridEngineHeadless.html#rebuildTileCollisionCache
[stop]: ../../api/enums/NoPathFoundStrategy.html#STOP
[wait]: ../../api/enums/PathBlockedStrategy.html#WAIT
[path-blocked-strategy]: ../../api/enums/PathBlockedStrategy.html
[no-path-found-strategy]: ../../api/enums/NoPathFoundStrategy.html
[ignore-layers]: ../../api/interfaces/PathfindingOptions.html#ignoreLayers
[move-to-ignore-layers]: ../../api/interfaces/MoveToConfig.html#ignoreLayers
[follow-ignore-layers]: ../../api/interfaces/FollowOptions.html#ignoreLayers
