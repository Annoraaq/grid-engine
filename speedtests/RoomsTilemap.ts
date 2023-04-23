import { Tilemap, Orientation, TileLayer, Tile } from "../src/GridEngine";
const fs = require("fs");
const CHAR_LAYER_PROP_NAME = "ge_charLayer";
const MIN_CHAR_CODE = "z".charCodeAt(0) + 1;
const MAX_CHAR_CODE = MIN_CHAR_CODE + 255;

export class RoomsTilemap implements Tilemap {
  private height = 0;
  private width = 0;
  private layers: TileLayer[];
  private layersByName: Map<string, TileLayer> = new Map();
  constructor(path: string | string[]) {
    this.layers = [];
    this.layersByName = new Map();
    if (Array.isArray(path)) {
      path.forEach((p) => this.addLayer(p));
    } else {
      this.addLayer(path);
    }
  }

  private addLayer(path: string) {
    const lastPartArr = path.split("/")[path.split("/").length - 1].split(".");
    const layerName = lastPartArr[0];
    try {
      const rawData = fs.readFileSync(path, "utf8");
      const rows = rawData.split("\n");
      this.height = Number(rows[1].split(" ")[1]);
      this.width = Number(rows[2].split(" ")[1]);
      const layer = new RoomsTileLayer(rows.slice(4), layerName);
      this.layers.push(layer);
      this.layersByName.set(layerName, layer);
    } catch (err) {
      console.error(err);
    }
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getOrientation(): Orientation {
    return "orthogonal";
  }
  getLayers(): TileLayer[] {
    return this.layers;
  }
  hasTileAt(x: number, y: number, layer?: string): boolean {
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;
    return true;
  }
  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    if (x < 0 || x >= this.width) return undefined;
    if (y < 0 || y >= this.height) return undefined;
    if (!layer) return this.layers[0].getData()[y][x];
    return this.layersByName.get(layer)?.getData()[y][x];
  }
}

class RoomsTileLayer implements TileLayer {
  private data: Array<Array<Tile | undefined>> = [];
  constructor(rows: string[], private name: string) {
    for (const row of rows) {
      const rowArr: Tile[] = [];
      for (let c = 0; c < row.length; c++) {
        rowArr.push(new RoomsTile(row[c]));
      }
      this.data.push(rowArr);
    }
  }
  getName(): string {
    return this.name;
  }

  getProperty(name: string): string | undefined {
    if (name === CHAR_LAYER_PROP_NAME) {
      return this.name;
    }
  }
  hasProperty(name: string): boolean {
    return false;
  }

  getData() {
    return this.data;
  }

  isCharLayer() {
    return true;
  }
}

type CollisionArr = [
  boolean, // all
  boolean, // up
  boolean, // down
  boolean, // left
  boolean, // right
  boolean, // up-left
  boolean, // up-right
  boolean, // down-left
  boolean // down-right
];

class RoomsTile implements Tile {
  private c: CollisionArr = [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  constructor(c: string) {
    if (c === ".") {
      this.c[0] = false;
    } else if (
      c.charCodeAt(0) >= MIN_CHAR_CODE &&
      c.charCodeAt(0) <= MAX_CHAR_CODE
    ) {
      this.c = charToArr(c);
    }
  }

  getProperty(name: string): any {
    switch (name) {
      case "ge_collide":
        return this.c[0];
      case "ge_collide_up":
        return this.c[1];
      case "ge_collide_down":
        return this.c[2];
      case "ge_collide_left":
        return this.c[3];
      case "ge_collide_right":
        return this.c[4];
      case "ge_collide_up-left":
        return this.c[5];
      case "ge_collide_up-right":
        return this.c[6];
      case "ge_collide_down-left":
        return this.c[7];
      case "ge_collide_down-right":
        return this.c[8];
    }
    return undefined;
  }
  hasProperty(name: string): boolean {
    if (name.startsWith("ge_collide")) {
      return true;
    }
    return false;
  }
}

function charToArr(char: string): CollisionArr {
  const arr: CollisionArr = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const cnt = char.charCodeAt(0) - MIN_CHAR_CODE;
  for (let i = 0; i < 8; i++) {
    arr[i + 1] = !!(cnt & (1 << i));
  }
  return arr;
}
