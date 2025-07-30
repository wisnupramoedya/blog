<script lang="ts">
	const { children } = $props();
	import '@/app.css';
	import Footer from '$lib/layouts/Footer.svelte';
	import Nav from '$lib/layouts/Nav.svelte';
</script>

<Nav />
<main class="flex-1 pt-10 md:pt-24">
	{@render children()}
</main>

<Footer />

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
	}
</style>
