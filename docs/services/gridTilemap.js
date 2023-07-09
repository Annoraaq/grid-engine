export function createGridTilemap(map) {
  const grid = [];
  const height = map.length;
  const width = map[0].length;

  for (let r = 0; r < height; r++) {
    const row = [];
    for (let c = 0; c < width; c++) {
      const tile = {
        hasProperty(name) {
          return name === 'ge_collide';
        },
        getProperty(name) {
          return name === 'ge_collide' && map[r][c] === 1;
        },
      };
      row.push(tile)
    }
    grid.push(row);
  }

  const tilemap = {
    getWidth() { return width; },
    getHeight() { return height; },
    getOrientation() { return 'orthogonal'; },
    getOrientation() { return 'orthogonal'; },
    getLayers() {
      return [{
        getName() { return 'tile-layer'; },
        getProperty() { return undefined; },
        hasProperty() { return false; },
        getData() { return grid; },
        isCharLayer() { return false; }
      }];
    },
    hasTileAt(x, y) {
      if (x < 0 || y < 0) return false;
      if (x >= width || y >= height) return false;
      return true;
    },
    getTileAt(x, y) { return grid[y][x]; },
  }

  return tilemap;
}

export function initCellsFromMap(map) {
  const cells = [];
  const height = map.length;
  const width = map[0].length;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const cell = {
        character: undefined,
        marked: false,
        target: false,
        blocked: map[r][c] === 1,
      };
      cells.push(cell)
    }
  }

  return cells;
}
