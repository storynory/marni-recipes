import path from 'path';
import { collectionPath, readMarkdownFile, listMarkdownFiles } from './core';

export type Season = {
	slug: string;
	title: string;
	description?: string;
	image?: string;
	draft?: boolean;
};

export function getAllSeasons(): Season[] {
	const dir = collectionPath('seasons');

	// If the folder doesn't exist yet, just return an empty list
	const files = listMarkdownFiles(dir);

	const seasons: Season[] = files.map((file) => {
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

	seasons.sort((a, b) => a.title.localeCompare(b.title));

	return seasons;
}
