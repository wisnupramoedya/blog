import type { Component } from 'svelte';

export interface Author {
	name: string;
	avatar?: string;
	bio?: string;
	social?: {
		twitter?: string;
		github?: string;
		linkedin?: string;
	};
}

export interface SEO {
	keywords?: string;
	canonical?: string;
	ogImage?: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	updated?: string;
	author?: Author;
	tags: string[];
	categories: string[];
	featured?: boolean;
	draft?: boolean;
	cover?: string;
	readingTime: number;
	seo?: SEO;
}

export interface TableOfContentsItem {
	level: number;
	id: string;
	text: string;
}

export interface BlogPostModule {
	metadata: Omit<BlogPost, 'slug'>;
	default: Component; // Svelte component
}
