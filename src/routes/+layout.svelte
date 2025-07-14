<script lang="ts">
	const { children } = $props();
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Nav from '../components/Nav.svelte';
</script>

<Nav />
<main class="flex-1">
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
