<script lang="ts">
	import imageMeta from '$lib/image-sizes.json';

	type PictureProps = {
		src: string;   // e.g. "/uploads/cakes/cake.jpg"
		alt: string;
		sizes?: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'sync' | 'auto';
		fetchpriority?: 'high' | 'low' | 'auto';
	};

	let {
		src,
		alt,
		sizes = '100vw',
		class: className = '',
		loading = 'lazy',
		decoding = 'async',
		fetchpriority = 'auto'
	}: PictureProps = $props();

	// Normalise to an encoded URL (safe if already encoded)
	const encodedSrc = encodeURI(src);

	// metadata from image-sizes.json (which uses encoded keys)
	const meta =
		(imageMeta as Record<string, { width: number; height: number } | undefined>)[encodedSrc] ??
		null;
	const width = meta?.width;
	const height = meta?.height;

	// strip extension → "/uploads/foo/bar"
	const base = encodedSrc.replace(/\.[^.]+$/, '');

	// srcset strings
	const avifSrcSet = `${base}.460.avif 460w, ${base}.800.avif 800w, ${base}.1200.avif 1200w`;
	const webpSrcSet = `${base}.460.webp 460w, ${base}.800.webp 800w, ${base}.1200.webp 1200w`;

	// JPG fallback (your script only generates 800px)
	const jpgFallback = `${base}.800.jpg`;
</script>

<picture class={className}>
	<source type="image/avif" srcset={avifSrcSet} sizes={sizes} />
	<source type="image/webp" srcset={webpSrcSet} sizes={sizes} />

	<img
		src={jpgFallback}
		srcset={webpSrcSet}
		sizes={sizes}
		alt={alt}
		width={width}
		height={height}
		loading={loading}
		decoding={decoding}
		fetchpriority={fetchpriority}
	/>
</picture>
