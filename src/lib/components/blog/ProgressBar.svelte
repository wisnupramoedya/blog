<script lang="ts">
	let { parent }: { parent?: HTMLDivElement } = $props();
	let progressBar: HTMLDivElement;
	let readingProgress = $state(0);

	function updateProgress() {
		if (!parent) return;

		const rect = parent.getBoundingClientRect();
		const contentTop = rect.top + window.scrollY;
		const contentHeight = parent.offsetHeight;
		const winHeight = window.innerHeight;

		const scrollTop = window.scrollY;
		const contentStart = contentTop;
		const contentEnd = contentTop + contentHeight - winHeight;

		if (scrollTop < contentStart) {
			readingProgress = 0;
		} else if (scrollTop > contentEnd) {
			readingProgress = 100;
		} else {
			readingProgress = ((scrollTop - contentStart) / (contentEnd - contentStart)) * 100;
		}
	}

	$effect(() => {
		// Add scroll event listener
		window.addEventListener('scroll', updateProgress);

		// Initial progress calculation
		updateProgress();

		// Cleanup
		return () => {
			window.removeEventListener('scroll', updateProgress);
		};
	});
</script>

<div class="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
	<div
		bind:this={progressBar}
		class="h-full bg-lower transition-all duration-150 ease-out"
		style="width: {readingProgress}%"
	></div>
</div>
