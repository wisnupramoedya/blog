<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import 'highlight.js/styles/github-dark.css';
	import hljs from 'highlight.js';

	const { markdown }: { markdown: string } = $props();

	const plugins = [gfmPlugin()];

	$effect(() => {
		if (markdown) {
			hljs.highlightAll();
		}
	});
</script>

<div class="prose prose-invert max-w-none">
	<Markdown md={markdown} {plugins} />
</div>

<style>
	.prose :global(code) {
		background-color: var(--color-primary-900);
		padding: 1rem;
		border-radius: 0.5rem;
	}
	.prose :global(p) {
		margin-bottom: 1rem;
	}
	/* Styling untuk ordered list (ol) - menampilkan angka */
	.prose :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	/* Styling untuk unordered list (ul) - menampilkan bullet */
	.prose :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	/* Styling untuk nested lists */
	.prose :global(ul ul) {
		list-style-type: circle;
	}

	.prose :global(ul ul ul) {
		list-style-type: square;
	}

	.prose :global(ol ol) {
		list-style-type: lower-alpha;
	}

	.prose :global(ol ol ol) {
		list-style-type: lower-roman;
	}

	/* Styling untuk list items */
	.prose :global(li) {
		margin-bottom: 0.5rem;
	}
</style>
