
<template>
  <div class="legend">
    <div class="item">
      <div class="tile"
        :style="tileStyle"
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
        :style="tileStyle"
      ></div>Visited
    </div>
    <div class="item">
      <div class="tile target"
        :style="tileStyle"
      ></div>Target position
    </div>
    <div class="item">
      <div class="tile bright"
        :style="tileStyle"
      ></div>Character
    </div>
  </div>
</template>
<script>

export default {
  props: ['tileSize'],
  computed: {
    tileStyle() {
      return {
        width: this.tileSize + 'px',
        height: this.tileSize + 'px',
        borderRadius: Math.floor(this.tileSize/4) + 'px',
      };
    }
  }
}
</script>

<style scoped>
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
    border-color: var(--brand-dark);
    box-shadow: 0px 1px 1px 0px var(--brand-black);
    width: 72px;
    height: 64px;
    text-align: center;
    border-radius: 16px;
    background-size: 150% 150%;
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

</style>
