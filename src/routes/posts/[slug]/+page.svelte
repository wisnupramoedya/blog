<script lang="ts">
	import Breadcrumb from '$lib/components/blog/Breadcrumb.svelte';
	import Post from '$lib/components/blog/Post.svelte';
	import Toc from '$lib/components/blog/Toc.svelte';
	import Seo from '$lib/components/SEO.svelte';

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
	<div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
		<div class="min-w-0">
			<Post {meta} {content} />
		</div>

		<!-- TOC sidebar - hidden on mobile, shows on desktop -->
		<div class="hidden lg:block">
			<div class="sticky top-24">
				<Toc {toc} />
			</div>
		</div>

		<!-- Mobile TOC trigger -->
		<div class="lg:hidden">
			<Toc {toc} />
		</div>
	</div>
</section>
