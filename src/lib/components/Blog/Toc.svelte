<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import type { TableOfContentsItem } from '@/lib/types/blog';
	import TocContent from './TocContent.svelte';

	const { toc }: { toc: TableOfContentsItem[] } = $props();

	let activeId = $state('');
	let isDrawerOpen = $state(false);
	let isDesktop = $state(true);

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

{#if toc.length > 0}
	<!-- Desktop: Fixed TOC -->
	{#if isDesktop}
		<div
			class="fixed top-24 right-4 bg-white border border-gray-200 rounded-lg shadow-lg max-w-xs z-50"
		>
			<h3 class="font-semibold text-gray-900 mb-4">Table of Contents</h3>
			<TocContent {toc} {handleClick} {activeId} />
		</div>
	{:else}
		<!-- Mobile: Drawer trigger -->
		<div class="fixed top-1/2 right-4 z-50 -translate-y-1/2">
			<Sheet.Root bind:open={isDrawerOpen}>
				<Sheet.Trigger>
					<Button variant="outline" size="icon" class="bg-white shadow-lg">AA</Button>
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-80">
					<Sheet.Header>
						<Sheet.Title>Table of Contents</Sheet.Title>
					</Sheet.Header>
					<div class="mt-4">
						<TocContent {toc} {handleClick} {activeId} />
					</div>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	{/if}
{/if}
