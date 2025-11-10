ChatGPT said:

Here’s a ready-to-use checklist so when you come back to this you can spin it up fast and without hunting for details.

🧱 Folder & repo layout
/var/www/yourrepo/
│
├─ src/                   # your SvelteKit source
│   ├─ routes/
│   └─ scripts/
│       └─ build-images.mjs
│
├─ static/
│   ├─ uploads/           # originals from Sveltia
│   └─ cdn/               # generated variants (ignored by git)
│
├─ package.json           # includes "build:images" + "build"
├─ sveltia.config.yml     # CMS config
├─ .image-cache.json      # Sharp cache (auto-created)
├─ deploy.sh              # main deploy script
└─ .gitignore             # add: static/cdn, .image-cache.json, node_modules

⚙️ Required software on your VPS

Install once:

sudo apt update
sudo apt install -y git nodejs npm rclone
npm install -g wrangler
npm install        # to get sharp and deps


Optional extras: pm2 or systemd service if you want a persistent webhook.

🔐 Environment variables

Add to /etc/environment or export before running:

CLOUDFLARE_API_TOKEN=xxxxxxxx
CLOUDFLARE_ACCOUNT_ID=yyyyyyyy
R2_ACCOUNT_ID=zzzzzzzzzz
R2_ACCESS_KEY_ID=aaaaaaaa
R2_SECRET_ACCESS_KEY=bbbbbbbb
R2_BUCKET=cdn-bucket-name


These let your script and rclone talk directly to Cloudflare.

📜 deploy.sh essentials
#!/bin/bash
set -e
cd /var/www/yourrepo

echo "🧁 Building images..."
node src/scripts/build-images.mjs

echo "🪣 Syncing R2..."
rclone sync static/cdn r2:${R2_BUCKET}/cdn \
  --s3-provider Cloudflare \
  --s3-endpoint https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com \
  --checksum --fast-list

echo "🏗️ Building SvelteKit..."
npm run build

echo "☁️ Deploying to Cloudflare Pages..."
wrangler pages deploy build --project your-project-name

echo "✅ Done."


Permissions:

chmod +x deploy.sh

🔁 Optional automation

Later, when you want it fully automatic:

Add a small webhook listener (Node/Express or Caddy webhook plugin).

GitHub → webhook → triggers:

git pull && ./deploy.sh


Protect with a secret token or Cloudflare Access.

🧠 Notes & best practice

static/cdn should be .gitignored — let R2 be your source of truth for variants.

Keep Sharp’s .image-cache.json on disk to avoid re-encoding.

Use Cache-Control: public, max-age=31536000, immutable for all R2 variants.

Add "build": "npm run build:images && vite build" in package.json.

You can test a deploy any time with ./deploy.sh — it’s idempotent.

When you’re ready to wire it up, all you’ll need are:

A valid Cloudflare Pages project (empty static site is fine).

The API token and account IDs above.

One git pull && ./deploy.sh after a Sveltia publish.

Would you like me to make a short example of the .gitignore and the package.json scripts section so you can drop those straight in later?