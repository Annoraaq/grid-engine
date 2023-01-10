<template>
	<Layout>
		<main class="md-content" v-html="$page.page.content"></main>
	</Layout>
</template>

<page-query>
	query Page($path: String!) {
		page: markdownPage(path: $path) {
			id
			title
			path
      parent
			beta
			content
		}
	}
</page-query>
