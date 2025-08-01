import type { ApiPosts, ApiResponse } from '$lib/types/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const {
		data: { posts }
	} = await fetch('/api/posts').then((response) => {
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		return response.json() as Promise<ApiResponse<ApiPosts>>;
	});

	const pages = ['/', '/blogs'];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
					.map(
						(page) => `
            <url>
                <loc>https://wisnupram.com${page}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        `
					)
					.join('')}
        ${posts
					.map(
						(post) => `
            <url>
                <loc>https://wisnupram.com/blogs/${post.slug}</loc>
                <lastmod>${post.updated || post.date}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.6</priority>
            </url>
        `
					)
					.join('')}
    </urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
