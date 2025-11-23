// website/src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getSiteSettings, getAllBlogPosts } from '$lib/server/content';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const settings = getSiteSettings();
	const posts = getAllBlogPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return {
		settings,
		post
	};
};
