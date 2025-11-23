// src/routes/+layout.server.ts
import { getSiteSettings } from '$lib/server/content';

export const load = () => {
	const settings = getSiteSettings();

	return {
		settings
	};
};