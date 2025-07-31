import type { PageInfo } from './api';
import type { BlogPost } from './blog';

export interface PostListProps {
	posts: BlogPost[];
	pageInfo?: PageInfo;
	class?: string;
}

export interface PostProps {
	meta: BlogPost;
	content: string;
	class?: string;
}

export interface PostContentProps {
	content: string;
}