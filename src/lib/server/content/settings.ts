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

	// hero intro text
	siteIntro?: string;

	// path to hero portrait image
	portrait?: string;
BlogPageintro?: string;	
  // slug of featured season, e.g. "christmas" or "easter"
	featuredSeason?: string;

fontFamily?: string;
};

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	if (!fs.existsSync(filePath)) {
		// sensible defaults
		return {
			siteTitle: 'Marni’s Cooking Website',
			strapline: '',
			siteTagline: '',
			siteIntro: '',
			portrait: '',
			featuredSeason: '',
      BlogPageintro: 'Diary of a girl who loves to cook and bake',
		  fontFamily: "",   
    };
	}

	const { data } = readMarkdownFile(filePath);

	const tagline =
		(data.siteTagline as string | undefined) ??
		(data.strapline as string | undefined) ??
		'';

	return {
		siteTitle: (data.siteTitle as string) ?? 'Marni’s Cooking Website',
		strapline: tagline,
		siteTagline: tagline,
		siteIntro: data.siteIntro as string | undefined,
		portrait: data.portrait as string | undefined,
		featuredSeason: data.featuredSeason as string | undefined,
   BlogPageintro: data.BlogPageintro as string ?? "diary of  girl who loves to cook",
    fontFamily: data.fontFamily as string ?? "Comfortaa"
	};
}
