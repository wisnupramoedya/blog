<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import PostList from '@/lib/components/blog/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Blog"
	description="A collection of blog posts by Wisnu Pramoedya, covering various topics in web development."
	keywords="blog, golang, web development"
	url="/blogs"
	type="website"
/>

<PostList posts={data.posts} pageInfo={data.pageInfo} />
