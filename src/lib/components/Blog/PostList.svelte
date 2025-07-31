<script lang="ts">
	import type { PostListProps } from '../../types/post';

	let { posts, pageInfo, class: className = '' }: PostListProps = $props();
</script>

<section class="px-8 md:px-32 py-24 {className}">
	<h1 class="h0 text-prime-100 mb-6 md:mb-9">Blog</h1>
	<p class="text-prime-300 mb-6 md:mb-9">
		I learned and recorded all my learnings through blog posts
	</p>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-9 md:p-8">
		{#each posts as post (post.slug)}
			<a href={`/posts/${post.slug}`} aria-label={post.title} class="block group">
				<div
					class="flex flex-col h-[25rem] transition-transform duration-300 ease-out group-hover:scale-105"
				>
					<div
						class="mb-4 md:mb-6 transition-transform duration-300 ease-out group-hover:translate-y-[-4px]"
					>
						<p class="text-lower mb-2 transition-colors duration-300 group-hover:text-prime-200">
							{post.tags?.map((tag) => '#' + tag).join(' ')}
						</p>
						<h3 class="text-prime-100 transition-colors duration-300 group-hover:text-white">
							{post.title}
						</h3>
					</div>
					<div
						class="flex-1 bg-prime-600 rounded-tl-2xl overflow-hidden transition-all duration-300 ease-out group-hover:shadow-lg group-hover:shadow-prime-600/25"
					>
						<img
							src={post.cover || 'https://picsum.photos/seed/picsum/400/300'}
							alt={post.title}
							class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						/>
					</div>
				</div>
			</a>
		{/each}
	</div>
	{#if pageInfo?.hasNextPage}
		<div class="flex justify-center mt-8 md:mt-16">
			<a
				href="/blogs"
				class="border-2 border-lower text-lower px-8 py-3 rounded-full hover:bg-lower hover:text-prime-800 transition-colors duration-300 cursor-pointer text-lg"
			>
				More Posts
			</a>
		</div>
	{/if}
</section>
