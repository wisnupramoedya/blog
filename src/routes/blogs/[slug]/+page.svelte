<script lang="ts">
	import Post from '../../../components/Post.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	let post = data.body?.post;
</script>

<section>
	<Post {post} />
</section>
