<script lang="ts">
    /// src/routes/blog/+page.svelte
	let { data } = $props();

	let settings = $derived(data.settings);
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Blog – {settings.siteTitle}</title>
	
		<meta name="description" content={settings.BlogPageintro} />

</svelte:head>

<main class="page panel">
	<section class="-p txt-center">
		<h1>Blog</h1>
		<p class="lede">{settings.BlogPageintro}</p>
	</section>

	{#if posts.length === 0}
		<section class="-p">
			<p>
				No blog posts yet. Add some markdown files in
				<code>blog/</code> and they will appear here.
			</p>
		</section>
	{:else}
		<section class="-p">
			<ul class="grid blog-list">
				{#each posts as post}
					<li class="card blog-card">
						<a href={`/blog/${post.slug}/`}>
							{#if post.thumbnail}
								<div class="blog-card-image">
									<img
										src={post.thumbnail}
										alt={post.title}
										loading="lazy"
										width="400"
										height="225"
									/>
								</div>
							{/if}

							<div class="blog-card-body">
								<h2>{post.title}</h2>

								{#if post.date}
									<p class="meta">
										{new Date(post.date).toLocaleDateString('en-GB', {
											day: 'numeric',
											month: 'short',
											year: 'numeric'
										})}
									</p>
								{/if}

								{#if post.excerpt}
									<p>{post.excerpt}</p>
								{/if}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</main>

<style>
	.blog-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}

	.blog-card {
		background: var(--light, #f7f2ea);
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
	}

	.blog-card > a {
		display: block;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.blog-card-image img {
		display: block;
		width: 100%;
		height: auto;
	}

	.blog-card-body {
		padding: 1rem 1.25rem 1.25rem;
	}

	.blog-card-body h2 {
		margin: 0 0 0.25rem;
		font-size: var(--scale-1, 1.25rem);
	}

	.meta {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		opacity: 0.7;
	}
</style>
