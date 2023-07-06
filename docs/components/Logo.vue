<template>
  <div class="wrapper">
    <div class="container">
      <div class="tile hide"></div>
      <div class="tile tile1"></div>
      <div class="tile tile2"></div>
      <div class="tile bright"></div>
      <div class="tile hide"></div>
      <div class="tile tile3"></div>
    </div>
    <div class="text">
      GRID ENGINE
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
  }

  .text {
    font-family: 'Saira';
    color: var(--brand-medium);
    font-size: 22px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-left: 7px;
    text-decoration: none;
  }
  .dark .text {
    color: var(--brand-light);
  }

  .container {
    display: grid;
    column-gap: 5px;
    row-gap: 8px;
    grid-template-columns: auto auto;
    padding-bottom: 2px;
  }

  .tile {
    background-color: var(--brand-medium);
    width: 18px;
    height: 16px;
    text-align: center;
    border-radius: 4px;

    -webkit-box-shadow: 0px 3px 0px 0px var(--brand-dark);
    box-shadow: 0px 3px 0px 0px var(--brand-dark);

    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-delay: 3s;
    transition: opacity 1s, background-color 1s;
  }

  .tile:hover {
    background-color: var(--brand-light);
    opacity: 1;
    animation-name: none;
  }

  .tile1 {
    animation-delay: 1s;
  }
  .tile2 {
    animation-delay: 2s;
  }
  .tile3 {
    animation-delay: 3s;
  }
  @keyframes twinkle {
    0%   {background-color: var(--brand-light);}
    50%  {background-color: white;}
    100% {background-color: var(--brand-light);}
  }

  .bright {
    background-color: var(--brand-light);
  }

  .hide {
    animation-name: none;
    opacity: 0;
  }
</style>
