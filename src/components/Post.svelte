<script lang="ts">
  // Props yang diterima dari parent component
  let { post } = $props();

  // Function untuk format angka views
  function formatViews(views: number) {
    if (views >= 1000000) {
      return Math.floor(views / 1000000) + 'M';
    } else if (views >= 1000) {
      return Math.floor(views / 1000) + 'K';
    }
    return views.toString();
  }

  // Function untuk convert markdown ke HTML sederhana
  function markdownToHtml(markdown: string) {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l|p])/gm, '<p class="mb-4">')
      .replace(/(<p class="mb-4">.*?)\n(?!<)/gm, '$1</p>')
      .replace(/<p class="mb-4"><\/p>/g, '');
  }
</script>


<article class="text-white px-8 md:px-32 mb-48">
  <!-- Header image placeholder -->
  <div class="relative w-full h-48 rounded-t-4xl overflow-hidden">
    <img 
      src={post.coverImage.url} 
      alt={post.title}
      class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
  
  <!-- Content container -->
  <div class="px-6 py-8">
    <!-- Title -->
    <h1 class="mb-4">{post.title}</h1>
    
    <!-- Meta information -->
    <div class="flex items-center gap-8 mb-6">
      <!-- Views -->
      <div class="flex items-center gap-2">
        <span class="icon-[fa6-regular--eye] w-4 h-4"></span>
        <span>{formatViews(post.views)} views</span>
      </div>
      
      <!-- Tags -->
      <div class="flex gap-2">
        {#each post.tags as tag}
          <p class="text-yellow-400 hover:text-yellow-300 cursor-pointer">
            #{tag.slug}
          </p>
        {/each}
      </div>
    </div>
    
    <!-- Content -->
    <div class="prose prose-invert max-w-none">
      {@html markdownToHtml(post.content.markdown)}
    </div>
  </div>
</article>