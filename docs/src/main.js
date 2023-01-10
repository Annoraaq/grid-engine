// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/css/prism-duotone-forest.css'
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  head.link.push({
    rel: 'preconnect',
    href: 'https://rsms.me/'
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://rsms.me/inter/inter.css'
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Saira'
  });

  head.link.push({
    rel: 'stylesheet',
    href: '/fontawesome/css/fontawesome.min.css'
  });

  head.link.push({
    rel: 'stylesheet',
    href: '/fontawesome/css/brands.min.css'
  });

  head.link.push({
    rel: 'stylesheet',
    href: '/fontawesome/css/solid.min.css'
  });

}
