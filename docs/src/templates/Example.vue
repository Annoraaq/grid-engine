<template>
	<Layout>
		<main class="md-content" v-html="$page.example.content"></main>
	</Layout>
</template>

<page-query>
	query Page($path: String!) {
		example: example(path: $path) {
			id
			title
			path
			content
			fileInfo {
				name
			}
		}
	}
</page-query>

<style>
iframe {
	width: 720px;
	height: 540px;
	border: none;
}
</style>
