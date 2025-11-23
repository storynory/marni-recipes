import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Keep Marked synchronous
marked.setOptions({ async: false });

export const CONTENT_ROOT = path.resolve('../content');

export function collectionPath(collection: string) {
	return path.join(CONTENT_ROOT, collection);
}

export function readMarkdownFile(filePath: string) {
	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);
	return { data, content };
}

export function listMarkdownFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((file) => file.endsWith('.md') || file.endsWith('.markdown'));
}

export function toHtml(markdown: string): string {
	return markdown ? (marked.parse(markdown) as string) : '';
}
