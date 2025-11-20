import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Keep Marked synchronous
marked.setOptions({ async: false });

const CONTENT_ROOT = path.resolve('../content');

// ---------- Types ----------

export type Tag = {
	slug: string;
	title: string;
	description?: string;
	image?: string;
	draft?: boolean;
};

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

	// new: recipe -> multiple tag slugs
	tags: string[];

	// optional helper to attach full tag objects
	tagObjects?: Tag[];
};

export type SiteSettings = {
	siteTitle: string;
	strapline?: string;
};

// ---------- Helpers ----------

function collectionPath(collection: string) {
	return path.join(CONTENT_ROOT, collection);
}

function readMarkdownFile(filePath: string) {
	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);
	return { data, content };
}

// ---------- Tags ----------

export function getAllTags(): Tag[] {
	const dir = collectionPath('tags');

	if (!fs.existsSync(dir)) return [];

	const files = fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md') || file.endsWith('.markdown'));

	const tags: Tag[] = files.map((file) => {
		const fileSlug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);
		const { data } = readMarkdownFile(fullPath);

		// slug field OR fallback to filename
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

// ---------- Recipes ----------

export function getAllRecipes(): Recipe[] {
	const dir = collectionPath('recipes');

	if (!fs.existsSync(dir)) return [];

	const files = fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md') || file.endsWith('.markdown'));

	const allTags = getAllTags();
	const tagsBySlug = new Map(allTags.map((t) => [t.slug, t]));

	const recipes: Recipe[] = files.map((file) => {
		const slug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);

		const { data, content } = readMarkdownFile(fullPath);
		const html = content ? (marked.parse(content) as string) : '';

		// simple string lists from YAML
		const ingredients = (data.ingredients as string[] | undefined) ?? [];
		const instructions = (data.instructions as string[] | undefined) ?? [];

		// multi tag relation field -> ["breakfast", "lunch"]
		const tags = (data.tags as string[] | undefined) ?? [];

		const tagObjects = tags.map((slug) => tagsBySlug.get(slug)).filter(Boolean) as Tag[];

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
			tagObjects
		};
	});

	// newest first
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
	const html = content ? (marked.parse(content) as string) : '';

	const ingredients = (data.ingredients as string[] | undefined) ?? [];
	const instructions = (data.instructions as string[] | undefined) ?? [];
	const tags = (data.tags as string[] | undefined) ?? [];

	// attach tag objects
	const allTags = getAllTags();
	const tagsBySlug = new Map(allTags.map((t) => [t.slug, t]));
	const tagObjects = tags.map((slug) => tagsBySlug.get(slug)).filter(Boolean) as Tag[];

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
		tagObjects
	};
}

// ---------- Settings ----------

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	if (!fs.existsSync(filePath)) {
		return {
			siteTitle: 'Marni’s Cooking Website',
			strapline: ''
		};
	}

	const { data } = readMarkdownFile(filePath);

	return {
		siteTitle: (data.siteTitle as string) ?? 'Marni’s Cooking Website',
		strapline: data.strapline as string | undefined
	};
}
