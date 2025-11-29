// src/lib/server/content/settings.ts
import fs from 'fs';
import path from 'path';
import { CONTENT_ROOT, readMarkdownFile } from './core';

export type SiteSettings = {
	siteTitle: string;

	// old name still used in +page.svelte <svelte:head>
	strapline?: string;

	// new explicit name from YAML (siteTagline)
	siteTagline?: string;

	// optional hero title and intro text
	siteIntroTitle?: string;
	siteIntro?: string;

	// page intros from YAML
	blogPageIntro?: string;
	seasonsPageIntro?: string;
	recipesPageIntro?: string;

	// path to hero portrait image
	portrait?: string;

	// slug of featured season, e.g. "christmas" or "easter"
	featuredSeason?: string;

	fontFamily?: string;
};

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	if (!fs.existsSync(filePath)) {
		// sensible defaults if settings file is missing
		return {
			siteTitle: 'Marni’s Cooking Website',
			strapline: '',
			siteTagline: '',
			siteIntroTitle: '',
			siteIntro: '',
			blogPageIntro: 'Diary of a girl who loves to cook and bake',
			seasonsPageIntro: '',
			recipesPageIntro: '',
			portrait: '',
			featuredSeason: '',
			fontFamily: 'Comfortaa'
		};
	}

	const { data } = readMarkdownFile(filePath);

	const tagline =
		(data.siteTagline as string | undefined) ??
		(data.strapline as string | undefined) ??
		'';

	return {
		siteTitle: (data.siteTitle as string) ?? 'Marni’s Cooking Website',

		// keep old "strapline" for backwards compatibility
		strapline: (data.strapline as string | undefined) ?? tagline,

		// canonical name going forward
		siteTagline: tagline,

		siteIntroTitle: data.siteIntroTitle as string | undefined,
		siteIntro: data.siteIntro as string | undefined,

		blogPageIntro:
			(data.blogPageIntro as string | undefined) ??
			'Diary of a girl who loves to cook and bake',

		seasonsPageIntro: data.seasonsPageIntro as string | undefined,
		recipesPageIntro: data.recipesPageIntro as string | undefined,

		portrait: data.portrait as string | undefined,
		featuredSeason: data.featuredSeason as string | undefined,
		fontFamily: (data.fontFamily as string | undefined) ?? 'Comfortaa'
	};
}

