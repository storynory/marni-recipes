<script lang="ts">
	let { data } = $props();

	let settings = data.settings;
	let recipe = data.recipe; // singular
</script>

<svelte:head>
	<title>{recipe.title} – {settings.siteTitle}</title>
</svelte:head>

<main class="page panel">
	<article class="recipe">
		<h1>{recipe.title}</h1>

		{#if recipe.thumbnail}
			<img class="recipe-thumb" src={recipe.thumbnail} alt={recipe.title} width="620" height="320" />
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