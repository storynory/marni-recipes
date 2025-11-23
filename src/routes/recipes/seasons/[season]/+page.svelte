<script lang="ts">
	let { data } = $props();

	let settings = $derived(data.settings);
	let season = $derived(data.season);
	let recipes = $derived(data.recipes);
</script>

<svelte:head>
	<title>{season.title} recipes – {settings.siteTitle}</title>
	{#if settings.strapline}
		<meta name="description" content={settings.strapline} />
	{/if}
</svelte:head>

<main class="page panel">
	<section class="-p txt-center">
		<h1>{season.title} recipes</h1>
		{#if season.description}
			<p class="lede">{season.description}</p>
		{/if}
	</section>

	<ul class="grid">
		{#each recipes as recipe}
			<li class="card bg-light txt-center">
				<a href={`/recipes/${recipe.slug}/`}>
					{#if recipe.thumbnail}
						<img
							src={recipe.thumbnail}
							alt={recipe.title}
							width="620"
							height="320"
						>
					{/if}
					<h3 class="txt-accent">{recipe.title}</h3>
				</a>
			</li>
		{/each}
	</ul>
</main>
