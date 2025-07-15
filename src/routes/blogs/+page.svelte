<script lang="ts">
	import Blog from "../../components/Blog.svelte";

    
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData} = $props();
</script>

<Blog posts={data.posts} pageInfo={data.pageInfo} />
