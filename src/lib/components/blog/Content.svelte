<script lang="ts">
	import type { PostContentProps } from '$lib/types/post';
	import { configureHighlightJS } from '$lib/utils/hljs';

	import 'highlight.js/styles/github-dark.css';
	import ProgressBar from './ProgressBar.svelte';

	let { content }: PostContentProps = $props();

	let contentDiv = $state<HTMLDivElement>();

	let hljs = configureHighlightJS();

	$effect(() => {
		// Highlight all code blocks in the content
		if (contentDiv) {
			const codeBlocks = contentDiv.querySelectorAll('pre code');
			codeBlocks.forEach((block) => {
				hljs.highlightElement(block as HTMLElement);
			});
		}
	});
</script>

<ProgressBar parent={contentDiv} />

<div bind:this={contentDiv} class="prose max-w-none">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html content}
</div>
