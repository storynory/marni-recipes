// src/lib/server/content/tags.ts
import path from 'path';
import { collectionPath, readMarkdownFile, listMarkdownFiles } from './core';

export type Tag = {
	slug: string;
	title: string;
	description?: string;
	image?: string;
	draft?: boolean;
};

export function getAllTags(): Tag[] {
	const dir = collectionPath('tags');

	const files = listMarkdownFiles(dir);

	const tags: Tag[] = files.map((file) => {
		const fileSlug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);
		const { data } = readMarkdownFile(fullPath);

		const slug = (data.slug as string | undefined) ?? fileSlug;

		return {
			slug,
			title: (data.title as string) ?? slug,
			description: data.description as string | undefined,
			image: data.image as string | undefined,
			draft: (data.draft as boolean | undefined) ?? false
		};
	});

	// sort alphabetically
	tags.sort((a, b) => a.title.localeCompare(b.title));

	return tags;
}

export function getTagBySlug(slug: string): Tag | null {
	const tags = getAllTags();
	const found = tags.find((t) => t.slug === slug);
	return found ?? null;
}
