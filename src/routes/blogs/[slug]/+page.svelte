<script lang="ts">
	import type { PostDetailType } from '$lib/types/post';
	import Breadcrumb from '@/components/Breadcrumb.svelte';
	import Post from '@/components/Post.svelte';
	import Seo from '@/components/SEO.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	let post: PostDetailType = data.body?.post;
</script>

<Seo
	title={post?.seo?.title || 'Blog Post'}
	description={post?.seo?.description || 'A detailed blog post by Wisnu Pramoedya.'}
	keywords={post?.tags?.map((tag) => tag.slug).join(', ') || 'blog, web development'}
	url={`/blogs/${post?.slug}`}
	type="article"
	image={post?.coverImage?.url}
/>

<section class="px-8 md:px-32 mb-48 pt-10 md:pt-0">
	<Breadcrumb
		items={[
			{ name: 'Home', url: '/' },
			{ name: 'Blog', url: '/blogs' },
			{ name: post?.title || 'Blog Post', url: `/blogs/${post?.slug}` }
		]}
	/>
	<Post {post} />
</section>
