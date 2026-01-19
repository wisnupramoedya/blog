# Wisnu Pramoedya Blog

Personal blog built with SvelteKit 5, Tailwind CSS 4, and MDsveX.

## Tech Stack

- **Framework**: [SvelteKit](https://svelte.dev/docs/kit) with Svelte 5
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Content**: [MDsveX](https://mdsvex.pngwn.io/) for Markdown/MDX support
- **Database**: [Supabase](https://supabase.com/) for view counts
- **Deployment**: [Vercel](https://vercel.com/) with ISR (Incremental Static Regeneration)
- **Comments**: [Giscus](https://giscus.app/) (GitHub Discussions)

## Features

- Blog posts written in Markdown with syntax highlighting
- Table of Contents (ToC) auto-generated from headings
- View counter per post
- GitHub Flavored Markdown support
- SEO optimized
- Dark mode support
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wisnupramoedya/blog.git
cd blog

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev

# Open in browser
npm run dev -- --open
```

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components
│   ├── data/
│   │   └── posts/      # Blog posts in Markdown
│   ├── server/         # Server-side utilities
│   ├── services/       # Client services (views, etc.)
│   ├── stores/         # Svelte stores
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── routes/
│   ├── api/            # API endpoints
│   └── blog/           # Blog pages
└── app.html
```

## Deployment

Lihat [DEPLOYMENT.md](DEPLOYMENT.md) untuk panduan lengkap:
- Setup Supabase (tabel, functions, API keys)
- Deploy ke Vercel
- Migrasi data views
- Troubleshooting

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type check with svelte-check |
| `npm run lint` | Run ESLint and Prettier check |
| `npm run format` | Format code with Prettier |

## License

MIT
