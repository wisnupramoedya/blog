<script lang="ts">
	import Post from '../../../components/Post.svelte';
	import Seo from '../../../components/SEO.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	let post = data.body?.post;
</script>

<Seo
	title={post?.seo?.title || 'Blog Post'}
	description={post?.seo?.description || 'A detailed blog post by Wisnu Pramoedya.'}
	keywords={post?.tags?.map(tag => tag.slug).join(', ') || 'blog, web development'}
	url={`/blogs/${post?.slug}`}
	type="article"
	image={post?.coverImage?.url}
/>

<section>
	<Post {post} />
</section>
