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
</template>
<script>
export default {
  props: ['width', 'height', 'tileSize', 'cells'],
}
</script>

<style scoped>

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
      #D8E9A8 2px,
      #191A19 2px,
      #191A19 4px
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

  html:not(.dark) .tile {
    background-color: var(--brand-medium-bright);
    border-color: var(--brand-medium-bright);
    box-shadow: 0px 1px 1px 0px var(--brand-medium);
  }

  html:not(.dark) .bright {
    background-color: var(--brand-dark);
  }

  html:not(.dark) .marked {
    background-color: var(--brand-medium);
  }

  html:not(.dark) .blocked {
    background: repeating-linear-gradient(
      45deg,
      #9ae78b,
      #9ae78b 2px,
      #191A19 2px,
      #191A19 4px
    );
  }

  html:not(.dark) .target {
    background: repeating-radial-gradient(
      circle,
      #191A19,
      #191A19 4px,
      #9ae78b 4px,
      #9ae78b 20px
    );
  }

</style>
