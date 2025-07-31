import type { PageServerLoad } from './$types';
import type { ApiPosts, ApiResponse } from '@/lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
	const json = await fetch('/api/posts').then((response) => {
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		return response.json() as Promise<ApiResponse<ApiPosts>>;
	});

	return {
		posts: json.data.posts,
		pageInfo: json.pageInfo
	};
};
