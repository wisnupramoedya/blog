<script lang="ts">
	import type { TableOfContentsItem } from '$lib/types/blog';

	let {
		toc,
		handleClick,
		activeId
	}: { toc: TableOfContentsItem[]; handleClick: (id: string) => void; activeId: string } = $props();
</script>

<nav class="p-4">
	<ul class="space-y-2 text-sm">
		{#each toc as item (item.id)}
			<li style="margin-left: {(item.level - 2) * 1}rem">
				<button
					class="text-left text-white hover:font-bold transition-colors w-full cursor-pointer"
					class:font-semibold={activeId === item.id}
					class:text-blue-600={activeId === item.id}
					onclick={() => handleClick(item.id)}
				>
					{item.text}
				</button>
			</li>
		{/each}
	</ul>
</nav>
