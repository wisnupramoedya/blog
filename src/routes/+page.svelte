<script lang="ts">
	import Blog from '../components/Blog.svelte';
	import Introduction from '../components/Introduction.svelte';
	import Seo from '../components/SEO.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<Seo
	title="Home"
	description="A collection of blog posts by Wisnu Pramoedya, covering various topics in web development."
	keywords="blog, golang, web development"
	url="/"
	type="website"
/>

<Introduction />
<Blog class="bg-primary-800" posts={data.posts} pageInfo={data.pageInfo} />
