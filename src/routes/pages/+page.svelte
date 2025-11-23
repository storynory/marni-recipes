<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props();

	let settings = $derived(data.settings);
	let posts = $derived(data.posts);
</script>

<svelte:head>
	<title>Page – {settings.siteTitle}</title>
	
		<meta name="description" content="Diary of a girl who loves to bake and cook" />

</svelte:head>

<main class="page panel">
	<section class="-p txt-center">
		<h1>pages</h1>
		<p class="lede">Kitchen stories, baking notes, and behind-the-scenes bits.</p>
	</section>

	{#if posts.length === 0}
		<section class="-p">
			<p>
				No pages posts yet. Add some markdown files in
				<code>pages/</code> and they will appear here.
			</p>
		</section>
	{:else}
		<section class="-p">
			<ul class="grid pages-list">
				{#each posts as post}
					<li class="card pages-card">
						<a href={`/pages/${post.slug}/`}>
							{#if post.thumbnail}
								<div class="pages-card-image">
									<img
										src={post.thumbnail}
										alt={post.title}
										loading="lazy"
										width="400"
										height="225"
									/>
								</div>
							{/if}

							<div class="pages-card-body">
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
	.pages-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	}

	.pages-card {
		background: var(--light, #f7f2ea);
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
	}

	.pages-card > a {
		display: block;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.pages-card-image img {
		display: block;
		width: 100%;
		height: auto;
	}

	.pages-card-body {
		padding: 1rem 1.25rem 1.25rem;
	}

	.pages-card-body h2 {
		margin: 0 0 0.25rem;
		font-size: var(--scale-1, 1.25rem);
	}

	.meta {
		margin: 0 0 0.75rem;
		font-size: 0.9rem;
		opacity: 0.7;
	}
</style>
