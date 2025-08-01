<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import type { TableOfContentsItem } from '$lib/types/blog';
	import TocContent from './TocContent.svelte';

	const { toc }: { toc: TableOfContentsItem[] } = $props();

	let activeId = $state('');
	let isDrawerOpen = $state(false);
	let isMounted = $state(false);
	let isDesktop = $state<boolean>();

	function handleClick(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		// Close drawer on mobile after clicking
		if (!isDesktop) {
			isDrawerOpen = false;
		}
	}

	function checkScreenSize() {
		isDesktop = window.innerWidth >= 1024; // lg breakpoint
	}

	$effect(() => {
		isMounted = true;
		checkScreenSize();

		// Listen for screen size changes
		const handleResize = () => checkScreenSize();
		window.addEventListener('resize', handleResize);

		// Intersection Observer to track active section
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-20% 0px -35% 0px'
			}
		);

		// Observe all headings
		toc.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			window.removeEventListener('resize', handleResize);
			observer.disconnect();
		};
	});
</script>

{#if isMounted && toc.length > 0}
	<!-- Desktop: Fixed TOC -->
	{#if isDesktop}
		<div class="absolute top-0 right-0 rounded-lg p-3 shadow-lg max-w-xs z-10 ml-4">
			<h5 class="font-semibold text-lower mb-2">Table of Contents</h5>
			<TocContent {toc} {handleClick} {activeId} />
		</div>
	{:else}
		<!-- Mobile: Drawer trigger -->
		<div class="fixed top-1/2 right-0 z-50 -translate-y-1/2">
			<Sheet.Root bind:open={isDrawerOpen}>
				<Sheet.Trigger>
					<Button variant="link" size="icon" class="bg-lower shadow-lg cursor-pointer"
						><span class="icon-[fa6-regular--circle-left] w-6 h-6"></span></Button
					>
				</Sheet.Trigger>
				<Sheet.Content side="right" class="bg-prime-700 w-80 gap-0 text-white border-none">
					<Sheet.Header>
						<Sheet.Title class="text-lower">Table of Contents</Sheet.Title>
					</Sheet.Header>
					<div class="px-4">
						<TocContent {toc} {handleClick} {activeId} />
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	{/if}
{/if}
