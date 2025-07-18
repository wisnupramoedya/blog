export interface BlogProps {
  posts: PostType[];
  pageInfo: PageInfoType;
  class?: string;
}

interface PostType {
  id: string;
  slug: string;
  title: string;
  tags: { slug: string }[] | null;
  coverImage: {
    url: string;
  } | null;
}

interface PageInfoType {
  hasNextPage: boolean | null;
  endCursor: string | null;
}