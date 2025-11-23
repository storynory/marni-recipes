// website/src/routes/blog/+page.server.ts
import type { PageServerLoad } from './$types';
import { getSiteSettings, getAllPagePosts } from '$lib/server/content';

export const load: PageServerLoad = async () => {
	const settings = getSiteSettings();
	const posts = getAllPagePosts();

	return {
		settings,
		posts
	};
};
