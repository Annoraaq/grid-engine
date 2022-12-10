<template>
	<Layout>
		<main v-html="$page.page.content"></main>
	</Layout>
</template>

<page-query>
	query Page($path: String!) {
		page: markdownPage(path: $path) {
			id
			title
			path
      parent
			content
		}
	}
</page-query>
