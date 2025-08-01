
import type { ApiPosts, ApiResponse } from '$lib/types/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const {
		data: { posts: recentPosts }
	} = await fetch('/api/posts?limit=10&offset=0').then((response) => {
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}
		return response.json() as Promise<ApiResponse<ApiPosts>>;
	});

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Wisnu Pramudya Blog</title>
        <description>Latest blog posts and articles from wisnupram.com</description>
        <link>https://wisnupram.com</link>
        <language>id-ID</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <ttl>1800</ttl>
        <atom:link href="https://wisnupram.com/rss.xml" rel="self" type="application/rss+xml"/>
        <image>
            <url>https://wisnupram.com/favicon.ico</url>
            <title>Wisnu Pramudya Blog</title>
            <link>https://wisnupram.com</link>
        </image>
        ${recentPosts
			.map(
				(post) => `<item>
            <title><![CDATA[${post.title}]]></title>
            <description><![CDATA[${post.description || ''}]]></description>
            <link>https://wisnupram.com/blogs/${post.slug}</link>
            <guid>https://wisnupram.com/blogs/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            ${post.updated ? `<atom:updated>${new Date(post.updated).toISOString()}</atom:updated>` : ''}
            ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n            ') : ''}
            <author>${post.author?.name || 'wisnupramoedya'}</author>
        </item>`
			)
			.join('')}
    </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Cache-Control': 'max-age=3600' // Cache selama 1 jam
		}
	});
};