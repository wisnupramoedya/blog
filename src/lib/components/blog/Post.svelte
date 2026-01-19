<script lang="ts">
	import type { PostProps } from '$lib/types/post';
	import Giscus from '@giscus/svelte';
	import Views from '../Views.svelte';
	import Content from './Content.svelte';

	// Props yang diterima dari parent component
	let { meta, content, class: className = '' }: PostProps = $props();
</script>

<article class="text-white {className}">
	<!-- Header image placeholder -->
	<div class="relative w-full h-48 rounded-t-4xl overflow-hidden">
		<enhanced:img
			src={meta.cover || '/images/sveltekit-intro.webp'}
			alt={meta.title}
			class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
			loading="eager"
			fetchpriority="high"
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			width="800"
			height="400"
		/>
	</div>

	<!-- Content container -->
	<div class="md:px-6 py-8">
		<!-- Title -->
		<h1 class="mb-4">{meta.title}</h1>

		<!-- Meta information -->
		<div class="flex flex-col md:flex-row md:items-center md:gap-8 mb-6">
			<!-- Views -->
			<Views slug={meta.slug} />

			<!-- Tags -->
			<div class="flex flex-wrap gap-2">
				{#if !meta.tags || meta.tags.length === 0}
					<p class="text-gray-400">No tags available</p>
				{:else}
					{#each meta.tags as tag (tag)}
						<p class="text-yellow-400 hover:text-yellow-300 cursor-pointer">
							#{tag}
						</p>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Content -->
		<Content {content} />

		<!-- Comment -->
		<div class="mt-10">
			<Giscus
				id="comment"
				term="Welcome"
				repo="wisnupramoedya/blog"
				repoId="R_kgDOPMC0mg"
				category="Announcements"
				categoryId="DIC_kwDOPMC0ms4CtqO7"
				mapping="title"
				strict="0"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="dark"
				lang="en"
				loading="lazy"
			/>
		</div>
	</div>
</article>
