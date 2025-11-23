// website/src/routes/recipes/seasons/[season]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllRecipes, getAllSeasons, getSiteSettings } from '$lib/server/content';

export const prerender = true;

export const load: PageServerLoad = ({ params }) => {
	const { season } = params; // slug from the URL, e.g. "christmas"

	const settings = getSiteSettings();
	const allSeasons = getAllSeasons().filter((s) => !s.draft);
	const allRecipes = getAllRecipes().filter((r) => !r.draft);

	const seasonObj = allSeasons.find((s) => s.slug === season);

	if (!seasonObj) {
		throw error(404, `Season "${season}" not found.`);
	}

	const recipes = allRecipes.filter(
		(r) => Array.isArray(r.seasons) && r.seasons.includes(seasonObj.slug)
	);

	// optional: 404 if no recipes match this season
	if (recipes.length === 0) {
		throw error(404, `No recipes found for season "${seasonObj.title}".`);
	}

	return {
		settings,
		season: seasonObj, // { slug, title, description, image, ... }
		recipes
	};
};
