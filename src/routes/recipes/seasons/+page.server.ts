// src/routes/recipes/seasons/+page.server.ts
import type { PageServerLoad } from './$types';
import { getAllRecipes, getAllSeasons, getSiteSettings } from '$lib/server/content';

export const prerender = true;

export const load: PageServerLoad = () => {
	const settings = getSiteSettings();
	const allRecipes = getAllRecipes().filter((r) => !r.draft);

	const seasons = getAllSeasons().filter((s) => !s.draft);

	// Build groups: one per season, with its recipes
	const seasonGroups = seasons
		.map((season) => {
			const recipes = allRecipes.filter(
				(r) => Array.isArray(r.seasons) && r.seasons.includes(season.slug)
			);

			return {
				slug: season.slug,
				title: season.title,
				description: season.description,
				image: season.image,
				recipes
			};
		})
		// optional: hide empty seasons
		.filter((group) => group.recipes.length > 0);

	return {
		settings,
		seasonGroups
	};
};
