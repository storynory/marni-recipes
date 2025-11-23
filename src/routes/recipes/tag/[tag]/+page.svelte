<!-- src/routes/recipes/tag/[tag]/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	let tag      = $derived(data.tag);
	let recipes  = $derived(data.recipes);
	let tags     = $derived(data.tags);
	let tagSlug  = $derived(data.tagSlug);
</script>

<svelte:head>
	<title>{tag.title} recipes | Marni’s Cooking Website</title>
	<meta
		name="description"
		content={tag.description
			? tag.description
			: `Breakfast, lunch, dinner and dessert ideas tagged “${tag.title}”.`}
	>
</svelte:head>

<section class="page -p-lg-x">
	<!-- your TagNav etc -->
	<!-- <TagNav tags={tags} activeSlug={tagSlug}></TagNav> -->

	<header class="tag-header -p">
		<h1 class="brand-font {tag.slug}">
			{tag.title}
		</h1>

		{#if tag.description}
			<p class="lede max-measure">{tag.description}</p>
		{/if}
	</header>

	{#if recipes.length === 0}
		<p>No recipes found for this tag yet.</p>
	{:else}
		<ul class="grid recipe-grid">
			{#each recipes as recipe}
				<li class="card recipe-card">
					<a href="/recipes/{recipe.slug}/" class="card-link">
						{#if recipe.thumbnail}
							<img
								src={recipe.thumbnail}
								alt={recipe.title}
								class="card-thumb"
								width="320"
								height="240"
							>
						{/if}

						<h2 class="card-title brand-font txt-accent">{recipe.title}</h2>

						{#if recipe.date}
							<p class="card-meta small">
								<time datetime={recipe.date}>
									{new Date(recipe.date).toLocaleDateString('en-GB', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})}
								</time>
							</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
