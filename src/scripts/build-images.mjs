import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import crypto from 'node:crypto';

// ---- configuration ----
const SRC = '../sveltia/static/uploads';
const OUT = './static/uploads';
const SIZES = [320, 640, 960, 1280, 1600];
const FORMATS = ['webp']; // add 'jpg' if you want fallbacks
const QUALITY = 82;
const CACHE_FILE = '.image-cache.json';
// ---- end configuration ----

// load existing cache (hashes)
let cache = {};
try {
  cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
} catch {
  cache = {};
}

function sha1(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function stripExt(file) {
  return file.replace(/\.[^.]+$/, '');
}

function outPath(base, width, ext) {
  const name = stripExt(base);
  return path.join(OUT, `${name}.${width}.${ext}`);
}

let built = 0;
let skipped = 0;

async function processOne(file) {
  const rel = path.relative(SRC, file);
  const buf = await fs.readFile(file);
  const digest = sha1(buf);

  // skip if hash hasn't changed
  if (cache[rel] === digest) {
    skipped++;
    return;
  }

  const img = sharp(buf).rotate();

  for (const width of SIZES) {
    for (const ext of FORMATS) {
      const pipeline = img.clone().resize({ width, withoutEnlargement: true });
      const out = outPath(rel, width, ext);
      const tmp = out + '.tmp';
      await fs.mkdir(path.dirname(out), { recursive: true });

      if (ext === 'webp') {
        await pipeline.webp({ quality: QUALITY }).toFile(tmp);
      } else if (ext === 'jpg') {
        await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
      }

      await fs.rename(tmp, out); // atomic rename
    }
  }

  cache[rel] = digest;
  built++;
  console.log('built:', rel);
}

for await (const file of walk(SRC)) {
  if (INPUT_EXTS.has(path.extname(file).toLowerCase())) {
    await processOne(file);
  }
}

// save updated cache
await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));

console.log(`done — built ${built}, skipped ${skipped}`);
