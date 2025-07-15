<script>
	import { page } from '$app/state';
</script>

<section class="px-8 md:px-32">
	<div class="flex flex-col items-center justify-center text-white mt-32 md:mt-16">
		<h1>Error - {page.status}</h1>
		<p class="text-center">Oops! {page.error?.message}</p>
	</div>
</section>
