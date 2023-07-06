<script setup>
import Logo from '../../components/Logo.vue';
</script>

# Why Grid Engine?

Grid Engine helps you position and move objects on a **2-dimensional grid** in your **JavaScript/TypeScript** game.
It easily integrates with [Phaser.js](https://phaser.io/) but can also be used standalone. You can even run it on a server with [Node.js](https://nodejs.org/).

## What is **Grid Based Movement**?

Your objects are positioned on a 2-dimensional game board and they can move between fields, but never stop inbetween.
A simple example for this is Chess and many more board games. But also many older games from the Pokémon series implement this kind of movement.
It is also very famous in games from the puzzle genre.

Here is an example for grid based movement:

<img
    src="https://github.com/Annoraaq/grid-engine/raw/master/images/radius-movement-demo.gif"
    width="400"
    style="image-rendering: pixelated; display: inline"
  />

As you can see, the characters only stop in the center of a tile and never inbetween two tiles. The transition/movement between two positions is only an animation. That means that the positioning is not pixel based but grid (or tile) based.

## How can Grid Engine help me with grid based movement?

- Simple positioning
- Smooth movement animation
- Pathfinding
- 4 and 8 directions
- compatible with isometric
- automated movements

## Limitations

- non-square grids

[label](../../../docsOLD/src/components/Logo.vue)

<Logo />
