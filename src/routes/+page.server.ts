import { HASHNODE_HOSTNAME } from '$env/static/private';
import { GetPublicationQueryStore } from '$houdini';
import type { LoadEvent } from '@sveltejs/kit';

export const load = async (event: LoadEvent) => {
	const MAX_POSTS = 3;
	const host = HASHNODE_HOSTNAME;
	const getPublicationQuery = new GetPublicationQueryStore();

	try {
		const { data } = await getPublicationQuery.fetch({
			event,
			variables: {
				host: host,
				first: MAX_POSTS
			}
		});

		const posts = data?.publication?.posts?.edges?.map((edge) => edge.node) || [];
		const pageInfo = data?.publication?.posts?.pageInfo || {
			hasNextPage: false,
			endCursor: null
		};

		return {
			posts,
			pageInfo
		};
	} catch (error) {
		console.error('Error fetching publication data:', error);
		return {
			posts: [],
			pageInfo: {
				hasNextPage: false,
				endCursor: null
			}
		};
	}
};
