<script lang="ts">
	import { onMount } from 'svelte';
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	// Initialize Supabase client
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	let { blogSlug }: { blogSlug: string } = $props();

	let viewCount = $state(0);
	let loading = $state(true);

	// Function to check if user has viewed this post in the last hour
	function hasViewedRecently(slug: string) {
		const key = `viewed_${slug}`;
		const viewedAt = localStorage.getItem(key);

		if (!viewedAt) return false;

		const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1 hour in milliseconds
		return parseInt(viewedAt) > oneHourAgo;
	}

	// Function to mark post as viewed
	function markAsViewed(slug: string) {
		const key = `viewed_${slug}`;
		localStorage.setItem(key, Date.now().toString());
	}

	// Function to get current view count
	async function getViewCount(slug: string) {
		try {
			const { data, error } = await supabase.rpc('get_view_count', { slug });

			if (error) {
				console.error('Error getting view count:', error);
				return 0;
			}

			return data || 0;
		} catch (error) {
			console.error('Error getting view count:', error);
			return 0;
		}
	}

	// Function to increment view count
	async function incrementViewCount(slug: string) {
		try {
			const { data, error } = await supabase.rpc('increment_view_count', { slug });

			if (error) {
				console.error('Error incrementing view count:', error);
				return null;
			}

			return data;
		} catch (error) {
			console.error('Error incrementing view count:', error);
			return null;
		}
	}

	// Main function to handle view counting
	async function handleViewCount() {
		if (!blogSlug) return;

		// Check if user has viewed this post recently
		const hasViewed = hasViewedRecently(blogSlug);

		if (!hasViewed) {
			// Increment view count in database
			const newCount = await incrementViewCount(blogSlug);
			if (newCount !== null) {
				viewCount = newCount;
				markAsViewed(blogSlug);
			}
		} else {
			// Just get the current count without incrementing
			viewCount = await getViewCount(blogSlug);
		}

		loading = false;
	}

	function formatViews(views: number) {
		if (views >= 1000000) {
			return Math.floor(views / 1000000) + 'M';
		} else if (views >= 1000) {
			return Math.floor(views / 1000) + 'K';
		}
		return views.toString();
	}

	// Run on component mount
	onMount(() => {
		handleViewCount();
	});
</script>

<div class="flex items-center gap-2">
	<span class="icon-[fa6-regular--eye] w-4 h-4"></span>
	{#if loading}
		<span class="animate-pulse">Loading...</span>
	{:else}
		<span>{formatViews(viewCount)} {viewCount === 1 ? 'view' : 'views'}</span>
	{/if}
</div>
