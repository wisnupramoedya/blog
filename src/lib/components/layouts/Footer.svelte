<script lang="ts">
	import { icons } from '../../../data/socials.svelte';

	let currentYear = new Date().getFullYear();
</script>

<footer class="bg-prime-800 text-white py-6 md:py-16 px-8 md:px-32">
	<div class="mb-8 md:mb-16">
		<h2 class="font-bold mb-2 md:mb-6">Get In Touch</h2>
		<p class="text-prime-300 leading-relaxed">
			Stay connected with me and let's know more about my service and more explorer me on this
		</p>

		<!-- Social Media Icons -->
		<div class="flex space-x-4 mt-8">
			{#each icons as icon (icon.name)}
				<a
					href={icon.link}
					target="_blank"
					aria-label="{icon.name} Profile"
					class="w-12 h-12 bg-prime-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-800 transition-colors duration-300"
				>
					<span class="{icon.icon} w-6 h-6"></span>
				</a>
			{/each}
		</div>
	</div>

	<!-- Divider -->
	<div class="border-t border-gray-600 pt-8">
		<div class="flex flex-col md:flex-row justify-between items-center">
			<!-- Logo/Name -->
			<div class="flex items-center mb-4 md:mb-0">
				<span class="font-bold mr-3">😊</span>
				<h3>Wisnu Pramoedya</h3>
			</div>

			<!-- Copyright -->
			<h4>
				© <a href="/" class="text-yellow-400">Wisnu Pramoedya</a>
				{currentYear} all rights reserved
			</h4>
		</div>
	</div>
</footer>
