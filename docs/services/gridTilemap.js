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
