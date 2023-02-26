<template>
  <div class="layout">

    <header class="header">
      <div class="header-content">
        <g-link to="/" class="logo-link">
          <Logo />
        </g-link>
        <input class="top-menu" type="checkbox" id="top-menu"/>
        <label class="hamb" for="top-menu"><span class="hamb-line"></span></label>
        <nav class="nav">
          <a href="https://annoraaq.github.io/grid-engine/api/" class="nav__link">
            API
          </a>
          <g-link class="nav__link" to="https://github.com/zewa666/grid-engine-devtools">
            Dev Tools Plugin
          </g-link>
          <g-link class="nav__link" to="https://github.com/Annoraaq/grid-engine" title="GitHub">
            <span class="icon-text"><span class="resp-hint">GitHub</span><i class="fa-brands fa-github" aria-hidden="true"></i></span>
          </g-link>
          <g-link class="nav__link" to="https://discord.gg/C4jNEZJECs" title="Discord">
            <span class="icon-text"><span class="resp-hint">Discord</span><i class="fa-brands fa-discord" aria-hidden="true"></i></span>
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
  color-scheme: dark;
  --dark-bg: #1d1d1d;
  --dark-bg-2: #484848;
  --dark-bg-3: #262626;
  --dark-font: #cacaca;

  --dark-font-bright: #ffffff;
  --dark-font-medium: #b4b4b4;
  --dark-font-dark: #7b7b7b;

  --brand-light: #D8E9A8;
  --brand-medium: #4E9F3D;
  --brand-medium-bright: #9ae78b;
  --brand-dark: #1E5128;
  --brand-black: #191A19;

  --font-size-title: 38px;
  --font-size-large: 24px;
  --font-size-medium: 16px;
  --font-size-small: 12px;


  --nav-width: 250px;
  --header-height: 85px;
  --page-max-width: 1000px;

  --code-font-size-medium: 14px;

  --font-family-mono: Menlo, Monaco, Consolas, "Courier New", monospace;

  --padding-micro: 4px;
  --padding-small: 8px;
  --padding-medium: 16px;
  --padding-large: 32px;
}

body {
  background: var(--dark-bg);
  font-family: Inter,-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color: var(--dark-font);
  margin:0;
  padding:0;
  line-height: 1.5;
  overflow-y: scroll; /* Show scrollbar */
  font-size: var(--font-size-medium);
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
  transition-timing-function: cubic-bezier(0.0, 1.0, 1.0, 1.0);
}

a:hover {
  color: var(--brand-medium-bright);
}


.header {
  background: var(--dark-bg);
  height: var(--header-height);
  position: fixed;
  top: 0;
  width: 100%;

  border-bottom: 1px solid #383838;
}

.header-content {
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  max-width: var(--page-max-width);
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.main {
  margin: 0 auto;
  max-width: var(--page-max-width);
  display: flex;
  flex-direction: row;
  padding-top: var(--header-height);
}

.content {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: var(--nav-width);
  width: calc(var(--page-max-width) - var(--nav-width));
}

.sidebar {
  width: var(--nav-width);
  height: 100%;
  position: fixed;
  overflow: auto;
  border-right: 1px solid var(--dark-bg-2);
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

.autolink {
  position: relative;
  width: 0px;
  left: -1.5em;
  color: var(--dark-font-dark);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
}

.autolink:hover {
  color: var(--dark-font-medium);
}

h1:hover .autolink,
h2:hover .autolink,
h3:hover .autolink,
h4:hover .autolink,
h5:hover .autolink,
h6:hover .autolink {
  /*
   * Only show the header link icon on hover.
   */
  opacity: 1;
}

.md-content {
  /*
   * This is making space for the header link icon. So it must be enough for an
   * h1.
   */
  padding-left: calc(1.2 * var(--font-size-title));
}

code {
  font-family: var(--font-family-mono);
  font-size: var(--code-font-size-medium);
  background: var(--dark-bg-2);
  background: var(--dark-bg-2);
  color: var(--brand-light);
  border-radius: 5px;
  padding: 3px 6px;
}

code.language-jsx {
  padding: 0;
}

code[class*="language-"], pre[class*="language-"] {
  font-family: var(--font-family-mono);
}
.main img {
  max-width: 700px;
}

table {
  border-collapse: collapse;

}
table td,
table th{
  padding: var(--padding-small);
  border: 1px solid var(--dark-bg-2);
  vertical-align: top;
}

.nav a .resp-hint {
  display: none;
}

.hamb {
    cursor: pointer;
    float: right;
    padding: 40px 20px;
    display: none;
}

.hamb-line {
    background: #fff;
    display: block;
    height: 2px;
    position: relative;
    width: 24px;
}

.hamb-line::before,
.hamb-line::after {
    background: #fff;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    transition: all .2s ease-out;
    width: 100%;
}
.hamb-line::before {
    top: 5px;
}
.hamb-line::after {
    top: -5px;
}

.top-menu {
    display: none;
}

.top-menu:checked ~ nav {
    display: block;
}
.top-menu:checked ~ .hamb .hamb-line {
    background: transparent;
}
.top-menu:checked ~ .hamb .hamb-line::before {
    transform: rotate(-45deg);
    top:0;
}
.top-menu:checked ~ .hamb .hamb-line::after {
    transform: rotate(45deg);
    top:0;
}

@media (max-width: 1100px) {
  .hamb {
    display: block;
  }


  /* Hide sidebar */
  .sidebar {
    width: auto;
  }
  .content {
    margin-left: var(--padding-large);
  }

  .nav {
    display: none;
    position: absolute;
    left: 0;
    top: var(--header-height);
    height: 100vh;
    background: var(--dark-bg);
    width: 100%;
    border-bottom: 1px solid var(--dark-bg-2);
  }
  .nav a {
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: var(--padding-large);
    user-select: none;
  }

  .nav a .icon-text {
    display: flex;
    align-items: center;
  }

  .nav a .resp-hint {
    display: block;
    margin-right: var(--padding-small);
  }
}


</style>

