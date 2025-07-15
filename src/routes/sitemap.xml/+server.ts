import { GetAllPostSlugsQueryStore } from '$houdini';
import type { LoadEvent } from '@sveltejs/kit';

export async function GET(event: LoadEvent) {
	const getAllPostSlugs = new GetAllPostSlugsQueryStore();
	const query = await getAllPostSlugs.fetch({
		event,
		variables: {
			host: 'wisnupram.com',
			first: 10
		}
	});

	const posts = query.data?.publication?.posts.edges.map((edge) => edge.node) || [];
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
                <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
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
}
