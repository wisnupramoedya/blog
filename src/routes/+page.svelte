<script lang="ts">
	import Blog from '../components/Blog.svelte';
	import Introduction from '../components/Introduction.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData} = $props();
</script>

<Introduction />
<Blog posts={data.posts} pageInfo={data.pageInfo} />
