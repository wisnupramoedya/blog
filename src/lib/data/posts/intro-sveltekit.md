---
title: 'Pengenalan SvelteKit untuk Pemula'
description: 'Panduan lengkap memulai dengan SvelteKit dari dasar'
date: '2024-01-15'
updated: '2024-01-20'
author:
  name: wisnupramoedya
tags:
  - 'svelte'
  - 'javascript'
  - 'web-development'
  - 'tutorial'
featured: true
draft: false
cover: '/images/sveltekit-intro.webp'
readingTime: 8
seo:
  keywords: 'sveltekit, svelte, javascript, tutorial'
  canonical: 'https://wisnupramoedya.com/blog/intro-sveltekit'
---

# Pengenalan SvelteKit

SvelteKit adalah framework full-stack yang powerful...

## Fitur Utama

- ✅ Server-side rendering
- ✅ Static site generation
- ⬜ Streaming (coming soon)

| Feature        | SvelteKit | Next.js |
| -------------- | --------- | ------- |
| Bundle size    | Smaller   | Larger  |
| Learning curve | Easier    | Steeper |

```javascript
// Contoh kode dengan syntax highlighting
export function createCounter() {
	let count = 0;
	return {
		increment: () => ++count,
		get value() {
			return count;
		}
	};
}
```

> Note: Ini adalah blockquote dengan GitHub styling

~~Text yang dicoret~~ dan **text yang bold**.

# Example headings

## Sample Section

## This'll be a _Helpful_ Section About the Greek Letter Θ!

A heading containing characters not allowed in fragments, UTF-8 characters, two consecutive spaces between the first and second words, and formatting.

## This heading is not unique in the file

TEXT 1

## This heading is not unique in the file

TEXT 2

# Links to the example headings above

Link to the sample section: [Link Text](#sample-section).

Link to the helpful section: [Link Text](#thisll-be-a-helpful-section-about-the-greek-letter-Θ).

Link to the first non-unique section: [Link Text](#this-heading-is-not-unique-in-the-file).

Link to the second non-unique section: [Link Text](#this-heading-is-not-unique-in-the-file-1).
