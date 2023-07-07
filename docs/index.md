---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Grid Engine"
  text: "Add grid movement to your game"
  tagline: Use with Phaser.js or standalone
  actions:
    - theme: brand
      text: Get Started
      link: /p/installation/index.html
    - theme: alt
      text: API Reference
      link: https://annoraaq.github.io/grid-engine/api

features:
  - icon:
      light: "icons/minor_crash_black_24dp.svg"
      dark: "icons/minor_crash_white_24dp.svg"
    title: Collision Detection
    details: Detect tile based collisions with the map and other objects, supporting collision groups and multiple layers.
  - icon:
      light: "icons/route_black_24dp.svg"
      dark: "icons/route_white_24dp.svg"
    title: Pathfinding
    details: Efficient and configurable pathfinding allows moving to a target position or following other characters.
  - icon:
      light: "icons/grid_view_black_24dp.svg"
      dark: "icons/grid_view_white_24dp.svg"
    title: Multi-tile Characters
    details: Allow characters to span multiple tiles on your grid.
  - icon:
      light: "icons/layers_black_24dp.svg"
      dark: "icons/layers_white_24dp.svg"
    title: Isometric Maps
    details: Chose between isometric and orthogonal maps.
  - icon:
      light: "icons/signpost_black_24dp.svg"
      dark: "icons/signpost_white_24dp.svg"
    title: Diagonal Movement
    details: Four and eight direction movement and pathfinding is supported.
---
