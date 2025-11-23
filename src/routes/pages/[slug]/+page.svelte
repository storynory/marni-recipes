<script lang="ts">
	

	let { data } = $props();
 

	let settings = $derived(data.settings);
	let post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} – {settings.siteTitle}</title>
	{#if post.excerpt}
		<meta name="description" content={post.excerpt} />
	{:else if settings.strapline}
		<meta name="description" content={settings.strapline} />
	{/if}
</svelte:head>

<main class="page panel">
	<section class="-p">
		<p class="back-link">
			<a href="/">← Back to Home</a>
		</p>

		<article class="blog-article">
			<header class="blog-article-header">
                <h1>{post.title}</h1>
	{#if post.excerpt}
		<p class="lede">{post.excerpt} </p>

        {/if}

				{#if post.thumbnail}
					<div class="blog-article-thumbnail">
						<img
							src={post.thumbnail}
							alt={post.title}
							loading="eager"
							width="800"
							height="450"
						/>
					</div>
				{/if}

				
			</header>

			<section class="blog-article-body">
				{@html post.html}
			</section>
		</article>
	</section>
</main>

<style>
	.back-link {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.back-link a {
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	.blog-article {
		max-width: 60rem;
		margin: 0 auto;
	}

	.blog-article-header h1 {
		margin-top: 1rem;
		margin-bottom: 0.25rem;
	}

	.blog-article-header .meta {
		margin: 0 0 1.5rem;
		font-size: 0.9rem;
		opacity: 0.7;
	}

	.blog-article-thumbnail {
		border-radius: 0.75rem;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.blog-article-thumbnail img {
		display: block;
		width: 100%;
		height: auto;
	}

	.blog-article-body {
		font-size: 1rem;
		line-height: 1.7;
	}

	.blog-article-body p {
		margin: 0 0 1rem;
	}

	.blog-article-body h2,
	.blog-article-body h3,
	.blog-article-body h4 {
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}
</style>
