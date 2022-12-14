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
  /* width: 100%; */

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
  padding-left: calc(1.3 * var(--font-size-title));
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
  /* border-collapse: separate;
  border-spacing: 10px; */

}
table td,
table th{
  padding: var(--padding-small);
  border: 1px solid var(--dark-bg-2);
  vertical-align: top;
}

</style>

