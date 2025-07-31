<script lang="ts">
	import { createViewsStore } from '$lib/stores/viewsStore.svelte';
	import type { ViewsProps } from '$lib/types/views';
	import { formatViews, getViewsLabel } from '@/lib/utils/view';

	let { slug }: ViewsProps = $props();

	let viewsStore = createViewsStore();
	let views = $derived(viewsStore.data);

	$effect(() => {
		if (slug) {
			viewsStore.loadViews(slug);
		}
	});
</script>

<div class="flex items-center gap-2">
	<span class="icon-[fa6-regular--eye] w-4 h-4"></span>
	{#if views.loading}
		<span class="animate-pulse">Loading...</span>
	{:else}
		<span>{formatViews(views.count)} {getViewsLabel(views.count)}</span>
	{/if}
</div>
