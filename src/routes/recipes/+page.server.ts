// website/src/routes/recipes/+page.server.ts
import { getAllRecipes, getSiteSettings } from '$lib/server/content';

export const prerender = true;

export function load() {
	const settings = getSiteSettings();
	const recipes = getAllRecipes().filter((r) => !r.draft);

	return {
		settings,
		recipes
	};
}
