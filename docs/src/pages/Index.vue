<template>
  <Layout>
    <main class="md-content" v-html="$page.pages.edges[0].node.content"></main>
  </Layout>
</template>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>


<page-query>
query {
  pages: allReadme {
    edges {
      node {
        id
        content
      }
    }
  }
}
</page-query>
