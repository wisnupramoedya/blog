<script lang="ts">
	import Content from './Content.svelte';
	import Views from './Views.svelte';

	// Props yang diterima dari parent component
	let { post } = $props();
</script>

<article class="text-white">
	<!-- Header image placeholder -->
	<div class="relative w-full h-48 rounded-t-4xl overflow-hidden">
		<img
			src={post.coverImage.url}
			alt={post.title}
			class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
		/>
	</div>

	<!-- Content container -->
	<div class="px-6 py-8">
		<!-- Title -->
		<h1 class="mb-4">{post.title}</h1>

		<!-- Meta information -->
		<div class="flex flex-col md:flex-row md:items-center md:gap-8 mb-6">
			<!-- Views -->
			<Views blogSlug={post.slug} />

			<!-- Tags -->
			<div class="flex gap-2">
				{#each post.tags as tag (tag.slug)}
					<p class="text-yellow-400 hover:text-yellow-300 cursor-pointer">
						#{tag.slug}
					</p>
				{/each}
			</div>
		</div>

		<!-- Content -->
		<Content markdown={post.content.markdown} />
	</div>
</article>
