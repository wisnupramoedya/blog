<script lang="ts">
	export let title = '';
	export let description = '';
	export let keywords = '';
	export let image = '';
	export let url = '';
	export let type = 'website';
	export let siteName = 'Wisnu Pram';
	export let twitterHandle = '@wisnupramoedya';

	const fullTitle = title ? `${title}` : siteName;
	const fullUrl = url ? `https://wisnupram.com${url}` : 'https://wisnupram.com';
	const fullImage = image
		? `https://wisnupram.com${image}`
		: 'https://wisnupram.com/default-og-image.png';
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={fullUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:url" content={fullUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={twitterHandle} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Wisnu Pramoedya" />
</svelte:head>
