import { HASHNODE_HOSTNAME } from '$env/static/private';
import { GetPostBySlugQueryStore } from '$houdini';
import { error, type LoadEvent } from '@sveltejs/kit';

export const load = async (event: LoadEvent) => {
	const slug = event.params.slug;

	if (!slug) {
		error(400, { message: 'Slug parameter is required' });
	}

	const getBlogPostQuery = new GetPostBySlugQueryStore();

	try {
		const blogPost = await getBlogPostQuery.fetch({
			event,
			variables: {
				host: HASHNODE_HOSTNAME,
				slug: slug
			}
		});

		if (!blogPost.data?.publication?.post) {
			error(404, { message: 'Blog post not found' });
		}

		return {
			status: 200,
			body: {
				post: blogPost.data.publication.post
			}
		};
	} catch (err) {
		console.error('Error fetching blog post data:', err);
		error(500, { message: 'Internal Server Error' });
	}
};
