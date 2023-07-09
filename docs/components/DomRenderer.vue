<template>
  <DomRendererCore :width="width" :height="height" :tileSize="tileSize" :cells="cells" />
  <DomRendererControls v-if="showControls" @restart="restart" @resume="resume" @pause="pause"/>
  <DomRendererLegend v-if="showLegend" :tileSize="tileSize"/>
</template>
<script>
import {GridEngineHeadless} from '../grid-engine-2.30.0.esm.min.js'
import DomRendererCore from './DomRendererCore.vue';
import DomRendererLegend from './DomRendererLegend.vue';
import DomRendererControls from './DomRendererControls.vue';
import { createGridTilemap, initCellsFromMap} from '../services/gridTilemap.js';

export default {
  components: {DomRendererCore, DomRendererLegend, DomRendererControls},
  props: ['tileSize', 'map', 'showLegend', 'showControls', 'loop'],
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

      this.gridEngine.create(createGridTilemap(this.map), {characters: [
        {
          id: 'p1',
          collides: {collisionGroups: []},
          startPosition: {x: 0, y: 3},
        },
        {
          id: 'p2',
          collides: {collisionGroups: []},
          startPosition: {x: 6, y: 3},
        },
      ]});

      for (const char of this.gridEngine.getAllCharacters()) {
        const pos = this.gridEngine.getPosition(char);

        const cellId = pos.y * this.width + pos.x;
        this.cells[cellId].character = char;
      }

      this.subscriptions.push(this.gridEngine.positionChangeStarted().subscribe(({charId, enterTile, exitTile}) => {
        const enterCellId = enterTile.y * this.width + enterTile.x;
        const exitCellId = exitTile.y * this.width + exitTile.x;
        this.cells[exitCellId].character = undefined;
        this.cells[exitCellId].marked = true;
        this.cells[enterCellId].character = charId;
      }));

      const target = {x: 3, y: 3};
      this.subscriptions.push(
      this.gridEngine.moveTo('p1', target).subscribe((a) => {
        setTimeout(() => {this.restart();}, 1000);
      }));
      this.gridEngine.moveTo('p2', target);

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


    // for (const pos of this.gridEngine.getMovement('player').state.pathAhead) {
    //   const cellId = pos.position.y * this.width + pos.position.x;
    //   this.cells[cellId].marked = true;
    // }
  }
}
</script>

<style scoped>
</style>
