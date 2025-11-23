// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { getAllRecipes, getSiteSettings, getAllSeasons } from '$lib/server/content'; // adjust path

export const load: PageServerLoad = async () => {
	const settings = getSiteSettings();

	// All non-draft recipes
	const allRecipes = getAllRecipes().filter((r) => !r.draft);

	// All non-draft seasons
	const seasons = getAllSeasons().filter((s) => !s.draft);

	// Use a subset for tagged sections on the homepage
	const featuredRecipes = allRecipes.slice(0, 40); // tweak as you like

	return {
		settings,
		seasons,
		allRecipes,
		featuredRecipes
	};
};
