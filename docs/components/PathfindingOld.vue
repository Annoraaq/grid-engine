<template>
  <div class="wrapper">
    <div
      class="container"
      :style="{
        gridTemplateColumns: 'repeat(' + height + ', auto)',
          rowGap: Math.floor(tileSize/3) +'px',
          columnGap: Math.floor(tileSize/3)+ 'px'
        }"
    >
      <div
        class="tile"
        :class="{
          bright: cell.character != undefined,
          marked: cell.marked && !cell.character,
          target: cell.target && !cell.character,
          blocked: cell.blocked,
          }"
        v-for="cell in cells"
        :style="{
          width: tileSize + 'px',
          height: tileSize + 'px',
          borderRadius: Math.floor(tileSize/4) + 'px',
          }"
      >
      </div>
    </div>
  </div>
    <div class="buttons" v-if="showControls">
      <button class="VPButton brand medium" @click="restart">Restart</button>
      <button class="VPButton alt medium" @click="stopResume">{{ stopped ? 'Resume' : 'Pause'}}</button>
    </div>

    <div class="legend" v-if="showLegend">
      <div class="item">
        <div class="tile"
          :style="{
            width: tileSize + 'px',
            height: tileSize + 'px',
            borderRadius: Math.floor(tileSize/4) + 'px',
            }"
        ></div>Free
      </div>
      <div class="item">
        <div class="tile blocked"
          :style="{
            width: tileSize + 'px',
            height: tileSize + 'px',
            borderRadius: Math.floor(tileSize/4) + 'px',
            }"
        ></div>Blocked
      </div>
      <div class="item">
        <div class="tile marked"
          :style="{
            width: tileSize + 'px',
            height: tileSize + 'px',
            borderRadius: Math.floor(tileSize/4) + 'px',
            }"
        ></div>Visited
      </div>
      <div class="item">
        <div class="tile target"
          :style="{
            width: tileSize + 'px',
            height: tileSize + 'px',
            borderRadius: Math.floor(tileSize/4) + 'px',
            }"
        ></div>Target position
      </div>
      <div class="item">
        <div class="tile bright"
          :style="{
            width: tileSize + 'px',
            height: tileSize + 'px',
            borderRadius: Math.floor(tileSize/4) + 'px',
            }"
        ></div>Character
      </div>
    </div>



</template>
<script>
import {GridEngineHeadless} from '../grid-engine-2.30.0.esm.min.js'

