<script lang="ts">
	import type { PostContentProps } from '$lib/types/post';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	let { content }: PostContentProps = $props();

	let contentDiv: HTMLDivElement;

	$effect(() => {
		// Import a theme (you can change this to any theme you prefer)

		// Configure highlight.js (optional)
		hljs.configure({
			languages: ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'markdown']
		});

		// Highlight all code blocks in the content
		if (contentDiv) {
			const codeBlocks = contentDiv.querySelectorAll('pre code');
			codeBlocks.forEach((block) => {
				hljs.highlightElement(block as HTMLElement);
			});
		}
	});
</script>

<div bind:this={contentDiv} class="prose max-w-none">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html content}
</div>
