<script lang="ts">
	import Breadcrumb from '@/lib/components/Blog/Breadcrumb.svelte';
	import Post from '@/lib/components/Blog/Post.svelte';
	import TableOfContents from '@/lib/components/Blog/TableOfContents.svelte';
	import Seo from '@/lib/components/SEO.svelte';

	const { data } = $props();
	const { content, meta, toc } = data;
</script>

<Seo
	title={meta.title || 'Blog Post'}
	description={meta.description || 'A detailed blog post by Wisnu Pramoedya.'}
	keywords={meta.seo?.keywords || 'blog, web development'}
	url={`/blogs/${meta.slug}`}
	type="article"
	image={meta.cover}
/>

<section class="px-8 md:px-32 mb-48 pt-10 md:pt-0">
	<Breadcrumb
		items={[
			{ name: 'Home', url: '/' },
			{ name: 'Blog', url: '/posts' },
			{ name: meta.title || 'Blog Post', url: `/posts/${meta.slug}` }
		]}
	/>
	<TableOfContents {toc} />

	<Post {meta} {content} />
</section>
