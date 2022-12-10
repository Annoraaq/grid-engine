<template>
  <nav>
    <ul>
      <li v-for="post in $static.pages.edges" :key="post.id" class="post" >
        <g-link :to="post.node.path">
          {{ post.node.title }}
        </g-link>
      </li>
    </ul>
  </nav>
</template>

<static-query>
query {
  pages: allMarkdownPage {
    edges {
      node {
        id
        title
        path
        parent
      }
    }
  }
}
</static-query>


<style>

nav ul li {
  list-style-type: none;
}

nav ul a {
  color: var(--dark-font-medium)
}

nav ul a:hover {
  color: var(--dark-font-bright)
}
</style>
