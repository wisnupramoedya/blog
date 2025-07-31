<script lang="ts">
	import Introduction from '$lib/components/Introduction.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import PostList from '@/lib/components/Blog/PostList.svelte';
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
<PostList class="bg-primary-800" posts={data.posts} pageInfo={data.pageInfo} />
