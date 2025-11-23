// scripts/process-images.mjs
import fs from 'node:fs/promises';
import { watch as fsWatch } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';

function toWebPath(rel) {
    // Turn Windows backslashes into segments, encode each part, then join with /
    const segments = rel.split(path.sep);
    const encoded = segments.map(encodeURIComponent).join('/');
    return '/uploads/' + encoded;
}
function toEncodedRelPath(rel) {
    // Split on platform separator, encode each path segment safely
    const segments = rel.split(path.sep).map(encodeURIComponent);
    return segments.join('/');
}
// ----------------------------------------------------
// CONFIG – update these and almost nothing else
// ----------------------------------------------------
const CONFIG = {
    // Original Sveltia uploads
    SRC: '/content/static/uploads',

    // Processed images go here (Svelte app)
    OUT: '../../static/uploads',

    // Accepted input types
    INPUT_EXTS: new Set(['.jpg', '.jpeg', '.png', '.webp']),

    // Responsive widths
    SIZES: [460, 800, 1200],

    // Per-output format settings
    FORMATS: {
        avif: {
            enabled: true,
            sizes: [460, 800, 1200],
            options: { quality: 70 }
        },
        webp: {
            enabled: true,
            sizes: [460, 800, 1200],
            options: { quality: 80 }
        },
        jpg: {
            enabled: true,
            sizes: [800], // single fallback, consistent with SIZES
            options: { quality: 82, mozjpeg: true }
        }
    },

    // Cache + metadata files
    CACHE_FILE: '.image-cache.json',
    META_FILE: './src/lib/image-sizes.json'
};
// ----------------------------------------------------

const { SRC, OUT, INPUT_EXTS, SIZES, FORMATS, CACHE_FILE, META_FILE } = CONFIG;

// Load caches
let cache = {};
try {
    cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
} catch {
    cache = {};
}

let metaMap = {};
try {
    metaMap = JSON.parse(await fs.readFile(META_FILE, 'utf8'));
} catch {
    metaMap = {};
}

// Helpers
function sha1(buf) {
    return crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
}

async function* walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            yield* walk(full);
        } else {
            yield full;
        }
    }
}

function stripExt(file) {
    return file.replace(/\.[^.]+$/, '');
}

function outPath(base, width, ext) {
    const name = stripExt(base);
    return path.join(OUT, `${name}.${width}.${ext}`);
}

// Counters
let built = 0;
let skipped = 0;

async function processOne(file) {
    const rel = path.relative(SRC, file);
    const buf = await fs.readFile(file);
    const digest = sha1(buf);

    // Cache check
    if (cache[rel] === digest) {
        skipped++;
        return;
    }

    // 1) Copy original
    const originalOut = path.join(OUT, rel);
    await fs.mkdir(path.dirname(originalOut), { recursive: true });
    await fs.writeFile(originalOut, buf);

    // 2) Base sharp pipeline
    const img = sharp(buf).rotate();

    // 3) Extract intrinsic size
    const metadata = await img.metadata();
    const width = metadata.width ?? null;
    const height = metadata.height ?? null;

    // Store as web path (serving from /uploads/)
    // Store as URL-encoded web path (serving from /uploads/)
const encodedRel = toEncodedRelPath(rel);
const webPath = '/uploads/' + encodedRel;
metaMap[webPath] = { width, height };

    // 4) Build variants
    for (const widthPx of SIZES) {
        for (const [ext, cfg] of Object.entries(FORMATS)) {
            if (!cfg.enabled) continue;
            if (!cfg.sizes.includes(widthPx)) continue;

            const pipeline = img.clone().resize({
                width: widthPx,
                withoutEnlargement: true
            });

            const out = outPath(rel, widthPx, ext);
            const tmp = out + '.tmp';
            await fs.mkdir(path.dirname(out), { recursive: true });

            if (ext === 'webp') {
                await pipeline.webp(cfg.options).toFile(tmp);
            } else if (ext === 'avif') {
                await pipeline.avif(cfg.options).toFile(tmp);
            } else if (ext === 'jpg' || ext === 'jpeg') {
                await pipeline.jpeg(cfg.options).toFile(tmp);
            } else {
                continue;
            }

            await fs.rename(tmp, out);
        }
    }

    cache[rel] = digest;
    built++;
    console.log('built:', rel);
}

async function saveState() {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));

    // ensure directory for metadata exists
    await fs.mkdir(path.dirname(META_FILE), { recursive: true });
    await fs.writeFile(META_FILE, JSON.stringify(metaMap, null, 2));
}

async function runOnce() {
    for await (const file of walk(SRC)) {
        if (INPUT_EXTS.has(path.extname(file).toLowerCase())) {
            await processOne(file);
        }
    }
    await saveState();
    console.log(`done — built ${built}, skipped ${skipped}`);
}

async function runWatch() {
    console.log(`watching ${SRC} for new or changed images…`);

    // Initial run
    await runOnce();
    built = 0;
    skipped = 0;

    fsWatch(SRC, { recursive: true }, async (_event, filename) => {
        if (!filename) return;
        const full = path.join(SRC, filename);
        const ext = path.extname(full).toLowerCase();
        if (!INPUT_EXTS.has(ext)) return;

        try {
            await new Promise((r) => setTimeout(r, 100));
            await processOne(full);
            await saveState();
        } catch (err) {
            console.error('Error processing', full, err);
        }
    });
}

// CLI mode
if (process.argv.includes('--watch')) {
    await runWatch();
} else {
    await runOnce();
}
