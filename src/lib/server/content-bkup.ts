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

export type Season = {
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

	// recipe -> multiple tag slugs
	tags: string[];

	// recipe -> multiple season slugs
	seasons: string[];

	// optional helper to attach full tag objects
	tagObjects?: Tag[];
};

export type SiteSettings = {
	siteTitle: string;

	// old name still used in +page.svelte <svelte:head>
	strapline?: string;

	// new explicit name from YAML (siteTagline)
	siteTagline?: string;

	// hero intro text
	siteIntro?: string;

	// path to hero portrait image
	portrait?: string;

	// slug of featured season, e.g. "christmas" or "easter"
	featuredSeason?: string;
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

// ---------- Seasons ----------

export function getAllSeasons(): Season[] {
	const dir = collectionPath('seasons');

	if (!fs.existsSync(dir)) return [];

	const files = fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md') || file.endsWith('.markdown'));

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

		// multi season relation field -> ["christmas", "winter"]
		const seasons = (data.seasons as string[] | undefined) ?? [];

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
			seasons,
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
	const seasons = (data.seasons as string[] | undefined) ?? [];

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
		seasons,
		tagObjects
	};
}


// ---------- Blog ----------

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
	// (from website/ this points to repo-root/blog)
	const dir = path.resolve('../content/blog');

	if (!fs.existsSync(dir)) return [];

	const files = fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md') || file.endsWith('.markdown'));

	const posts: BlogPost[] = files.map((file) => {
		const slug = file.replace(/\.md$|\.markdown$/, '');
		const fullPath = path.join(dir, file);

		const { data, content } = readMarkdownFile(fullPath);
		const html = content ? (marked.parse(content) as string) : '';

		const draft = (data.draft as boolean | undefined) ?? false;

		// Prefer explicit front-matter excerpt if present
		const frontExcerpt = (data.excerpt as string | undefined)?.trim();

		// Otherwise, derive from first non-empty line of content
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
			// Note: in Sveltia/Decap, the markdown widget is stored as the file body,
			// not usually in data.body, so we use `content` as the source of truth.
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



// ---------- Settings ----------

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	if (!fs.existsSync(filePath)) {
		// sensible defaults
		return {
			siteTitle: 'Marni’s Cooking Website',
			strapline: '',
			siteTagline: '',
			siteIntro: '',
			portrait: '',
			featuredSeason: ''
		};
	}

	const { data } = readMarkdownFile(filePath);

	// prefer new field, fall back if you ever had 'strapline' directly in front matter
	const tagline =
		(data.siteTagline as string | undefined) ??
		(data.strapline as string | undefined) ??
		'';

	return {
		siteTitle: (data.siteTitle as string) ?? 'Marni’s Cooking Website',
		strapline: tagline,
		siteTagline: tagline,
		siteIntro: data.siteIntro as string | undefined,
		portrait: data.portrait as string | undefined,
		featuredSeason: data.featuredSeason as string | undefined
	};
}
