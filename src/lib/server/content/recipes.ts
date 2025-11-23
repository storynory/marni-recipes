// src/lib/server/content/recipes.ts
import fs from 'fs';
import path from 'path';
import { collectionPath, readMarkdownFile, listMarkdownFiles, toHtml } from './core';
import type { Tag } from './tags';
import { getAllTags } from './tags';

export type Recipe = {
	slug: string;
	title: string;
	date?: string;
	thumbnail?: string;
	body?: string;
	html?: string;

	ingredients: string[];
	instructions: string[];

	draft?: boolean;

	// recipe -> multiple tag slugs
	tags: string[];

	// recipe -> multiple season slugs
	seasons: string[];

	// optional helper to attach full tag objects
	tagObjects?: Tag[];
};

export function getAllRecipes(): Recipe[] {
	const dir = collectionPath('recipes');

	if (!fs.existsSync(dir)) return [];

	const files = listMarkdownFiles(dir);

	const allTags = getAllTags();
	const tagsBySlug = new Map(allTags.map((t) => [t.slug, t]));

	const recipes: Recipe[] = files.map((file) => {
		const slug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);

		const { data, content } = readMarkdownFile(fullPath);
		const html = toHtml(content);

		const ingredients = (data.ingredients as string[] | undefined) ?? [];
		const instructions = (data.instructions as string[] | undefined) ?? [];

		const tags = (data.tags as string[] | undefined) ?? [];
		const seasons = (data.seasons as string[] | undefined) ?? [];

		const tagObjects = tags.map((tagSlug) => tagsBySlug.get(tagSlug)).filter(Boolean) as Tag[];

		return {
			slug,
			title: (data.title as string) ?? slug,
			date: data.date as string | undefined,
			thumbnail: data.thumbnail as string | undefined,
			body: content,
			html,
			ingredients,
			instructions,
			draft: (data.draft as boolean | undefined) ?? false,
			tags,
			seasons,
			tagObjects
		};
	});

	// newest first (same as original)
	recipes.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | null {
	const dir = collectionPath('recipes');

	const fileMd = path.join(dir, `${slug}.md`);
	const fileMarkdown = path.join(dir, `${slug}.markdown`);

	let filePath: string | null = null;
	if (fs.existsSync(fileMd)) filePath = fileMd;
	else if (fs.existsSync(fileMarkdown)) filePath = fileMarkdown;

	if (!filePath) return null;

	const { data, content } = readMarkdownFile(filePath);
	const html = toHtml(content);

	const ingredients = (data.ingredients as string[] | undefined) ?? [];
	const instructions = (data.instructions as string[] | undefined) ?? [];
	const tags = (data.tags as string[] | undefined) ?? [];
	const seasons = (data.seasons as string[] | undefined) ?? [];

	const allTags = getAllTags();
	const tagsBySlug = new Map(allTags.map((t) => [t.slug, t]));
	const tagObjects = tags.map((tagSlug) => tagsBySlug.get(tagSlug)).filter(Boolean) as Tag[];

	return {
		slug,
		title: (data.title as string) ?? slug,
		date: data.date as string | undefined,
		thumbnail: data.thumbnail as string | undefined,
		body: content,
		html,
		ingredients,
		instructions,
		draft: (data.draft as boolean | undefined) ?? false,
		tags,
		seasons,
		tagObjects
	};
}
