<script lang="ts">
	const { children } = $props();
	import Footer from '$lib/components/layouts/Footer.svelte';
	import Nav from '$lib/components/layouts/Nav.svelte';
	import '../app.css';
</script>

<Nav />
<main class="flex-1 pt-10 md:pt-24">
	{@render children()}
</main>

<Footer />

<style>
	:global(html) {
		scroll-padding-top: 2.5rem;
	}

	@media (min-width: 768px) {
		:global(html) {
			scroll-padding-top: 6rem;
		}
	}
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
	}
</style>
