---
prev: false
---

<script setup>
import Pathfinding from '../../components/Pathfinding.vue';
import { data as pathfindingMapData} from '../../map.data.js'
</script>

# Introduction

## Why Grid Engine?

Grid Engine helps you position and move objects on a **2-dimensional grid** in **JavaScript/TypeScript**.
It easily integrates with [Phaser.js](https://phaser.io/) but can also be used standalone. For example you could write your own renderer for an ASCII game (see [this tutorial](/p/ascii-renderer/index.html)). You can even run it on a server with [Node.js](https://nodejs.org/).

## What is **Grid Based Movement**?

Grid Engine is the right tool for you whenever you need movement that is based on a 2-dimensional square grid (like a chess board). Example games would be chess, several puzzle games or RPGs like old titles from the Pokémon games series. These games have in common that a game object is eventually (there might be a transition phase) positioned on exactly one of the grids squares and not inbetween them. That being said, Grid Engine also allows for game objects to span multiple fields on the grid, but the concept stays the same.

Here is an example for grid based movement in a phaser top-down game:

<img
    src="https://github.com/Annoraaq/grid-engine/raw/master/images/radius-movement-demo.gif"
    width="400"
    style="image-rendering: pixelated; display: inline"
  />

As you can see, the characters only stop in the center of a tile and never inbetween two tiles. The transition/movement between two positions is only an animation. That means that the positioning is not pixel based but grid (or tile) based.

Another example is this pathfinding demonstration that moves an object through the grid on a shortest path. We used GridEngine along with Vue.js as a renderer to show the css grid:

<Pathfinding :tileSize="10" :map="pathfindingMapData" :loop="true"/>

## Terminology

### Tile and Tile Position

We are referring to the squares/fields of the grid as **tiles**. A **tile position** denotes the position of a game object on the grid. **Position** alone is ambiguous because it depends on the context. For example could it refer to a tile position or a pixel position or some other type of position.

### Characters

All game objects in Grid Engine are called **characters**. These include actual game characters that can move around (including the player). But it also includes items or motionless objects that block the way or that the player can interact with. We also refer to these as **grid objects** here to make the term more generic.

### Renderers

A **renderer** is a piece of software that vizualizes the logic of Grid Engine. Grid Engine ships with a [Phaser.js](https://phaser.io/) renderer in shape of a [Phaser.js](https://phaser.io/) plugin.
That makes it easy to integrate the grid logic of Grid Engine with your [Phaser.js](https://phaser.io/) game. However, a renderer can come in many shapes. There could be a renderer for the terminal that prints the grid as ASCII characters (see [this tutorial](/p/ascii-renderer/index.html)). Or there could be a [Three.js](https://threejs.org/) renderer that renders a 3D representation of the grid.

You can also run Grid Engine without any renderer at all using headless mode. That can be useful on the server or if a visual representation of the grid is just not relevant for your use case.

## How Can Grid Engine Help me With Grid Based Movement?

Grid Engine can do a lot of things but some prominent use cases are:

- Simple positioning and movement of grid objects
- Smooth position transition animations
- Move to a position on a shortest path
- Automatic movement of grid objects (random movement, grid objects follow other grid objects)

## When Should I Not Use Grid Engine?

If you have a non-square grid, you should not use Grid Engine. Isometric maps are fine, though. It is not about the shape of a tile but more about their arrangement. Each tile should have 4 or 8 neighbors (depending on whether you include diagonal neighbors or not).

## Can I Use Grid Engine With 3D Grids?

It is possible for your grid to have several layers. However, using layers to represent a fully fledged 3D grid might be cumbersome. So it depends a bit on your use case. Just keep in mind that this was not the main focus when designing Grid Engine.
