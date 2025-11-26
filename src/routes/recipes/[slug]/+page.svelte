<script lang="ts">
    // single receipt page website/src/routes/recipes/[slug]/+page.svelte
	let { data } = $props();
    import Picture from '$lib/components/Picture.svelte';
	let settings = data.settings;
	let recipe = data.recipe; // singular
</script>

<svelte:head>
	<title>{recipe.title} – {settings.siteTitle}</title>
</svelte:head>

<main class="page panel center">
	<article class="recipe">
		<h1>{recipe.title}</h1>
        	{#if recipe.excerpt}
               <p class="lede">{recipe.excerpt}</p>

            {/if}

            {#if recipe.thumbnail}
			<Picture
                src={recipe.thumbnail}
                alt={recipe.title} 
                sizes="(min-width: 1024px) 33vw,
                (min-width: 640px) 50vw, 100vw"
                class="card-image"
            />
		{/if}

		{#if recipe.ingredients?.length}
			<h2>Ingredients</h2>
			<ul>
				{#each recipe.ingredients as ing}
					<li>{ing}</li>
				{/each}
			</ul>
		{/if}

		{#if recipe.instructions?.length}
			<h2>Instructions</h2>
			<ol>
				{#each recipe.instructions as step}
					<li>{step}</li>
				{/each}
			</ol>
		{/if}

		{#if recipe.html}
			<h2>Notes</h2>
			<div class="content"> {@html recipe.html}</div>
		{/if}
	</article>
</main>
<style>
article {
    max-width: 800px;
}

</style>