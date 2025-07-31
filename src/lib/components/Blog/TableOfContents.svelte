<script lang="ts">
	import type { TableOfContentsItem } from '@/lib/types/blog';

	const { toc }: { toc: TableOfContentsItem[] } = $props();

	let activeId = '';

	function handleClick(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

{#if toc.length > 0}
	<nav class="">
		<h3 class="font-semibold text-gray-900 mb-4">Table of Contents</h3>
		<ul class="space-y-2 text-sm">
			{#each toc as item (item.id)}
				<li style="margin-left: {(item.level - 2) * 1}rem">
					<button
						class="text-left text-gray-600 hover:text-gray-900 transition-colors"
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
{/if}
