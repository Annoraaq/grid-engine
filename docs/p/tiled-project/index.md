---
title: Tiled Project
next: false
prev: false
---

# Tiled Project

In Tiled it is possible to define [classes on tiles](https://doc.mapeditor.org/en/stable/manual/custom-properties/#custom-types). These classes can have properties. This way you can change the properties of many tiles at once.

These classes are only available in [Tiled projects](https://doc.mapeditor.org/en/stable/manual/projects/) and not in single maps. The classes with their properties are then stored in a Tiled project file (which is in JSON format).
Grid Engine allows to provide such a Tiled project file. This is necessary if you want to use Tiled classes. The Tiled config file can be provided in the [Grid Engine config][grid-engine-config]. The simplest way to provide it is to use Phasers [LoaderPlugin](https://photonstorm.github.io/phaser3-docs/Phaser.Loader.LoaderPlugin.html#json__anchor):

```javascript
function preload() {
  // ...
  this.load.json(
    "some-tiled-project",
    "path-to/some-tiled-project.tiled-project"
  );
}
```

```javascript
function create() {
  // ...
  this.gridEngine.create(tilemap, {
    // ...
    tiledProject: this.cache.json.get("some-tiled-project"),
  });
}
```

[grid-engine-config]: https://annoraaq.github.io/grid-engine/api/interfaces/GridEngineConfig.html#tiledProject
