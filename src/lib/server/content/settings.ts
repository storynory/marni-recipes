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
	strapline?: string;
	siteTagline?: string;

	siteIntroTitle?: string;
	siteIntro?: string;

	blogPageIntro?: string;
	seasonsPageIntro?: string;
	recipesPageIntro?: string;

	portrait?: string;
	featuredSeason?: string;
	fontFamily?: string;

	activeColourScheme?: ColourScheme | null;
};

const DEFAULT_SCHEME: ColourScheme = {
	slug: 'default',
	title: 'Default',
	prime: '#e3d2b7',
	accent: '#00634e',
	second: '#f4e8d7',
	gray: '#f8f9fa',
	text: '#333333'
};

function createColourScheme(slug: string, data: any): ColourScheme {
	return {
		slug,
		title: data.title ?? 'Unnamed Scheme',
		prime: data.prime ?? DEFAULT_SCHEME.prime,
		accent: data.accent ?? DEFAULT_SCHEME.accent,
		second: data.second ?? DEFAULT_SCHEME.second,
		gray: data.gray ?? DEFAULT_SCHEME.gray,
		text: data.text ?? DEFAULT_SCHEME.text
	};
}

export function getSiteSettings(): SiteSettings {
	const filePath = path.join(CONTENT_ROOT, 'settings', 'site.md');

	let data: any = {};
	if (fs.existsSync(filePath)) {
		data = readMarkdownFile(filePath).data ?? {};
	}

	if (data.main) {
		console.warn('[settings.ts] WARNING: Old "main:" object detected. Config is now flat.');
	}

	const tagline =
		data.siteTagline ??
		data.strapline ??
		'';

	// Load colour schemes
	const schemesFolder = path.join(CONTENT_ROOT, 'colour-schemes');
	let schemes: ColourScheme[] = [];

	if (fs.existsSync(schemesFolder)) {
		const files = fs.readdirSync(schemesFolder).filter(f => f.endsWith('.md'));
		for (const filename of files) {
			const md = readMarkdownFile(path.join(schemesFolder, filename));
			const schemeData = md.data ?? {};
			const slug = filename.replace(/\.md$/, '');
			schemes.push(createColourScheme(slug, schemeData));
		}
	}

	console.log("[settings.ts] Schemes found:", schemes.map(s => s.slug));

	// Case-insensitive match (correct)
	const activeSlug: string | undefined = data.activeScheme;

	let activeColourScheme = null;

	if (activeSlug) {
		activeColourScheme =
			schemes.find(s => s.slug.toLowerCase() === activeSlug.toLowerCase()) ?? null;
	}

	if (!activeColourScheme) {
		activeColourScheme = DEFAULT_SCHEME;
	}

	console.log("[settings.ts] Active scheme:", activeSlug);
	console.log("[settings.ts] Active colours:", activeColourScheme);

	return {
		siteTitle: data.siteTitle ?? 'Marni’s Cooking Website',
		strapline: data.strapline ?? tagline,
		siteTagline: tagline,

		siteIntroTitle: data.siteIntroTitle,
		siteIntro: data.siteIntro,

		blogPageIntro: data.blogPageIntro ?? 'Diary of a girl who loves to cook and bake',
		seasonsPageIntro: data.seasonsPageIntro,
		recipesPageIntro: data.recipesPageIntro,

		portrait: data.portrait,
		featuredSeason: data.featuredSeason,

		fontFamily: data.fontFamily ?? 'Comfortaa',

		activeColourScheme
	};
}

