<template>
  <div class="rotation">
    <DomRendererCore :width="width" :height="height" :tileSize="tileSize" :cells="cells" />
  </div>
</template>
<script>
import {GridEngineHeadless, ArrayTilemap} from '../grid-engine-2.41.0.esm.min.js'
import DomRendererCore from './DomRendererCore.vue';
import DomRendererLegend from './DomRendererLegend.vue';
import DomRendererControls from './DomRendererControls.vue';
import {initCellsFromMap} from '../services/gridTilemap.js';

export default {
  components: {DomRendererCore, DomRendererLegend, DomRendererControls},
  props: ['tileSize', 'map', 'loop'],
  data() {
    return {
      cells: [],
      gridEngine:undefined,
      interval:undefined,
      subscriptions: [],
      width: 0,
      height: 0,
    }
  },

  methods: {
    pause() {
      clearInterval(this.interval);
    },

    resume() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.gridEngine.update(50, 50);
      }, 50);
    },

    restart() {
      this.cells = initCellsFromMap(this.map);

      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }
      this.subscriptions = [];

      this.gridEngine.create(new ArrayTilemap({l: {data: this.map}}), {characters: [
        {
          id: 'p1',
          collides: {collisionGroups: []},
          startPosition: {x: 1, y: 1},
        },
      ]});

      for (const char of this.gridEngine.getAllCharacters()) {
        const pos = this.gridEngine.getPosition(char);
        const cellId = pos.y * this.width + pos.x;
        this.cells[cellId].character = char;
      }

      this.subscriptions.push(this.gridEngine.positionChangeStarted().subscribe(({charId, enterTile, exitTile}) => {
        const exitCellId = exitTile.y * this.width + exitTile.x;
        this.cells[exitCellId].character = undefined;
        const enterCellId = enterTile.y * this.width + enterTile.x;
        this.cells[enterCellId].character = charId;
      }));

      this.gridEngine.moveRandomly('p1',0,6);

      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.gridEngine.update(50, 50);
      }, 50);
    }
  },

  mounted() {
    this.height = this.map.length;
    this.width = this.map[0].length;
    this.gridEngine = new GridEngineHeadless();
    this.restart();
  }
}
</script>

<style scoped>

.rotation {
  transform: rotate(45deg);
}

.rotation :deep(.tile) {
  box-shadow: 1px 1px 0px 0px var(--brand-black);
}

html:not(.dark) .rotation :deep(.tile){
  box-shadow: 1px 1px 0px 0px var(--brand-medium);
}

</style>
