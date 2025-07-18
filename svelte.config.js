import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			isr: {
				expiration: 60 * 60, // 1 hour
				enabled: true
			}
		}),

		alias: {
			$houdini: '.houdini/',
			'@/*': 'src/*',
		}
	},
	csp: {
		directives: {
			'script-src': ['self']
		},
		reportOnly: {
			'script-src': ['self'],
			'report-uri': ['/']
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
