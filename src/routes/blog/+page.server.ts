// website/src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { getSiteSettings, getAllBlogPosts } from '$lib/server/content';

export const load: PageServerLoad = async () => {
	const settings = getSiteSettings();
	const posts = getAllBlogPosts();

	return {
		settings,
		posts
	};
};
