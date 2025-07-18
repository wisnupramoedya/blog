export interface PostProps {
  class?: string
  post: PostDetailType;
}

export interface PostDetailType {
  id: string;
  slug: string;
  title: string;
  seo: {
    title: string | null;
    description: string | null;
  } | null
  tags: {
    slug: string;
  }[] | null
  coverImage: {
    url: string;
  } | null;
  content: {
    markdown: string;
  }
  features: {
    tableOfContents: {
      items: {
        slug: string;
        title: string;
      }[]
    }
  }
}