export default {
  props: ['tileSize', 'map', 'showLegend', 'showControls', 'loop'],
  data() {
    return {
      cells: [],
      gridEngine:undefined,
      interval:undefined,
      positionChangeStartedSubscription: undefined,
      positionChangeFinishedSubscription: undefined,
      moveToSubscription: undefined,
      stopped: false,
      widht: 0,
      height: 0,
    }
  },

  methods: {

    stopResume() {
      if (!this.stopped) {
        clearInterval(this.interval);
        this.stopped = true;
      } else {
        this.interval = setInterval(() => {
          this.gridEngine.update(50, 50);
        }, 50);
        this.stopped = false;
      }
    },

    restart() {
      this.cells = [];
      const map = this.map;
      const grid = [];

      if (this.positionChangeStartedSubscription) {
        this.positionChangeStartedSubscription.unsubscribe();
      }
      if (this.positionChangeFinishedSubscription) {
        this.positionChangeFinishedSubscription.unsubscribe();
      }
      if (this.moveToSubscription) {
        this.moveToSubscription.unsubscribe();
      }
      for (let r=0; r<this.height; r++) {
        const row = [];
        for (let c=0; c<this.width; c++) {
          const tile =  {
            hasProperty(name) {
              return name === 'ge_collide';
            },
            getProperty(name) {
              return name === 'ge_collide' && map[r][c] === 1;
            },
          };
          const cell = {
            character: undefined,
            marked: false,
            target: false,
            blocked: this.map[r][c] === 1,
          };
          row.push(tile)
          this.cells.push(cell)
        }
        grid.push(row);
      }


      const width = this.width;
      const height = this.height;

      const tilemap = {
        getWidth() {return width;},
        getHeight() {return height;},
        getOrientation() {return 'orthogonal';},
        getOrientation() {return 'orthogonal';},
        getLayers() {
          return [{
            getName() {return 'tile-layer';},
            getProperty() {return undefined;},
            hasProperty() {return false;},
            getData() {return grid;},
            isCharLayer() {return false;}
          }];
        },
        hasTileAt(x, y) {
          if (x < 0 || y < 0) return false;
          if (x >= width || y >= height) return false;
          return true;
        },
        getTileAt(x,y) {return grid[y][x];},
      }
      this.gridEngine.create(tilemap, {characters: [
        {
          id: 'player',
        },
        // {
        //   id: 'npc',
        //   speed: 1,
        //   startPosition: {x: 5, y: 5},
        // },
      ]});

      for (const char of this.gridEngine.getAllCharacters()) {
        const pos = this.gridEngine.getPosition(char);

        const cellId = pos.y * this.width + pos.x;
        this.cells[cellId].character = char;
      }

      this.positionChangeStartedSubscription = this.gridEngine.positionChangeStarted().subscribe(({charId, enterTile, exitTile}) => {
        const enterCellId = enterTile.y * this.width + enterTile.x;
        const exitCellId = exitTile.y * this.width + exitTile.x;
        this.cells[exitCellId].character = undefined;
        this.cells[enterCellId].character = charId;
      });

      this.positionChangeFinishedSubscription = this.gridEngine.positionChangeFinished().subscribe(({charId, enterTile, exitTile}) => {
        const enterCellId = enterTile.y * this.width + enterTile.x;
        this.cells[enterCellId].marked = true;
      });

      // this.gridEngine.moveRandomly("npc")

      const target = {x: 7, y: 7};
      this.subecriptions.push(this.gridEngine.moveTo('player', target).subscribe(() => {
        if (this.loop) {
          this.restart();
        }
      }));
        const targetCellId = target.y * this.width + target.x;
      this.cells[targetCellId].target = true;


      if (this.stopped) {
        this.interval = setInterval(() => {
          this.gridEngine.update(50, 50);
        }, 50);
        this.stopped = false;

      }

    }

  },


  mounted() {
    this.height = this.map.length;
    this.width = this.map[0].length;
    this.gridEngine = new GridEngineHeadless();
    this.restart();

    this.interval = setInterval(() => {
      this.gridEngine.update(50, 50);
    }, 50)


    // for (const pos of this.gridEngine.getMovement('player').state.pathAhead) {
    //   const cellId = pos.position.y * this.width + pos.position.x;
    //   this.cells[cellId].marked = true;
    // }
  }
}
</script>

<style scoped>
  a.logo-link {
    text-decoration: none;
  }

  .wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
  }

  .container {
    display: grid;
    column-gap: 15px;
    row-gap: 20px;
    padding-bottom: 8px;
  }

  .legend {
    display: flex;
    flex-direction: row;
    gap: 12px;
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
  }

  .tile {
    background-color: var(--brand-dark);
    /* border: 1px solid var(--brand-dark); */
    border-color: var(--brand-dark);
    box-shadow: 0px 1px 1px 0px var(--brand-black);
    width: 72px;
    height: 64px;
    text-align: center;
    border-radius: 16px;
    background-size: 150% 150%;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .noanim {
    animation-name: none;
  }

  @keyframes twinkle {
    0%   {background-color: var(--brand-medium);}
    50%  {background-color: var(--brand-light);}
    100% {background-color: var(--brand-medium);}
  }

  .bright {
    background: var(--brand-light);
    animation: none;
  }

  .light {
    background-color: var(--brand-medium-bright);
    opacity: 0.2;
  }

  .marked {
    background-color: var(--brand-medium);
  }

  .target {
    background-color: var(--brand-medium);
  }

  .blocked {
    background: repeating-linear-gradient(
      45deg,
      #D8E9A8,
      #D8E9A8 3px,
      #191A19 3px,
      #191A19 8px
    );
  }

  .target {
    background: repeating-radial-gradient(
      circle,
      #D8E9A8,
      #D8E9A8 4px,
      #1E5128 4px,
      #1E5128 20px
    );
  }

  .hide {
    animation-name: none;
    opacity: 0;
  }



  .VPButton {
    display: inline-block;
    border: 1px solid transparent;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  }

  .VPButton.medium {
    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;
    font-size: 14px;
  }
  .VPButton.brand {
  border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
  }

  .VPButton.brand:hover {
    border-color: var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
  }

  .VPButton.alt {
    border-color: var(--vp-button-alt-border);
    color: var(--vp-button-alt-text);
    background-color: var(--vp-button-alt-bg);
  }

  .VPButton.alt:hover {
    border-color: var(--vp-button-alt-hover-border);
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
  }


  .buttons {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }

</style>
