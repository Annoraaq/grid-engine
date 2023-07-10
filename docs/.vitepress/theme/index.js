// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import Logo from '../../components/Logo.vue'
import Grid from '../../components/Grid.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'nav-bar-title-before': () => h(Logo),
      'home-hero-image': () => h(Grid),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
