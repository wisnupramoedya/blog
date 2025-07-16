<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';

	const { markdown }: { markdown: string } = $props();

	const plugins = [gfmPlugin()];
</script>

<div class="prose prose-invert max-w-none">
	<Markdown md={markdown} {plugins} />
</div>

<style>
	.prose :global(code) {
		background-color: var(--color-primary-400);
		color: var(--color-primary-800);
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
