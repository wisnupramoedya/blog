<script lang="ts">
	import Blog from '@/components/Blog.svelte';
	import Seo from '@/components/SEO.svelte';

	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<Seo
	title="Blog"
	description="A collection of blog posts by Wisnu Pramoedya, covering various topics in web development."
	keywords="blog, golang, web development"
	url="/blogs"
	type="website"
/>

<Blog posts={data.posts} pageInfo={data.pageInfo} />
