// src/lib/server/content/settings.ts
import fs from 'fs';
import path from 'path';
import { CONTENT_ROOT, readMarkdownFile } from './core';

export type ColourScheme = {
	slug: string;
	title: string;
	prime: string;
	accent: string;
	second: string;
	gray: string;
	text: string;
};

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
  blogPageIntro?: string;	
  // slug of featured season, e.g. "christmas" or "easter"
	featuredSeason?: string;
recipesPageIntro: "",
fontFamily?: string;
activeColourScheme?: ColourScheme | null;
};

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	// --------------------------------
	// Load main settings
	// --------------------------------
	let data: any = {};
	if (fs.existsSync(filePath)) {
		data = readMarkdownFile(filePath).data ?? {};
	}

	const tagline =
		(data.siteTagline as string | undefined) ??
		(data.strapline as string | undefined) ??
		'';

	// --------------------------------
	// Load colour schemes (simple)
	// --------------------------------
	const schemesFolder = path.join(CONTENT_ROOT, 'colour-schemes');
	let schemes: ColourScheme[] = [];

	if (fs.existsSync(schemesFolder)) {
		for (const file of fs.readdirSync(schemesFolder)) {
			if (!file.endsWith('.md')) continue;

			const full = path.join(schemesFolder, file);
			const { data: scheme } = readMarkdownFile(full);
			const slug = file.replace(/\.md$/, '');

			schemes.push({
				slug,
				title: scheme.title,
				prime: scheme.prime,
				accent: scheme.accent,
				second: scheme.second,
				gray: scheme.gray,
				text: scheme.text
			});
		}
	}

	const activeSlug = data.main?.activeScheme as string | undefined;
	const activeColour = activeSlug
		? schemes.find((s) => s.slug === activeSlug) ?? null
		: null;

	// --------------------------------
	// Return settings
	// --------------------------------
	return {
		siteTitle: data.siteTitle ?? 'Marni’s Cooking Website',

		strapline: data.strapline ?? tagline,
		siteTagline: tagline,

		siteIntroTitle: data.siteIntroTitle,
		siteIntro: data.siteIntro,

		blogPageIntro:
			data.blogPageIntro ??
			'Diary of a girl who loves to cook and bake',

		seasonsPageIntro: data.seasonsPageIntro,
		recipesPageIntro: data.recipesPageIntro,

		portrait: data.portrait,
		featuredSeason: data.featuredSeason,
		fontFamily: data.fontFamily ?? 'Comfortaa',

		activeColourScheme: activeColour
	};
}

