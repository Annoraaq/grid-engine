
<template>

<div class="container">
  <div class="items">
    <div class="item grid-4">
      <div class="feature">
        <div class="info">
          <div class="images">
            <img class="dark" src="../img/icons/minor_crash_white_24dp.svg" alt="">
            <img class="light" src="../img/icons/minor_crash_black_24dp.svg" alt="">
            <Collision :tileSize="10" :map="collisionMapData" :loop="true"/>
          </div>
          <h2 class="title">Collision Detection</h2>
          <p class="details">Detect tile based collisions with the map and other objects, supporting collision groups and multiple layers.</p>
        </div>
      </div>
    </div>
    <div class="item grid-4">
      <div class="feature">
        <div class="info">
          <div class="images">
            <img class="dark" src="../img/icons/route_white_24dp.svg" alt="">
            <img class="light" src="../img/icons/route_black_24dp.svg" alt="">
            <Pathfinding :tileSize="10" :map="pathfindingMapData" :loop="true"/>
          </div>
          <h2 class="title">Pathfinding</h2>
          <p class="details">Efficient and configurable pathfinding allows moving to a target position or following other objects.</p>
        </div>
      </div>
    </div>
    <div class="item grid-4">
      <div class="feature">
        <div class="info">
          <div class="images">
            <img class="dark" src="../img/icons/grid_view_white_24dp.svg" alt="">
            <img class="light" src="../img/icons/grid_view_black_24dp.svg" alt="">
            <MultiTile :tileSize="10" :map="collisionMapData" :loop="true"/>
          </div>
          <h2 class="title">Multi-tile Objects</h2>
          <p class="details">Allow objects to span multiple tiles on your grid.</p>
        </div>
      </div>
    </div>
    <div class="item grid-4">
      <div class="feature">
        <div class="info">
          <div class="images">
            <img class="dark" src="../img/icons/layers_white_24dp.svg" alt="">
            <img class="light" src="../img/icons/layers_black_24dp.svg" alt="">
            <Isometric :tileSize="10" :map="collisionMapData" :loop="true"/>
          </div>
          <h2 class="title">Isometric Maps</h2>
          <p class="details">Choose between isometric and orthogonal maps.</p>
        </div>
      </div>
    </div>
    <div class="item grid-4">
      <div class="feature">
        <div class="info">
          <div class="images">
            <img class="dark" src="../img/icons/signpost_white_24dp.svg" alt="">
            <img class="light" src="../img/icons/signpost_black_24dp.svg" alt="">
            <Diagonal :tileSize="10" :map="collisionMapData" :loop="true"/>
          </div>
          <h2 class="title">Diagonal Movement</h2>
          <p class="details">Four and eight direction movement and pathfinding is supported.</p>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>

import Collision from './Collision.vue';
import Pathfinding from './Pathfinding.vue';
import MultiTile from './MultiTile.vue';
import Isometric from './Isometric.vue';
import Diagonal from './Diagonal.vue';
import { data as collisionMapData} from '../collisionmap.data.js'
import { data as pathfindingMapData} from '../map.data.js'

export default {
  components: {Collision, Pathfinding, MultiTile, Isometric, Diagonal},
  data() {
    return {
      collisionMapData,
      pathfindingMapData,
    }
  },
}
</script>

<style scoped>


.container {
  margin: 0 auto;
  max-width: 1152px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
  width: 100%;
}

@media (min-width: 640px) {
  .item.grid-4{
      width: calc(100% / 2);
  }
}

@media (min-width: 768px) {
  .item.grid-4 {
    width: calc(100% / 2);
  }
}

@media (min-width: 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}

.images {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.info {
  width: 220px;
  display: flex;
  flex-direction: column;
}

.dark .feature .light {
  display: none;
}

html:not(.dark) .feature .dark {
  display: none;
}

.feature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
  padding: 24px;


  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.feature img {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;

}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
