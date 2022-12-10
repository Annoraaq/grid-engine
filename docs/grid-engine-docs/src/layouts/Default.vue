<template>
  <div class="layout">

    <header class="header">
      <div class="header-content">
        <g-link to="/" class="logo-link">
          <Logo />
        </g-link>
        <nav class="nav">
          <g-link class="nav__link" to="https://github.com/Annoraaq/grid-engine" title="GitHub">
            <i class="fa-brands fa-github" aria-hidden="true"></i>
          </g-link>
          <g-link class="nav__link" to="https://discord.gg/PEg2Y3qD" title="Discord">
            <i class="fa-brands fa-discord" aria-hidden="true"></i>
          </g-link>
        </nav>
      </div>
    </header>
    <div class="main">
      <aside class="sidebar">
        <Navigation />
      </aside>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Navigation,
    Logo
  }
}
</script>


<style>
:root{
  --dark-bg: #1d1d1d;
  --dark-font: #dcdcdc;

  --dark-font-medium: #b4b4b4;
  --dark-font-bright: #ffffff;

  --brand-light: #D8E9A8;
  --brand-medium: #4E9F3D;
  --brand-medium-bright: #9ae78b;
  --brand-dark: #1E5128;
  --brand-black: #191A19;
  color-scheme: dark;

  --font-size-title: 38px;
  --font-size-large: 24px;
  --font-size-medium: 16px;
  --font-size-small: 8px;
}
body {
  background: var(--dark-bg);
  font-family: Inter,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color: var(--dark-font);
  margin:0;
  padding:0;
  line-height: 1.5;
}

h1 {
  font-size: 38px;
  line-height: 1.4;
  font-weight: 600;
}

a {
  text-decoration: none;
  color: var(--brand-medium);
  transition: color 0.4s;
}

a:hover {
  color: var(--brand-medium-bright);
}


.header {
  background: var(--dark-bg);
  height: 85px;
  position: fixed;
  top: 0;
  width: 100%;

  border-bottom: 1px solid #383838;
}

.header-content {
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.main {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  padding-top: 85px;
}

.content {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 250px;
  width: 100%;

}

.sidebar {
  width: 250px;
  height: 100%;
  position: fixed;
  overflow: scroll;
}

.nav__link {
  color: var(--dark-font-medium);
  margin-left: 20px;
}

.nav__link:hover {
  color: var(--dark-font-bright);
}

a.nav__link i {
  font-size: 32px;
}

a.logo-link {
  text-decoration: none;
}

</style>

