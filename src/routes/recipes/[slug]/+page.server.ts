// src/routes/recipes/[slug]/+page.server.ts
import { error } from '@sveltejs/kit';
import { getRecipeBySlug, getSiteSettings } from '$lib/server/content';

export const prerender = true;

// Small local type just to keep TS happy, no ./\$types imports needed
type LoadEvent = {
	params: {
		slug: string;
	};
};

export function load({ params }: LoadEvent) {
	const slug = params.slug;

	const settings = getSiteSettings();
	const recipe = getRecipeBySlug(slug);

	if (!recipe || recipe.draft) {
		throw error(404, 'Recipe not found');
	}

	return {
		settings,
		recipe
	};
}
