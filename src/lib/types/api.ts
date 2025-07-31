import type { BlogPost } from './blog';

export interface PageInfo {
	totalCount?: number;
	hasNextPage: boolean | null;
	endCursor: number;
}

export interface ApiResponse<T> {
	data: T;
	pageInfo?: PageInfo;
}

export interface ApiPosts {
	posts: BlogPost[];
}
