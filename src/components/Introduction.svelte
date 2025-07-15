<script lang="ts">
	import { icons } from '../data/socials.svelte';
</script>

<section class="custom-height px-8 md:px-32">
	<div class="relative mt-16 md:mt-32">
		<div class="absolute z-10 flex-1"></div>
		<div
			class="bg-primary-800 absolute top-2/3 right-0 z-0 h-[38rem] w-[38rem] -translate-x-1/5 -translate-y-1/2 transform overflow-clip rounded-full"
		>
			<!-- /* Background circle for visual effect */  -->
		</div>
		<div class="relative z-20 flex flex-col gap-9">
			<h1 class="font-montserrat text-primary-400 text-6xl">
				I'm <br class="md:hidden" />
				<span class="text-5xl sm:text-6xl md:text-8xl font-bold text-white">Wisnu Pramoedya</span>
			</h1>
			<div class="h-1.5 w-52 bg-amber-400"></div>
			<p class="text-primary-300">
				A student who loves to improve
				<br />
				the learning of programming,
				<br />
				especially back-end
			</p>
			<div class="flex gap-6 text-white">
				{#each icons as icon (icon.name)}
					<a
						href={icon.link}
						target="_blank"
						aria-label="{icon.name} Profile"
						class="bg-primary-600 rounded-full w-14 h-14 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-800"
					>
						<span class="{icon.icon} w-8 h-8"></span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.custom-height {
		height: 70vh; /* Default for mobile portrait */
	}

	/* Mobile landscape */
	@media (orientation: landscape) and (max-width: 47.9rem) {
		.custom-height {
			height: 100vh;
		}
	}

	/* Tablet portrait */
	@media (orientation: portrait) and (min-width: 48rem) and (max-width: 63.9rem) {
		.custom-height {
			height: 70vh;
		}
	}

	/* Tablet landscape */
	@media (orientation: landscape) and (min-width: 48rem) and (max-width: 63.9rem) {
		.custom-height {
			height: 100vh;
		}
	}

	/* Laptop/Desktop (always full height regardless of orientation) */
	@media (min-width: 64rem) {
		.custom-height {
			height: 100vh;
		}
	}
</style>
