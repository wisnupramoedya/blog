import type { BlogPost, TableOfContentsItem } from '@/lib/types/blog';

export function calculateReadingTime(html: string): number {
	const wordsPerMinute = 200;
	const textLength = html.replace(/<[^>]*>/g, '').split(' ').length;
	return Math.ceil(textLength / wordsPerMinute);
}

export function generateTOC(html: string): TableOfContentsItem[] {
	const headings: TableOfContentsItem[] = [];

	// Updated regex to capture the entire heading content, including nested HTML
	const regex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/g;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(html)) !== null) {
		const level = parseInt(match[1]);
		const id = match[2];
		const htmlContent = match[3];

		// Extract plain text from HTML content, removing all HTML tags
		const text = htmlContent
			.replace(/<[^>]*>/g, '') // Remove all HTML tags
			.replace(/&amp;/g, '&') // Decode HTML entities
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#x27;/g, "'")
			.replace(/&#x2F;/g, '/')
			.trim();

		headings.push({
			level,
			id,
			text
		});
	}

	return headings;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
	return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}