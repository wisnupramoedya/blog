import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			remarkPlugins: [
				remarkGfm, // Tables, strikethrough, task lists, etc.
				[
					remarkGithub,
					{
						repository: 'wisnupramoedya/blog' // untuk link otomatis ke issues/PRs
					}
				]
			],
			rehypePlugins: [
				rehypeSlug, // menambahkan id ke headings
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'wrap'
					}
				]
			],
			highlight: {
				alias: {
					js: 'javascript',
					ts: 'typescript'
				}
			}
		})
	],
	kit: {
		adapter: adapter({
			isr: {
				expiration: 60 * 60, // 1 hour
				enabled: true
			}
		}),
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
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
