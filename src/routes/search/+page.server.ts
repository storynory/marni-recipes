// website/src/routes/search/+page.server.ts
import type { PageServerLoad } from './$types';

import {
	getAllRecipes,
	getAllTags,
	getAllSeasons,
	getSiteSettings
} from '$lib/server/content';

type SearchRecipe = {
	slug: string;
	title: string;
	date: string | null;
	thumbnail: string | null;

	// relation slugs
	tags: string[];
	seasons: string[];

	// human-readable titles for UI / filters
	tagTitles: string[];
	seasonTitles: string[];

	// flattened text for full-text search
	searchText: string;
};

export const prerender = true; // make sure this becomes static output

export const load: PageServerLoad = async () => {
	const settings = getSiteSettings();

	const allRecipes = getAllRecipes().filter((r) => !r.draft);
	const allTags = getAllTags().filter((t) => !t.draft);
	const allSeasons = getAllSeasons().filter((s) => !s.draft);

	const tagsBySlug = new Map(allTags.map((t) => [t.slug, t]));
	const seasonsBySlug = new Map(allSeasons.map((s) => [s.slug, s]));

	const index: SearchRecipe[] = allRecipes.map((r) => {
		const tagTitles = r.tags.map((slug) => tagsBySlug.get(slug)?.title ?? slug);
		const seasonTitles = r.seasons.map(
			(slug) => seasonsBySlug.get(slug)?.title ?? slug
		);

		const searchText = [
			r.title,
			r.ingredients?.join(' ') ?? '',
			r.instructions?.join(' ') ?? '',
			r.body ?? ''
		]
			.join('\n')
			.replace(/\s+/g, ' ')
			.trim();

		return {
			slug: r.slug,
			title: r.title,
			date: r.date ?? null,
			thumbnail: r.thumbnail ?? null,
			tags: r.tags,
			seasons: r.seasons,
			tagTitles,
			seasonTitles,
			searchText
		};
	});

	return {
		settings,
		index,      // full list of recipes for the client
		tags: allTags,
		seasons: allSeasons
	};
};
