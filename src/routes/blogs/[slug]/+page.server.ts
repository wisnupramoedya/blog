import { HASHNODE_HOSTNAME } from "$env/static/private";
import { GetPostBySlugQueryStore } from "$houdini";
import type { LoadEvent } from "@sveltejs/kit";

export const load = async (event: LoadEvent) => {
  const slug = event.params.slug;

  if (!slug) {
    return {
      status: 404,
      error: new Error("Blog post not found")
    };
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
      return {
        status: 404,
        error: new Error("Blog post not found")
      };
    }
  
    return {
      status: 200,
      body: {
        post: blogPost.data.publication.post,
      }
    };
    
  } catch (error) {
    console.error("Error fetching blog post data:", error);
    return {
      status: 500,
      error: new Error("Internal Server Error")
    };
  }
}