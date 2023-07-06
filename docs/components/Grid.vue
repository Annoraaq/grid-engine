<template>
  <div class="wrapper">
    <div class="container">
      <div class="tile light noanim"></div>
      <div class="tile"></div>
      <div class="tile light noanim"></div>
      <div class="tile"></div>
      <div class="tile bright noanim"></div>
      <div class="tile"></div>
      <div class="tile light noanim"></div>
      <div class="tile"></div>
      <div class="tile light noanim"></div>
    </div>
  </div>
</template>

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
    grid-template-columns: auto auto auto;
    padding-bottom: 8px;
  }

  .tile {
    background: linear-gradient( 120deg, #D8E9A8 30%, #1E5128 );
    width: 72px;
    height: 64px;
    text-align: center;
    border-radius: 16px;

    -webkit-box-shadow: 0px 12px 0px 0px var(--brand-dark);
    box-shadow: 0px 12px 0px 0px var(--brand-dark);
    animation: gradient 4s ease infinite;
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

  .hide {
    animation-name: none;
    opacity: 0;
  }
</style>
