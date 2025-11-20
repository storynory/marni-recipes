// src/routes/+page.server.ts
import { getAllRecipes, getSiteSettings } from '$lib/server/content';

export const prerender = true;

export function load() {
	const settings = getSiteSettings();
	const recipes = getAllRecipes().filter((r) => !r.draft);

	// e.g. first 4 on the homepage
	const featuredRecipes = recipes.slice(0, 24);

	return {
		settings,
		featuredRecipes
	};
}
