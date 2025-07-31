import { dev } from '$app/environment';
import { calculateReadingTime, sortPostsByDate } from '@/lib/server/utils/blog';
import type { ApiPosts, ApiResponse } from '@/lib/types/api';
import type { BlogPost, BlogPostModule } from '@/lib/types/blog';
import { json, type RequestHandler } from '@sveltejs/kit';
import { render } from 'svelte/server';

async function getPosts() {
	const modules = import.meta.glob<BlogPostModule>('/src/data/posts/*.md', {
		eager: true
	});

	const posts: BlogPost[] = Object.entries(modules)
		.map(([path, module]) => {
			const slug = path
				.split('/')
				.pop()
				?.replace(/\.(md|svx)$/, '');

			const metadata = module.metadata;

			return {
				slug,
				...metadata,
				readingTime: module.metadata?.readingTime ?? calculateReadingTime(render(module.default).body) ?? 0
			};
		})
		.filter((post): post is BlogPost => {
			if (!post.slug || !post.title || !post.date) {
				console.warn(`Post metadata is missing required fields: ${JSON.stringify(post)}`);
				return false;
			}
			return dev || !post.draft;
		});

	return sortPostsByDate(posts);
}

export const GET: RequestHandler = async ({ url }) => {
	const allPosts = await getPosts();
	const limitParam = url.searchParams.get('limit');
	const limit = limitParam ? parseInt(limitParam, 10) : null;

	const offsetParam = url.searchParams.get('offset');
	const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

	const posts = limit ? allPosts.slice(offset, offset + limit) : allPosts.slice(offset);
	const totalCount = posts.length;

	const hasNextPage = limit ? offset + limit < totalCount : false;
	const endCursor = posts.length > 0 ? offset + posts.length - 1 : 0;
	return json({
		data: {
			posts: posts
		},
		pageInfo: {
			totalCount,
			endCursor,
			hasNextPage
		}
	} satisfies ApiResponse<ApiPosts>);
};
