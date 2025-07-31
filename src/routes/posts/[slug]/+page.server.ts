import { dev } from '$app/environment';
import { generateTOC } from '@/lib/server/utils/blog';
import type { BlogPost, BlogPostModule } from '@/lib/types/blog';
import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post: BlogPostModule = await import(`../../../data/posts/${params.slug}.md`);

		if (!dev && post.metadata?.draft) {
			throw error(404, 'Post not found');
		}

		const renderedContent = render(post.default).body;

		const meta: BlogPost = {
			slug: params.slug,
			...post.metadata
		};

		return {
			content: renderedContent,
			meta,
			toc: generateTOC(renderedContent)
		};
	} catch (e) {
		console.error(`Failed to load post: ${params.slug}`, e);
		throw error(404, 'Post not found');
	}
};
