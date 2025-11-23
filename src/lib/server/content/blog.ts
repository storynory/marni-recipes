// src/lib/server/content/blog.ts
import fs from 'fs';
import path from 'path';
import { collectionPath, readMarkdownFile, listMarkdownFiles, toHtml } from './core';

export type BlogPost = {
	slug: string;
	title: string;
	date?: string;
	thumbnail?: string;
	body?: string;
	html?: string;
	excerpt?: string;
	draft?: boolean;
};

export function getAllBlogPosts(): BlogPost[] {
	// Matches your Sveltia folder: "blog"
	const dir = collectionPath('blog');

	if (!fs.existsSync(dir)) return [];

	const files = listMarkdownFiles(dir);

	const posts: BlogPost[] = files.map((file) => {
		const slug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);

		const { data, content } = readMarkdownFile(fullPath);
		const html = toHtml(content);

		const draft = (data.draft as boolean | undefined) ?? false;

		const frontExcerpt = (data.excerpt as string | undefined)?.trim();

		let derivedExcerpt = '';
		if (!frontExcerpt) {
			const lines = content
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean);

			const firstLine = lines[0] ?? '';
			derivedExcerpt =
				firstLine.length > 220
					? `${firstLine.slice(0, 200).trimEnd()}…`
					: firstLine;
		}

		const excerpt = frontExcerpt || derivedExcerpt;

		return {
			slug,
			title: (data.title as string) ?? slug,
			date: data.date as string | undefined,
			thumbnail: data.thumbnail as string | undefined,
			body: content,
			html,
			excerpt,
			draft
		};
	});

	// Filter out drafts and sort newest first
	return posts
		.filter((post) => !post.draft)
		.sort((a, b) => {
			if (!a.date && !b.date) return a.title.localeCompare(b.title);
			if (!a.date) return 1;
			if (!b.date) return -1;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
}
