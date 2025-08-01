<script lang="ts">
	export let items: { name: string; url: string }[] = [];
</script>

<nav aria-label="Breadcrumb" class="py-2">
	<ol
		itemscope
		itemtype="https://schema.org/BreadcrumbList"
		class="flex items-center space-x-1 text-sm"
	>
		{#each items as item, index (item.name)}
			<li
				class="flex items-center"
				itemprop="itemListElement"
				itemscope
				itemtype="https://schema.org/ListItem"
			>
				{#if index > 0}
					<svg
						class="w-4 h-4 mx-2 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				{/if}

				{#if index === items.length - 1}
					<!-- Current page - not clickable -->
					<span class="text-white cursor-default" itemprop="name" aria-current="page">
						{item.name}
					</span>
				{:else}
					<!-- Clickable breadcrumb link -->
					<a
						itemprop="item"
						href={item.url}
						class="text-gray-300 hover:text-white transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-1"
					>
						<span itemprop="name">{item.name}</span>
					</a>
				{/if}

				<meta itemprop="position" content={`${index + 1}`} />
			</li>
		{/each}
	</ol>
</nav>
