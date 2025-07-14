<script lang="ts">
	let panels = [
		{
			tags: ['#git', '#backend', '#golang'],
			title: 'Travel Mobile App',
			image: 'https://picsum.photos/seed/picsum/400/300'
		},
		{
			tags: ['#git', '#backend', '#golang'],
			title: 'Travel Mobile App',
			image: 'https://picsum.photos/seed/picsum/400/300'
		},
		{
			tags: ['#git', '#backend', '#golang'],
			title: 'Travel Mobile App',
			image: 'https://picsum.photos/seed/picsum/400/300'
		},
		{
			tags: ['#git', '#backend', '#golang'],
			title: 'Travel Mobile App',
			image: 'https://picsum.photos/seed/picsum/400/300'
		}
	];
</script>

<section class="bg-primary-800 px-8 md:px-32 py-24">
	<h1 class="h0 text-primary-100 mb-6 md:mb-9">Blog</h1>
	<p class="text-primary-300 mb-6 md:mb-9">
		I learned and recorded all my learnings through blog posts
	</p>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-9 md:p-8">
		{#each panels as panel, i (i)}
			<div class="flex flex-col h-[25rem]">
				<div class="mb-4 md:mb-6">
					<p class="text-secondary mb-2">{panel.tags.join(' ')}</p>
					<h3 class="text-primary-100">{panel.title}</h3>
				</div>
				<div class="flex-1 bg-primary-600 rounded-tl-2xl overflow-hidden">
					<img src={panel.image} alt={panel.title} class="w-full h-full object-cover" />
				</div>
			</div>
		{/each}
	</div>
	<div class="flex justify-center mt-8 md:mt-16">
		<button
			class="border-2 border-secondary text-secondary px-8 py-3 rounded-full hover:bg-secondary hover:text-primary-800 transition-colors duration-300 cursor-pointer text-lg"
		>
			More Posts
		</button>
	</div>
</section>
