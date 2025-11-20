// src/routes/recipes/tag/[tag]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllRecipes, getTagBySlug, getAllTags } from '$lib/server/content';

export const load: PageServerLoad = async ({ params }) => {
	const tagSlug = params.tag;

	const tag = getTagBySlug(tagSlug);

	if (!tag || tag.draft) {
		throw error(404, 'Tag not found');
	}

	const allRecipes = getAllRecipes();

	// only published recipes
	const visible = allRecipes.filter((recipe) => !recipe.draft);

	// filter by tag slug (e.g. "breakfast")
	const recipes = visible.filter((recipe) => recipe.tags.includes(tagSlug));

	// for the nav – all non-draft tags
	const tags = getAllTags().filter((t) => !t.draft);

	return {
		tag,
		recipes,
		tags,
		tagSlug
	};
};
